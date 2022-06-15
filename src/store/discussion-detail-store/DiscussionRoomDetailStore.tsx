import { observable, makeObservable,action } from 'mobx'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage, toDateTime } from '../../utils/app-utils'
import { get } from 'lodash'
import { IEventListItem } from '../interfaces'
import { timeFromNow } from '../../utils/DateHelper'
import { discussion_data } from '../ApiRespData'

const DEFAULT_SETTINGS = {
  isFetching: false,
  discussionRoomId: '',
  discussionRoomData: {},
  isApiError: false


}

export class DiscussionRoomDetailStore implements RESPONSE_CALLBACKS {

  @observable isFetching
  @observable discussionRoomId
  @observable discussionRoomData
  @observable isApiError


  constructor() {
    this.init()
    makeObservable(this)
  }


  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }

  @action
  setDiscussionRoomId = (roomId) => {
    this.discussionRoomId = roomId
  }

  getInitData = (id) => {
    this.updateFetchingStatus(true)
    this.setDiscussionRoomId(id)
    this.getDiscussionRoomsDetailData()
  }

  @action
  updateApiErrorStatus = (value) => {
    this.isApiError = value
  }

  onRefetchData = () => {
    this.updateFetchingStatus(true)
    this.updateApiErrorStatus(false)
    this.getDiscussionRoomsDetailData()
  }

  getDiscussionRoomsDetailData = async () => {

    const loginUser = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.GET_DISCUSSION_ROOM_LIST,
      apiId: API_IDS.GET_DISCUSSION_ROOM_LIST,
      prefetch: false,
      urlParams: {
        tid: this.discussionRoomId
      }
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitPostApi()
  }


  updateFetchingStatus = (value) => {
    this.isFetching = value
  }


  constructDiscussionRoomData = (responseData) => {
    const { _id,  _key, description, name, tagline, picture, user = {}, tid = 0, viewcount = 0, timestamp, type,
      onlineCount = 0, membersCount = 0, mascotsCount = 0   } = responseData.data || {}
    const { username = '', status = '', lastonline = 0 } = user || {}

    const formattedData: IEventListItem = {
      _id,
      _key,
      description,
      category: type,
      image: picture,
      name,
      schedule: timestamp,
      tagline,
      viewcount,
      author: {
        userName: username,
        status,
        lastActiveTime: timeFromNow(lastonline)
      },
      tid,
      mascotsCount,
      onlineUsersCount: onlineCount,
      membersCount
    }
    return formattedData
  }

  @action
  setDiscussionRoomData = (discussionRoomData) => {
    this.discussionRoomData = {
      ...discussionRoomData
    }
    log('setDiscussionRoomDatasetDiscussionRoomData', discussionRoomData)
  }


  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response)
    switch (apiId) {
      case API_IDS.GET_DISCUSSION_ROOM_LIST:
        const discussionRoomData = this.constructDiscussionRoomData(get(response, 'response', {}))
        this.setDiscussionRoomData(discussionRoomData)
        this.updateFetchingStatus(false)
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.GET_DISCUSSION_ROOM_LIST:
        showAndroidToastMessage(get(error, 'data', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        this.updateFetchingStatus(false)
        this.updateApiErrorStatus(true)

        break
      default:
        break
    }
  }
}