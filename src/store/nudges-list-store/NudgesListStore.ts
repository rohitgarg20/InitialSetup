import { ToastAndroid } from 'react-native';
import { jsonParseData, stringifyData } from './../../utils/app-utils';
import { INudgeListItem } from './../interfaces'
import { action, computed, makeObservable, observable } from 'mobx'
import { get, map, isEmpty } from 'lodash'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage, toDateTime } from '../../utils/app-utils'
import { SaveDataStore } from '../save-store'
import { preferencesDataStore, userDataStore } from '..'

const PAGE_SIZE = 10

const DEFAULT_SETTINGS = {
  nudgesData: {
    nudgesList: [],
    current_page: -1,
    last_page: undefined
  },
  isFetching: false,
  currentNudeIndex: 0
}


export class NudgesListStore implements RESPONSE_CALLBACKS {

  @observable nudgesData
  @observable isFetching
  @observable currentNudeIndex

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
    this.nudgesData = {
      ...DEFAULT_SETTINGS.nudgesData
    }
    this.currentNudeIndex = 0
    this.getNudgesListData()
  }


  updateFetchingStatus = (value) => {
    this.isFetching = value
  }


  getNudgesListData = async (prefetch = false) => {
    const { preferences,  sortByParam = '' } = preferencesDataStore.getPreferencesParamsList()
    const { searchText } = userDataStore

    const loginUser = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.GET_NUDGES_LIST,
      apiId: API_IDS.GET_NUDGES_LIST,
      urlParams: {
        limitBy: PAGE_SIZE,
        page: get(this.nudgesData, 'current_page', 0) + 1,
        sortBy: sortByParam?.length > 0 ? sortByParam : '',
        term: searchText
      },
      reqParams: {
        preferences
      },
      prefetch
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitPostApi()
  }

  constructNudgesListScreen = (responseData) => {
    const tempNudgesData = jsonParseData(stringifyData({ ...this.nudgesData }))
    const nudgesList = get(responseData, 'data', [])
    const currentPage = get(responseData, 'current_page')
    const lastPage = get(responseData, 'last_page')
    const formattedData: INudgeListItem[] = map(nudgesList, (nudge) => {
      return {
        ...nudge,
        startDate: toDateTime(get(nudge, 'schedule')),
        endDate: toDateTime(get(nudge, 'end_time'))
      }
    })
    return {
      nudgesList: [...tempNudgesData.nudgesList, ...formattedData],
      current_page: currentPage,
      last_page: lastPage
    }
  }

  @action
  setNudgesListData = (nudgesData) => {
    this.nudgesData = { ...nudgesData}
    log('this.eventDatathis.eventData', this.nudgesData)
  }

  @action
  updateCurrentIndex = () => {
    this.currentNudeIndex = this.currentNudeIndex + 1
    const nudesLength = get(this.nudgesData, 'nudgesList.length', 0)
    const { current_page, last_page } = this.nudgesData
    if (current_page === last_page) {
      //
    } else {
      if (nudesLength - this.currentNudeIndex <= 3)
        this.getNudgesListData(true)
    }
  }

  @computed
  get currentNudgeData() {
    // log('currentNudgeDatacurrentNudgeData', this.currentNudeIndex, get(this.nudgesData, `[${this.currentNudeIndex}]`, {}))
    return get(this.nudgesData, `nudgesList.[${this.currentNudeIndex}]`, {})
  }

  saveCurrentNudge = async (savedNudgeIndex) => {
    log('saveCurrentEventsaveCurrentEvent')
    const savedNudgeData = get(this.nudgesData, `nudgesList[${savedNudgeIndex}]`, {})
    if(!isEmpty(savedNudgeData)) {
      log('savedNudgeDatasavedNudgeData', savedNudgeData)
      const saveEvent = new SaveDataStore(this)
      const params = JSON.stringify({
        item_name: get(savedNudgeData, 'type')
      })
      log('saveCurrentEventsaveCurrentEvent 2', params)

      const urlParams = {
        id: get(savedNudgeData, '_id')
      }
      log('saveCurrentEventsaveCurrentEvent 3', urlParams)

      await saveEvent.saveAnEvent(params, urlParams, false)
    }
  }

  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response)
    switch (apiId) {
      case API_IDS.GET_NUDGES_LIST:
        const nudgesData = this.constructNudgesListScreen(get(response, 'response', {}))
        log('nudgesDatanudgesData', nudgesData)
        this.setNudgesListData(nudgesData)
        this.updateFetchingStatus(false)
        break
      case API_IDS.SAVE_ITEM:
        showAndroidToastMessage('This nudge has been saved successfully')
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
      case API_IDS.GET_NUDGES_LIST:
        showAndroidToastMessage(displayMsg)
        this.updateFetchingStatus(false)
        break
      case API_IDS.SAVE_ITEM:
        showAndroidToastMessage(displayMsg, ToastAndroid.SHORT)
        break
      default:
        break
    }
  }
}