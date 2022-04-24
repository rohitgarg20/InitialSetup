import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ActivityIndicator, RefreshControl, StyleSheet, View } from 'react-native'
import { get } from 'lodash'
import { colors, fontDimensPer } from '../../common'
import { CARD_HEIGHT, FETCHING_ARR } from '../../common/constant'
import { CustomText, EventCardComponent, FlatListWrapper, IconButtonWrapper, LoaderWithApiErrorComponent, ShimmerComponent } from '../../components'
import { eventsListStore, genericDrawerStore } from '../../store'
import { IEventListItem } from '../../store/interfaces'
import { HeaderCardComponent } from '../../components/HeaderCardComponent'
import { TouchableOpacity } from 'react-native-gesture-handler'
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
    // fontSize: 16,
    // fontWeight: '700',
    // color: colors.black,
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
export class EventsListScreen extends Component<IProps> {

  constructor(props, state) {
    super(props, state)
    eventsListStore.updateFetchingStatus(true)
  }


  onPressApplyFilter = () => {
    eventsListStore.resetDataAndHitApi()
  }

  componentDidMount() {
    const { navigation } = this.props
    eventsListStore.getEventsListData()
    genericDrawerStore.setRenderingComponent(<PreferencesScreen navigation={navigation} onPressApplyFilter = {this.onPressApplyFilter}/>)

  }

  componentWillUnmount() {
    genericDrawerStore.clearData()

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
    const { eventData = {}, isFetching, resetDataAndHitApi } = eventsListStore
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
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                resetDataAndHitApi()
              }}
            />
          }
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
          initialNumToRender = {eventsList?.length || 10}
        />
      </View>
    )
  }

  renderContainerContent = () => {
    const { isFetching, isApiError, resetDataAndHitApi } = eventsListStore
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

    return this.renderEventsListScreen()
  }

  render() {
    const { updateFetchingStatus, resetDataAndHitApi } = eventsListStore

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
