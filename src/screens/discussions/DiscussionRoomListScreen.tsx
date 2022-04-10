import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'
import { get } from 'lodash'
import { colors } from '../../common'
import { CARD_HEIGHT, FETCHING_ARR } from '../../common/constant'
import { CustomText, EventCardComponent, FlatListWrapper, IconButtonWrapper, ShimmerComponent } from '../../components'
import { discussionRoomListStore } from '../../store'
import { IEventListItem } from '../../store/interfaces'
import { HeaderCardComponent } from '../../components/HeaderCardComponent'
import { icons } from '../../common/icons'
import { navigateSimple } from '../../service'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteSmock,
    flex: 1
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderColor: colors.borderColor
  },
  subHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subheadingStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black
  }

})

interface IProps {
  navigation?: any
}
@observer
export class DiscussionRoomListScreen extends Component<IProps> {

  constructor(props, state) {
    super(props, state)
    discussionRoomListStore.updateFetchingStatus(true)
  }

  componentDidMount() {
    discussionRoomListStore.getDiscussionRoomsListData()
  }

  componentWillUnmount() {
    discussionRoomListStore.init()
  }

  getItemLayout = (data, index) => ({ length: CARD_HEIGHT, offset: ((CARD_HEIGHT * index) + index), index })

  getKeyExtractor = (item: IEventListItem, index) => {
    const { _id } = item
    return _id || index
  }

  renderEventSeperatorComponent = () => {
    return (
      <View style={styles.borderBottom} />
    )
  }

  loadMoreData = () => {
    const { discussionRoomData = {}, isFetching } = discussionRoomListStore
    const { current_page, last_page } = discussionRoomData
    if (current_page === last_page) {
      return null
    } else {
      discussionRoomListStore.getDiscussionRoomsListData()

    }

  }

  renderShimmerView = () => {
    return (
      <ShimmerComponent />
    )
  }


  renderListFooterComponent = () => {
    const { discussionRoomData = {}, isFetching } = discussionRoomListStore
    const { current_page, last_page, roomsList = [] } = discussionRoomData
    if (current_page === last_page || get(roomsList, 'length') === 0) {
      return null
    }

    return (
      <View>
        <ActivityIndicator size={'large'} color={colors.lightBlue} />
      </View>
    )
  }

  navigateToDetailScreen = (eventId) => {
    const { navigation } = this.props
    navigateSimple(navigation, 'DiscussionDetailScreen', {
      id: eventId
    })
  }

  renderEventCard = ({ item }) => {
    const { name, tagline, description, startDate, image, author, category, tid } = item as IEventListItem

    const { userName, lastActiveTime, status } = author || {}

    return (
      <EventCardComponent
        name={name}
        tagline={tagline}
        description={description}
        startDate={startDate}
        imageUrl={image}
        authorName={userName}
        status={status}
        lastActiveTime={lastActiveTime}
        category={category}
        onPressCard = {this.navigateToDetailScreen}
        eventId = {tid}
      />
    )
  }

  renderDiscussionList = () => {
    const { discussionRoomData = {}, isFetching } = discussionRoomListStore
    const { roomsList = [] } = discussionRoomData
    return (
      <View style = {{
        flex: 1
      }}>
         <View style={styles.subHeaderContainer}>
          <CustomText textStyle={styles.subheadingStyle}>My Discussion Room</CustomText>
          <TouchableOpacity>
            <IconButtonWrapper
              iconImage={icons.FILTER_ICON}
              iconHeight={18}
              iconWidth={18}
            />
          </TouchableOpacity>
        </View>
        <FlatListWrapper
          isFetching={isFetching}
          data={isFetching ? FETCHING_ARR : roomsList as IEventListItem[]}
          renderItem={this.renderEventCard}
          getItemLayout={this.getItemLayout}
          keyExtractor={this.getKeyExtractor}
          ItemSeparatorComponent={this.renderEventSeperatorComponent}
          ListFooterComponent={this.renderListFooterComponent}
          onEndReachedThreshold={0.001}
          onEndReached={this.loadMoreData}
          customizedShimmerView={this.renderShimmerView}
        />
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <HeaderCardComponent />
        {this.renderDiscussionList()}
      </View>
    )
  }
}
