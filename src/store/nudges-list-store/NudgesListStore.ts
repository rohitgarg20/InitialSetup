import { INudgeListItem } from './../interfaces';
import { action, computed, makeObservable, observable } from 'mobx'
import { get, map } from 'lodash'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage, toDateTime } from '../../utils/app-utils'

const PAGE_SIZE = 10

const DEFAULT_SETTINGS = {
  nudgesData: {
    nudgesList: [],
    // current_page: -1,
    // last_page: undefined
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


  updateFetchingStatus = (value) => {
    this.isFetching = value
  }


  getNudgesListData = async () => {

    const loginUser = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.GET_NUDGES_LIST,
      apiId: API_IDS.GET_NUDGES_LIST,
      urlParams: {
        // type: 'latest',
        // limit: PAGE_SIZE,
        // page: get(this.discussionRoomData, 'current_page', 0) + 1
      }
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitGetApi()
  }

  constructNudgesListScreen = (nudgesList) => {
    const tempNudgesData = { ...this.nudgesData }
    const formattedData: INudgeListItem[] = map(nudgesList, (nudge) => {
      return {
        ...nudge,
        startDate: toDateTime(get(nudge, 'schedule')),
        endDate: toDateTime(get(nudge, 'end_time')),
      }
    })
    return {
      nudgesList: [...tempNudgesData.nudgesList, ...formattedData],
      // current_page: currentPage,
      // last_page: lastPage
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
  }

  @computed
  get currentNudgeData() {
    log('currentNudgeDatacurrentNudgeData', this.currentNudeIndex, get(this.nudgesData, `[${this.currentNudeIndex}]`, {}))
    return get(this.nudgesData, `nudgesList.[${this.currentNudeIndex}]`, {})
  }

  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response)
    switch (apiId) {
      case API_IDS.GET_NUDGES_LIST:
        const nudgesData = this.constructNudgesListScreen(get(response, 'response', []))
        this.setNudgesListData(nudgesData)
        this.updateFetchingStatus(false)
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.GET_NUDGES_LIST:
        showAndroidToastMessage(get(error, 'data', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        this.updateFetchingStatus(false)

        break
      default:
        break
    }
  }
}