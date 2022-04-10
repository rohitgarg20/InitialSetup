import { observable, makeObservable,action } from 'mobx'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage, toDateTime } from '../../utils/app-utils'
import { get } from 'lodash'
import { IEventListItem } from '../interfaces'

const DEFAULT_SETTINGS = {
  isFetching: false,
  eventId: '',
  eventData: {}

}

export class EventRoomDetailStore implements RESPONSE_CALLBACKS {

  @observable isFetching
  @observable eventId
  @observable eventData


  constructor() {
    this.init()
    makeObservable(this)
  }


  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }

  @action
  setEventId = (roomId) => {
    this.eventId = roomId
  }

  getInitData = (id) => {
    this.updateFetchingStatus(true)
    this.setEventId(id)
    this.getEventRoomDetailData()
  }

  getEventRoomDetailData = async () => {

    const loginUser = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.GET_EVENTS_LIST,
      apiId: API_IDS.GET_EVENTS_LIST,
      urlParams: {
        tid: this.eventId
        // limit: PAGE_SIZE,
        // page: get(this.discussionRoomData, 'current_page', 0) + 1
      }
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitGetApi()
  }


  updateFetchingStatus = (value) => {
    this.isFetching = value
  }

  constructEventDetailData = (responseData) => {
    const { _id = '',  _key = '',  attendees = [], description = '', category = '', image = '', name = '',  schedule = 0,
      tagline = '', viewcount, moderator_data = {}, tid = 0, description_1 = '', description_2 = '',
      field_1 = '', field_2 = '' } = responseData || {}
    const formattedData: IEventListItem = {
      _id,
      _key,
      description,
      category,
      image,
      name,
      schedule,
      tagline,
      viewcount,
      author: {
        userName: get(moderator_data, 'username', ''),
        picture: get(moderator_data, 'picture', ''),
        signature: get(moderator_data, 'signature', ''),
        aboutme:get(moderator_data, 'aboutme', '')
      },
      tid,
      description_1,
      description_2,
      field_1,
      field_2,
      attendees,
      startDate: toDateTime(get(responseData, 'schedule'))
    }
    return formattedData
  }

  @action
  setEventDetailData = (eventData) => {
    this.eventData = {
      ...eventData
    }
    log('setEventDetailDatasetEventDetailData', eventData)
  }

  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response)
    switch (apiId) {
      case API_IDS.GET_EVENTS_LIST:
        const eventDetailData = this.constructEventDetailData(get(response, 'response[0]', {}))
        this.setEventDetailData(eventDetailData)
        this.updateFetchingStatus(false)
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.GET_EVENTS_LIST:
        showAndroidToastMessage(get(error, 'data', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        this.updateFetchingStatus(false)

        break
      default:
        break
    }
  }
}