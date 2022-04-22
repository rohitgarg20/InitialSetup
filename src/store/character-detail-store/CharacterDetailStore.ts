import { ICharacterData } from './../../common/Interfaces';
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import {get} from 'lodash'
import { strings } from '../../common/strings'
import { log } from '../../config'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { action, makeObservable, observable } from 'mobx'
import { LOCATION_TYPE } from '../../common/constant';

const DEFAULT_SETTINGS = {
  characterDetailData: {},
  locationData: {},
  originId: '',
  locationId: ''
}

export class CharacterDetailStore implements RESPONSE_CALLBACKS {

  @observable characterDetailData: ICharacterData
  @observable locationData
  originId
  locationId

  constructor() {
    this.init()
    makeObservable(this)
  }

  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }

  @action
  setCharacterDetailData = (characterDetailData) => {
    this.characterDetailData = { ...characterDetailData}
  }

  setInitialCharacterData = (characterData) => {
    const { location, origin } = characterData as ICharacterData || {}
    const { url: locationUrl = '' } = location || {}
    const { url: originUrl = '' } = origin || {}
    const locationUrlIndex = locationUrl.lastIndexOf('/')
    const originUrlIdIndex = originUrl.lastIndexOf('/')
    const locationUrlId = locationUrlIndex !== -1 ? locationUrl.substring(locationUrlIndex + 1) : ''
    const originUrlId = originUrlIdIndex !== -1 ? originUrl.substring(originUrlIdIndex + 1) : ''
    this.originId = originUrlId
    this.locationId = locationUrlId
    this.getCharacterLocationData([locationUrlId, originUrlId])
    this.setCharacterDetailData(characterData)
    log('setInitialCharacterDatasetInitialCharacterData', locationUrlId, originUrlId)
  }

  getCharacterLocationData = async (locationIds) => {

    const charactersList = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.GET_LOCATION_DETAIL,
      apiId: API_IDS.GET_LOCATION_DETAIL,
      params: JSON.stringify({
        ids: locationIds
      })

      // urlParams: {
      //   tid: this.discussionRoomId
      // }
    })
    await  charactersList.hitGetApi()
  }

  @action
  setLocationData = (locationData) => {
    this.locationData = { ...locationData}
    log('setLocationDatasetLocationData', this.locationData)
  }

  constructLocationDetailData = (responseData) => {
    const formattedLocationData = responseData.reduce((locationData, locationItem) => {
      const { id } = locationItem || {}
      if (id.toString() === this.originId) {
        if (!locationData[LOCATION_TYPE.ORIGIN]) {
          locationData[LOCATION_TYPE.ORIGIN] = {
            ...locationItem
          }
        }
      } else {
        if (!locationData[LOCATION_TYPE.LOCATION]) {
          locationData[LOCATION_TYPE.LOCATION] = {
            ...locationItem
          }
        }
      }
      return locationData
    }, {})
    log('constructLocationDetailDataconstructLocationDetailData', responseData, formattedLocationData, this.originId, this.locationId)
    this.setLocationData(formattedLocationData)
  }

  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response, response.data)
    switch (apiId) {
      case API_IDS.GET_LOCATION_DETAIL:
        this.constructLocationDetailData(response)
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.GET_LOCATION_DETAIL:
        showAndroidToastMessage(get(error, 'data', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED) || '')

        break
      default:
        break
    }
  }

}
