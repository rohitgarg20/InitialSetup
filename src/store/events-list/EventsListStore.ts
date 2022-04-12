import { IEventListItem } from './../interfaces';
import { action, makeObservable, observable } from 'mobx'
import { get, map } from 'lodash'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage, toDateTime } from '../../utils/app-utils'
import { preferencesDataStore } from '..';

const PAGE_SIZE = 10

const DEFAULT_SETTINGS = {
  eventData: {
    eventsList: [],
    current_page: -1,
    last_page: undefined
  },
  isFetching: false
}

export class EventsListStore implements RESPONSE_CALLBACKS {

  @observable eventData
  @observable isFetching

  constructor() {
    this.init()
    makeObservable(this)
  }


  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }

  @action
  resetDataAndHitApi = () => {
    this.updateFetchingStatus(true)
    this.eventData = {
      ...DEFAULT_SETTINGS.eventData
    }
    this.getEventsListData()
  }

  updateFetchingStatus = (value) => {
    this.isFetching = value
  }


  getEventsListData = async () => {
    const filterParams  = preferencesDataStore.getApiRequestParams()
    const loginUser = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.GET_EVENTS_LIST,
      apiId: API_IDS.GET_EVENTS_LIST,
      urlParams: {
        limit: PAGE_SIZE,
        page: get(this.eventData, 'current_page', 0) + 1,
        ...filterParams
      }
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitGetApi()
  }

  constructEventListData = (responseData) => {
    const tempEventData = { ...this.eventData }
    log('constructEventListData', responseData)
    const eventList = get(responseData, 'data', [])
    const currentPage = get(responseData, 'current_page')
    const lastPage = get(responseData, 'last_page')
    const formattedData: IEventListItem[] = map(eventList, (event) => {
      return {
        ...event,
        attendees: get(event, 'attendees', []),
        startDate: toDateTime(get(event, 'schedule')),
        category: get(event, 'type'),
      }
    })
    return {
      eventsList: [...tempEventData.eventsList, ...formattedData],
      current_page: currentPage,
      last_page: lastPage
    }
  }

  @action
  setEventsData = (eventData) => {
    this.eventData = { ...eventData}
    log('this.eventDatathis.eventData', this.eventData)
  }

  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response)
    switch (apiId) {
      case API_IDS.GET_EVENTS_LIST:
        const eventData = this.constructEventListData(get(response, 'response', {}))
        this.setEventsData(eventData)
        this.updateFetchingStatus(false)
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
      case API_IDS.LOGIN:
        showAndroidToastMessage(displayMsg)
        this.updateFetchingStatus(false)

        break
      default:
        break
    }
  }
}

