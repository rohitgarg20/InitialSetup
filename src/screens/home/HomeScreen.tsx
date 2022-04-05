import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { get } from 'lodash'
import { colors } from '../../common'
import { FETCHING_ARR } from '../../common/constant'
import { CustomText, FlatListWrapper, ShimmerComponent } from '../../components'
import { postListStore } from '../../store'
import { IPostItem } from '../../store/interfaces'
import PostCardComponent from '../../components/Card-Component/PostCardComponent'
import { log } from '../../config'


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10
  },
  borderBottom: {
    paddingBottom: 20
  }
})

@observer
export  class HomeScreen extends Component {

  constructor(props, state) {
    super(props, state)
    postListStore.updateFetchingStatus(true)
  }
  componentDidMount() {
    postListStore.getPostsListData()
  }

  getKeyExtractor = (item: IPostItem, index ) => {
    const { _id } = item
    return _id || index
  }

  renderEventSeperatorComponent = () => {
    return (
      <View style = {styles.borderBottom}/>
    )
  }

  renderListFooterComponent = () => {
    const { postsData = {} } = postListStore
    const { current_page, last_page, postList  } = postsData
    log('current_page, last_page', current_page, last_page)
    if (current_page === last_page || get(postList, 'length') === 0) {
      return null
    }

    return (
      <View>
        <ActivityIndicator size={'large'} color = {colors.lightBlue} />
      </View>
    )
  }

  loadMoreData = () => {
    const { postsData = {} } = postListStore
    const { current_page, last_page  } = postsData
    if (current_page === last_page) {
      return null
    } else {
      postListStore.getPostsListData()
    }

  }

  renderShimmerView = () => {
    return (
      <ShimmerComponent/>
    )
  }

  renderPostsCard = ({ item, index }) => {
    log('renderPostsCardrenderPostsCard', item)
    return (
      <PostCardComponent postData = {item}/>
    )
  }

  renderPostsListScreeen = () => {
    const { postsData = {}, isFetching } = postListStore
    const { postList  } = postsData
    return (
      <FlatListWrapper
        isFetching = {isFetching}
        data = { isFetching ? FETCHING_ARR : postList as IPostItem[]}
        renderItem = {this.renderPostsCard}
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
        {this.renderPostsListScreeen()}
      </View>
    )
  }
}
