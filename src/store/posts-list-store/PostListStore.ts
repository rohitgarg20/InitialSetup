import { BASE_URL, navigateToWebView, POST_KEYS } from './../../common/constant'
import Share  from 'react-native-share'
import { INudgeListItem, IPostItem } from './../interfaces'
import { action, makeObservable, observable } from 'mobx'
import { get, map } from 'lodash'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { capitalizeFirstLetterOnly, showAndroidToastMessage, toDateTime } from '../../utils/app-utils'
import { POST_TYPES } from '../../common/constant'
import { SaveDataStore } from '../save-store'
import { preferencesDataStore, userDataStore } from '..'
import { Alert, ToastAndroid } from 'react-native'

const PAGE_SIZE = 10

const DEFAULT_SETTINGS = {
  postsData: {
    postList: [],
    current_page: -1,
    last_page: undefined
  },
  isFetching: false,
  isApiError: false
}


export class PostListStore implements RESPONSE_CALLBACKS {

  @observable postsData
  @observable isFetching
  @observable isApiError

  constructor() {
    this.init()
    makeObservable(this)
  }


  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }


  @action
  updateFetchingStatus = (value) => {
    this.isFetching = value
  }

  @action
  updateApiErrorStatus = (value) => {
    this.isApiError = value
  }

  @action
  resetDataAndHitApi = () => {
    this.updateFetchingStatus(true)
    this.updateApiErrorStatus(false)
    this.postsData = {
      ...DEFAULT_SETTINGS.postsData
    }
    this.getPostsListData()
  }

  getPostsListData = async () => {
    const { preferences,  sortByParam = '' } = preferencesDataStore.getPreferencesParamsList()
    const { searchText } = userDataStore
    let urlParams: any = {
      limitBy: PAGE_SIZE,
      page: get(this.postsData, 'current_page', 0) + 1,
      term: searchText,
      type: sortByParam?.length > 0 ? sortByParam : ''
    }
    log('urlParamsurlParamsurlParams', urlParams)
    const loginUser = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.GET_ALL_POSTS,
      apiId: API_IDS.GET_ALL_POSTS,
      urlParams,
      reqParams: {
        preferences
      },
      prefetch: false
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitPostApi()
  }

  deletePost = async (tid) => {
    const loginUser = new BaseRequest(this, {
      methodType: 'DELETE',
      apiEndPoint: API_END_POINTS.POST_DATA_BY_TID,
      apiId: API_IDS.DELETE_POST,
      params: JSON.stringify({
        tid
      }),
      prefetch: true
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitDeleteApi()
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
      // log('constructPostsListScreenconstructPostsListScreen', userIdOfPost, loggedInUserId)
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
    const shareUrl = 'queestion share url'

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

  deletePopupAndRefreshData = (tid) => {
    this.deletePost(tid)
  }

  deletePostPopupAlert = (type, tid) => {
    Alert.alert(
      `Delete ${capitalizeFirstLetterOnly(type)} `,
      `Are you sure you want to delete this ${capitalizeFirstLetterOnly(type)} ?`,
      [
        {
          text: 'Cancel',
          onPress: () => {}
        },
        {
          text: 'Yes',
          onPress: () => {
            return this.deletePopupAndRefreshData(tid)
          }
        }
      ],
      {
        cancelable: false
      },
    )
  }

  onClickPostOption = (optionSelected, cardData) => {
    const { SAVE, SHARE, EDIT, REPOST , DELETE} = POST_KEYS
    log('onClickPostOptiononClickPostOption', cardData)
    switch (optionSelected) {
      case SAVE:
        this.saveCurrentPost(cardData)
        break
      case SHARE:
        this.onClickShareVia()
        break
      case EDIT:
        if (get(cardData, 'type') === 'post') {
          navigateToWebView({
            navigation: undefined,
            pageUrl: `${BASE_URL}/mobile/post/create?tid=${get(cardData, 'tid')}`
          })
        } else {
          navigateToWebView({
            navigation: undefined,
            pageUrl: `${BASE_URL}/mobile/article/create?tid=${get(cardData, 'tid')}`
          })
        }
        break
      case REPOST:
        navigateToWebView({
          navigation: undefined,
          pageUrl: 'https://sdlms.deepthought.education'
        })
        break
      case DELETE:
        this.deletePostPopupAlert(get(cardData, 'type'), get(cardData, 'tid'))
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
      case API_IDS.DELETE_POST:
        this.resetDataAndHitApi()

        break
      case API_IDS.SAVE_ITEM:
        showAndroidToastMessage('This event has been saved successfully')
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    const errMsg = get(error, 'data.status.message',  strings.ERROR_MESSAGES.SOME_ERROR_OCCURED)
    const displayMsg = typeof errMsg === 'string' ? errMsg : strings.ERROR_MESSAGES.SOME_ERROR_OCCURED

    switch (apiId) {
      case API_IDS.GET_ALL_POSTS:
        const isPostAvailable = get(this.postsData, 'postList.length', 0) > 0
        showAndroidToastMessage(displayMsg)
        this.updateFetchingStatus(false)
        this.updateApiErrorStatus(isPostAvailable ? false : true)
        break
      case API_IDS.SAVE_ITEM:
      case API_IDS.DELETE_POST:
        showAndroidToastMessage(displayMsg, ToastAndroid.SHORT)
        break
      default:
        break
    }
  }
}