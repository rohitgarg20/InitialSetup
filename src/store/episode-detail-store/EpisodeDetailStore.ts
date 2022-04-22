import { IEpisodeDetail } from './../../common/Interfaces'
import { BaseRequest } from './../../http-layer/BaseRequest'
import { get } from 'lodash'
import { action, makeObservable, observable } from 'mobx'
import { RESPONSE_CALLBACKS } from '../../http-layer'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { strings } from '../../common/strings'
import { log } from '../../config'

const DEFAULT_SETTINGS = {
  episodeDetailData: {}
}

export class EpisodeDetailStore implements RESPONSE_CALLBACKS {

  @observable episodeDetailData: IEpisodeDetail

  constructor() {
    this.init()
    makeObservable(this)
  }

  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }

  getEpisodeDetailData = async (episodeId) => {

    const episodeDetail = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.GET_EPISODE_DETAIL,
      apiId: API_IDS.GET_EPISODE_DETAIL,
      params: JSON.stringify({
        id: episodeId
      })
    })
    await  episodeDetail.hitGetApi()
  }

  @action
  setEpisodeDetailData = (responseData) => {
    this.episodeDetailData = {
      ...responseData
    }
    log('setEpisodeDetailDatasetEpisodeDetailData', this.episodeDetailData)
  }

  onSuccess(apiId: string, response: any) {
    switch (apiId) {
      case API_IDS.GET_EPISODE_DETAIL:
        this.setEpisodeDetailData(response)
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.GET_EPISODE_DETAIL:
        showAndroidToastMessage(get(error, 'data', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED) || '')
        break
      default:
        break
    }
  }
}