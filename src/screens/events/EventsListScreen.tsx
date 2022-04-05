import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { get } from 'lodash'
import { colors } from '../../common'
import { CARD_HEIGHT, FETCHING_ARR } from '../../common/constant'
import {  EventCardComponent, FlatListWrapper, ShimmerComponent } from '../../components'
import { eventsListStore } from '../../store'
import { IEventListItem } from '../../store/interfaces'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderColor: colors.borderColor
  },


})

@observer
export  class EventsListScreen extends Component {

  constructor(props, state) {
    super(props, state)
    eventsListStore.updateFetchingStatus(true)
  }

  componentDidMount() {
    eventsListStore.getEventsListData()
  }

  renderEventCard = ({ item }) => {
    const { name, tagline, description, startDate, image } = item as IEventListItem

    return (
      <EventCardComponent
        name= {name}
        tagline = {tagline}
        description = {description}
        startDate = {startDate}
        imageUrl = {image}
      />
    )
  }

   getItemLayout = (data, index) => ({ length: CARD_HEIGHT, offset: ((CARD_HEIGHT * index) + index), index })

   getKeyExtractor = (item: IEventListItem, index ) => {
     const { _id } = item
     return _id || index
   }

   renderEventSeperatorComponent = () => {
     return (
       <View style = {styles.borderBottom}/>
     )
   }

   renderListFooterComponent = () => {
     const { eventData = {} } = eventsListStore
     const { current_page, last_page, eventsList  } = eventData
     if (current_page === last_page || get(eventsList, 'length') === 0) {
       return null
     }

     return (
       <View>
         <ActivityIndicator size={'large'} color = {colors.lightBlue} />
       </View>
     )
   }

   loadMoreData = () => {
     const { eventData = {} } = eventsListStore
     const { current_page, last_page  } = eventData
     if (current_page === last_page) {
       return null
     } else {
       eventsListStore.getEventsListData()
     }

   }

   renderShimmerView = () => {
     return (
       <ShimmerComponent/>
     )
   }

  renderEventsListScreen = () => {
    const { eventData = {}, isFetching } = eventsListStore
    const { eventsList  } = eventData
    return (
      <FlatListWrapper
        isFetching = {isFetching}
        data = { isFetching ? FETCHING_ARR : eventsList as IEventListItem[]}
        renderItem = {this.renderEventCard}
        getItemLayout = {this.getItemLayout}
        keyExtractor = {this.getKeyExtractor}
        ItemSeparatorComponent = {this.renderEventSeperatorComponent}
        ListFooterComponent = {this.renderListFooterComponent}
        onEndReachedThreshold = {0.001}
        onEndReached = {this.loadMoreData}
        customizedShimmerView = {this.renderShimmerView}
      />
    )
  }

  render() {
    return (
      <View style = {styles.container}>
        {this.renderEventsListScreen()}
      </View>
    )
  }
}
