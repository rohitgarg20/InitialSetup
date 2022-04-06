import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { get } from 'lodash'
import { colors } from '../../common'
import { BASE_URL, FETCHING_ARR } from '../../common/constant'
import { CustomText, FlatListWrapper, IconButtonWrapper, ShimmerComponent } from '../../components'
import { postListStore } from '../../store'
import { IPostItem } from '../../store/interfaces'
import PostCardComponent from '../../components/Card-Component/PostCardComponent'
import { log } from '../../config'
import { HeaderCardComponent } from '../../components/HeaderCardComponent'
import { icons } from '../../common/icons'
import axios from 'axios'
import reactotron from 'reactotron-react-native'


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteSmock,
    flex: 1
  },
  borderBottom: {
    paddingBottom: 20
  },
  filterBtn: {
    position: 'absolute',
    left: 0,
    top: 35,
    zIndex: 9,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  mainContainer: {
    position: 'relative',
    paddingTop: 15,
    flex: 1,
    paddingBottom: 10
  }
})

@observer
export class HomeScreen extends Component {

  constructor(props, state) {
    super(props, state)
    postListStore.updateFetchingStatus(true)
  }
  componentDidMount() {
    try {
      axios.get(BASE_URL).then((data) => {
        reactotron.log('componentDidMountcomponentDidMount', data)

      })
    } catch (error) {
      reactotron.log('error', error)
    }

    postListStore.getPostsListData()
  }

  componentWillUnmount() {
    postListStore.init()
  }

  getKeyExtractor = (item: IPostItem, index) => {
    const { _id } = item
    return _id || index
  }

  renderEventSeperatorComponent = () => {
    return (
      <View style={styles.borderBottom} />
    )
  }

  renderListFooterComponent = () => {
    const { postsData = {} } = postListStore
    const { current_page, last_page, postList } = postsData
    log('current_page, last_page', current_page, last_page)
    if (current_page === last_page || get(postList, 'length') === 0) {
      return null
    }

    return (
      <View>
        <ActivityIndicator size={'large'} color={colors.lightBlue} />
      </View>
    )
  }

  loadMoreData = () => {
    const { postsData = {} } = postListStore
    const { current_page, last_page } = postsData
    if (current_page === last_page) {
      return null
    } else {
      postListStore.getPostsListData()
    }

  }

  renderShimmerView = () => {
    return (
      <ShimmerComponent />
    )
  }

  renderPostsCard = ({ item, index }) => {
    log('renderPostsCardrenderPostsCard', item)
    return (
      <PostCardComponent postData={item} />
    )
  }

  renderPostsListScreeen = () => {
    const { postsData = {}, isFetching } = postListStore
    const { postList } = postsData
    return (
      <View style={styles.mainContainer}>
        <View style={styles.filterBtn}>
          <IconButtonWrapper
            iconImage={icons.FILTER_ICON}
            iconHeight={18}
            iconWidth={18}
          />
        </View>
        <FlatListWrapper
          isFetching={isFetching}
          data={isFetching ? FETCHING_ARR : postList as IPostItem[]}
          renderItem={this.renderPostsCard}
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

        {this.renderPostsListScreeen()}
      </View>
    )
  }
}
