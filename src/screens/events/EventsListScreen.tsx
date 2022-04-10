import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { get } from 'lodash'
import { colors } from '../../common'
import { CARD_HEIGHT, FETCHING_ARR } from '../../common/constant'
import { CustomText, EventCardComponent, FlatListWrapper, IconButtonWrapper, ShimmerComponent } from '../../components'
import { eventsListStore } from '../../store'
import { IEventListItem } from '../../store/interfaces'
import { HeaderCardComponent } from '../../components/HeaderCardComponent'
import { TouchableOpacity } from 'react-native-gesture-handler'
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
export class EventsListScreen extends Component<IProps> {

  constructor(props, state) {
    super(props, state)
    eventsListStore.updateFetchingStatus(true)
  }

  componentDidMount() {
    eventsListStore.getEventsListData()
  }

  componentWillUnmount() {
    eventsListStore.init()
  }

  navigateToDetailScreen = (eventId) => {
    const { navigation } = this.props
    navigateSimple(navigation, 'EventDetailScreen', {
      id: eventId
    })
  }

  renderEventCard = ({ item }) => {
    const { name, tagline, description, startDate, image, _id, tid } = item as IEventListItem

    return (
      <EventCardComponent
        name={name}
        tagline={tagline}
        description={description}
        startDate={startDate}
        imageUrl={image}
        onPressCard = {this.navigateToDetailScreen}
        eventId = {tid}
      />
    )
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

  renderListFooterComponent = () => {
    const { eventData = {} } = eventsListStore
    const { current_page, last_page, eventsList } = eventData
    if (current_page === last_page || get(eventsList, 'length') === 0) {
      return null
    }

    return (
      <View>
        <ActivityIndicator size={'large'} color={colors.lightBlue} />
      </View>
    )
  }

  loadMoreData = () => {
    const { eventData = {} } = eventsListStore
    const { current_page, last_page } = eventData
    if (current_page === last_page) {
      return null
    } else {
      eventsListStore.getEventsListData()
    }

  }

  renderShimmerView = () => {
    return (
      <ShimmerComponent />
    )
  }

  renderEventsListScreen = () => {
    const { eventData = {}, isFetching } = eventsListStore
    const { eventsList } = eventData
    return (
      <View style = {{
        flex: 1
      }}>
        <View style={styles.subHeaderContainer}>
          <CustomText textStyle={styles.subheadingStyle}>Explore Events</CustomText>
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
          data={isFetching ? FETCHING_ARR : eventsList as IEventListItem[]}
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
        {this.renderEventsListScreen()}
      </View>
    )
  }
}
