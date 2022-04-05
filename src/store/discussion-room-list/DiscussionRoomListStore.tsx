import { IEventListItem } from './../interfaces'
import { action, makeObservable, observable } from 'mobx'
import { get, map } from 'lodash'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage, toDateTime } from '../../utils/app-utils'
import { timeFromNow } from '../../utils/DateHelper'

const PAGE_SIZE = 10

const DEFAULT_SETTINGS = {
  discussionRoomData: {
    roomsList: [],
    current_page: -1,
    last_page: undefined
  },
  isFetching: false
}


export class DiscussionRoomListStore implements RESPONSE_CALLBACKS {

  @observable discussionRoomData
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


  getDiscussionRoomsListData = async () => {

    const loginUser = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.GET_DISCUSSION_ROOM_LIST,
      apiId: API_IDS.GET_DISCUSSION_ROOM_LIST,
      urlParams: {
        // type: 'latest',
        // limit: PAGE_SIZE,
        // page: get(this.discussionRoomData, 'current_page', 0) + 1
      }
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitGetApi()
  }

  constructDiscussionRoomListData = (responseData) => {
    const tempDiscussionRoomData = { ...this.discussionRoomData }
    log('constructEventListData', responseData)
    const roomList = get(responseData, 'data', [])
    const currentPage = get(responseData, 'current_page')
    const lastPage = get(responseData, 'last_page')
    const formattedData: IEventListItem[] = map(roomList, (roomData) => {
      const {_id = '', _key ='', attendees = 0, picture = '', name = '', type, description = '', timestamp,
        viewcount = 0,tagline = '', author   } = roomData || {}
      const { username = '', status = '', lastonline = 0 } = author || {}
      return {
        _id,
        _key,
        attendees,
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
        }
      }
    })
    return {
      roomsList: [...tempDiscussionRoomData.roomsList, ...formattedData],
      current_page: currentPage,
      last_page: lastPage
    }
  }

  @action
  setDiscussionData = (discussionRoomData) => {
    this.discussionRoomData = { ...discussionRoomData}
    log('setDiscussionDatasetDiscussionData', this.discussionRoomData)
  }

  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response)
    switch (apiId) {
      case API_IDS.GET_DISCUSSION_ROOM_LIST:
        const discussionRoomData = this.constructDiscussionRoomListData(get(response, 'response', {}))
        this.setDiscussionData(discussionRoomData)
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

        break
      default:
        break
    }
  }
}