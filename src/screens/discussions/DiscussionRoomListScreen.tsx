import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { get  } from 'lodash'
import { colors } from '../../common'
import { CARD_HEIGHT, FETCHING_ARR } from '../../common/constant'
import { CustomText, EventCardComponent, FlatListWrapper, ShimmerComponent } from '../../components'
import { discussionRoomListStore } from '../../store'
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
export class DiscussionRoomListScreen extends Component {

  constructor(props, state) {
    super(props, state)
    discussionRoomListStore.updateFetchingStatus(true)
  }

  componentDidMount() {
    discussionRoomListStore.getDiscussionRoomsListData()
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

  loadMoreData = () => {
    const { discussionRoomData = {}, isFetching } = discussionRoomListStore
    const { current_page, last_page  } = discussionRoomData
    if (current_page === last_page) {
      return null
    } else {
      discussionRoomListStore.getDiscussionRoomsListData()

    }

  }

  renderShimmerView = () => {
    return (
      <ShimmerComponent/>
    )
  }


  renderListFooterComponent = () => {
    const { discussionRoomData = {}, isFetching } = discussionRoomListStore
    const { current_page, last_page, roomsList = []  } = discussionRoomData
    if (current_page === last_page || get(roomsList, 'length') === 0) {
      return null
    }

    return (
      <View>
        <ActivityIndicator size={'large'} color = {colors.lightBlue} />
      </View>
    )
  }

  renderEventCard = ({ item }) => {
    const { name, tagline, description, startDate, image, author, category  } = item as IEventListItem
    const {  userName, lastActiveTime, status } = author || {}

    return (
      <EventCardComponent
        name= {name}
        tagline = {tagline}
        description = {description}
        startDate = {startDate}
        imageUrl = {image}
        authorName = {userName}
        status = {status}
        lastActiveTime = {lastActiveTime}
        category = {category}
      />
    )
  }

  renderDiscussionList = () => {
    const { discussionRoomData = {}, isFetching } = discussionRoomListStore
    const { roomsList = []  } = discussionRoomData
    return (
      <FlatListWrapper
        isFetching = {isFetching}
        data = { isFetching ? FETCHING_ARR : roomsList as IEventListItem[]}
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
        {this.renderDiscussionList()}
      </View>
    )
  }
}
