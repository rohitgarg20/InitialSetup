import { navigateToWebView, POST_KEYS } from './../../common/constant'
import Share  from 'react-native-share'
import { INudgeListItem, IPostItem } from './../interfaces'
import { action, makeObservable, observable } from 'mobx'
import { get, map } from 'lodash'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage, toDateTime } from '../../utils/app-utils'
import { POST_TYPES } from '../../common/constant'
import { SaveDataStore } from '../save-store'
import { userDataStore } from '..'

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
    log('**************', userDataStore.getUserId())
    const tempPostsData = { ...this.postsData }
    const postsList = get(responseData, 'data', [])
    const currentPage = get(responseData, 'current_page', 0)
    const lastPage = get(responseData, 'last_page', 0)
    const loggedInUserId = userDataStore.getUserId()
    const formattedData: IPostItem[] = map(postsList, (post) => {
      const attachmentType = get(post, 'attachment.type', '')
      const discussionRoomLink = get(post, 'attachment.link', '')
      const userIdOfPost = get(post, 'uid', '')
      log('constructPostsListScreenconstructPostsListScreen', userIdOfPost, loggedInUserId)
      return {
        ...post,
        postDate: toDateTime(get(post, 'timestamp')),
        isDiscussionRoomAvailable: attachmentType === POST_TYPES.DISCUSSION_ROOM && discussionRoomLink?.length > 0 && userIdOfPost !== loggedInUserId,
        isPostByLoggedInUser: userIdOfPost === loggedInUserId
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

  onClickShareVia = () => {
    // const _id = this.getContentId()
    // const proContent = this.getProContent()
    // const tags = this.getTags()
    // const questionContentSubstring = proContent
    //   .replace(/[^a-zA-Z0-9 ]/g, '')
    //   .replace(/ /g, '-')
    //   .substr(0, 100)
    // const shareUrl = `${QUESTION_SHARE_URL}/${questionContentSubstring}?qid=${_id}?tag=${get(tags, '[0].tag', '')}`
    const shareUrl = `queestion share url`

    let shareOptions = {
      url: shareUrl,
      title: '',
      message: '',
      subject: shareUrl // subject of the message needs when sending mail
    }
    Share.open(shareOptions)
      .then((res) => {
        //
      })
      .catch((err) => {
        log('error while sharing link', err)
      })
  }

  onClickPostOption = (optionSelected, cardData) => {
    const { SAVE, SHARE, EDIT, REPOST } = POST_KEYS
    switch (optionSelected) {
      case SAVE:
        this.saveCurrentPost(cardData)
        break
      case SHARE:
        this.onClickShareVia()
        break
      case EDIT:
      case REPOST:
        navigateToWebView({
          navigation: undefined,
          pageUrl: 'https://sdlms.deepthought.education'
        })
        break
      default:
    }
  }

  saveCurrentPost = async (cardData) => {
    log('saveCurrentEventsaveCurrentEvent')
    const saveEvent = new SaveDataStore(this)
    const params = JSON.stringify({
      item_name: get(cardData, 'type')
    })
    log('saveCurrentEventsaveCurrentEvent 2', params)

    const urlParams = {
      id: get(cardData, '_id')
    }
    log('saveCurrentEventsaveCurrentEvent 3', urlParams)

    await saveEvent.saveAnEvent(params, urlParams)
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