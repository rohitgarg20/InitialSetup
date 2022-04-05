import { INudgeListItem, IPostItem } from './../interfaces';
import { action, makeObservable, observable } from 'mobx'
import { get, map } from 'lodash'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage, toDateTime } from '../../utils/app-utils'
import { POST_TYPES } from '../../common/constant';

const PAGE_SIZE = 10

const DEFAULT_SETTINGS = {
  postsData: {
    postList: [],
    current_page: -1,
    last_page: undefined
  },
  isFetching: false
}


export class PostListStore implements RESPONSE_CALLBACKS {

  @observable postsData
  @observable isFetching

  constructor() {
    this.init()
    makeObservable(this)
  }


  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }


  updateFetchingStatus = (value) => {
    this.isFetching = value
  }


  getPostsListData = async () => {

    const loginUser = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.GET_ALL_POSTS,
      apiId: API_IDS.GET_ALL_POSTS,
      urlParams: {
        limit: PAGE_SIZE,
        page: get(this.postsData, 'current_page', 0) + 1
      }
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitGetApi()
  }

  constructPostsListScreen = (responseData) => {
    const tempPostsData = { ...this.postsData }
    const postsList = get(responseData, 'data', [])
    const currentPage = get(responseData, 'current_page', 0)
    const lastPage = get(responseData, 'last_page', 0)
    const formattedData: IPostItem[] = map(postsList, (post) => {
      const attachmentType = get(post, 'attachment.type', '')
      const discussionRoomLink = get(post, 'attachment.link', '')
      const userIdOfPost = get(post, 'uid', '')
      return {
        ...post,
        postDate: toDateTime(get(post, 'timestamp')),
        isDiscussionRoomAvailable: attachmentType === POST_TYPES.DISCUSSION_ROOM && discussionRoomLink?.length > 0 && userIdOfPost !== 1
      }
    })
    return {
      postList: [...tempPostsData.postList, ...formattedData],
      current_page: currentPage,
      last_page: lastPage
    }
  }

  @action
  setPostsListData = (postData) => {
    this.postsData = { ...postData}
    log('this.eventDatathis.eventData', this.postsData)
  }

  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response)
    switch (apiId) {
      case API_IDS.GET_ALL_POSTS:
        const nudgesData = this.constructPostsListScreen(get(response, 'response', {}))
        this.setPostsListData(nudgesData)
        this.updateFetchingStatus(false)
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.GET_ALL_POSTS:
        showAndroidToastMessage(get(error, 'data', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        this.updateFetchingStatus(false)

        break
      default:
        break
    }
  }
}