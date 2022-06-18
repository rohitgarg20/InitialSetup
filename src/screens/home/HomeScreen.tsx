import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ActivityIndicator, RefreshControl, StyleSheet, View } from 'react-native'
import { get } from 'lodash'
import { colors } from '../../common'
import { BASE_URL, FETCHING_ARR } from '../../common/constant'
import { CustomText, FlatListWrapper, IconButtonWrapper, LoaderWithApiErrorComponent, ShimmerComponent } from '../../components'
import { genericDrawerStore, postListStore } from '../../store'
import { IPostItem } from '../../store/interfaces'
import PostCardComponent from '../../components/Card-Component/PostCardComponent'
import { log } from '../../config'
import { HeaderCardComponent } from '../../components/HeaderCardComponent'
import { icons } from '../../common/icons'
import axios from 'axios'
import reactotron from 'reactotron-react-native'
import { PreferencesScreen } from '../preferences/PreferencesScreen'


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

interface IProps {
  navigation?: any
}
@observer
export class HomeScreen extends Component<IProps> {

  constructor(props, state) {
    super(props, state)
    postListStore.updateFetchingStatus(true)
  }

  onPressApplyFilter = () => {
    postListStore.resetDataAndHitApi()
  }
  componentDidMount() {
    const { navigation } = this.props
    postListStore.getPostsListData()
    // genericDrawerStore.setRenderingComponent(<PreferencesScreen navigation={navigation} onPressApplyFilter = {this.onPressApplyFilter}/>)
  }

  componentWillUnmount() {
    // genericDrawerStore.clearData()
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
    const { onClickPostOption } = postListStore
    return (
      <PostCardComponent postData={item}
        onClickPostOption = {(optionKey) => onClickPostOption(optionKey, item)}
      />
    )
  }

  renderPostsListScreeen = () => {
    const { postsData = {}, isFetching, resetDataAndHitApi } = postListStore
    const { postList } = postsData
    return (
      <View style={styles.mainContainer}>
        {/* <View style={styles.filterBtn}>
          <IconButtonWrapper
            iconImage={icons.FILTER_ICON}
            iconHeight={18}
            iconWidth={18}
          />
        </View> */}
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
          data={isFetching ? FETCHING_ARR : postList as IPostItem[]}
          renderItem={this.renderPostsCard}
          keyExtractor={this.getKeyExtractor}
          ItemSeparatorComponent={this.renderEventSeperatorComponent}
          ListFooterComponent={this.renderListFooterComponent}
          onEndReachedThreshold={0.001}
          onEndReached={this.loadMoreData}
          customizedShimmerView={this.renderShimmerView}
          initialNumToRender = {postList?.length || 10}
        />
      </View>
    )
  }

  renderContainerContent = () => {
    const { isFetching, isApiError, resetDataAndHitApi } = postListStore
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

    return this.renderPostsListScreeen()
  }

  render() {
    const { updateFetchingStatus, resetDataAndHitApi } = postListStore
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
