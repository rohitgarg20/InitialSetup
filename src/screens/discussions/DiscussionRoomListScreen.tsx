import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ActivityIndicator, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native'
import { get } from 'lodash'
import { colors, fontDimensPer } from '../../common'
import { CARD_HEIGHT, FETCHING_ARR } from '../../common/constant'
import { CustomText, EventCardComponent, FlatListWrapper, IconButtonWrapper, LoaderWithApiErrorComponent, ShimmerComponent } from '../../components'
import { discussionRoomListStore, genericDrawerStore } from '../../store'
import { IEventListItem } from '../../store/interfaces'
import { HeaderCardComponent } from '../../components/HeaderCardComponent'
import { icons } from '../../common/icons'
import { navigateSimple } from '../../service'
import { widthToDp } from '../../utils/Responsive'
import { PreferencesScreen } from '../preferences/PreferencesScreen'

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
    fontSize: widthToDp(fontDimensPer.large),
    fontWeight: '600',
    color: colors.black,
    fontFamily: 'Poppins-SemiBold'
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

  onPressApplyFilter = () => {
    discussionRoomListStore.resetDataAndHitApi()
  }

  componentDidMount() {
    discussionRoomListStore.getDiscussionRoomsListData()
    // genericDrawerStore.setRenderingComponent(<PreferencesScreen navigation={this.props.navigation} onPressApplyFilter = {this.onPressApplyFilter}/>)
  }

  componentWillUnmount() {
    // genericDrawerStore.clearData()
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
    const { discussionRoomData = {}, isFetching, resetDataAndHitApi } = discussionRoomListStore
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
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                resetDataAndHitApi()
              }}
            />
          }
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
          initialNumToRender = {roomsList?.length || 10}

        />
      </View>
    )
  }

  renderContainerContent = () => {
    const { isFetching, isApiError, resetDataAndHitApi } = discussionRoomListStore
    if (isFetching || isApiError) {
      return (
        <View style = {{
          flex: 1
        }}>
          <LoaderWithApiErrorComponent
            isFetching = {isFetching}
            isApiError = {isApiError}
            onTryAgain = {resetDataAndHitApi}
          />
        </View>
      )
    }

    return this.renderDiscussionList()
  }

  render() {
    const { updateFetchingStatus, resetDataAndHitApi } = discussionRoomListStore
    return (
      <View style={styles.container}>
        <HeaderCardComponent
          updateFetchingStatus={updateFetchingStatus}
          hitSearchApi = {resetDataAndHitApi}
        />
        {this.renderContainerContent()}
      </View>
    )
  }
}
