import { ICharacterData } from './../../common/Interfaces';
import { action, makeObservable, observable } from 'mobx'
import { get, map } from 'lodash'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { strings } from '../../common/strings'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage } from '../../utils/app-utils'



const DEFAULT_SETTINGS = {
  isFetching: false,
  charactersList: [],
  totalRecords: 0,
  currentPageNo: 1,
  searchText: ''
}

export class CharactersListStore implements RESPONSE_CALLBACKS {

  @observable isFetching
  @observable charactersList: ICharacterData[]
  @observable searchText
  totalRecords
  currentPageNo

  constructor() {
    this.init()
    makeObservable(this)
  }

  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }

  @action
  resetListData = () => {
    this.charactersList = []
    this.resetCurrentPageNo()
    this.setTotalRecordsCount(0)
    this.updateFetchingStatus(true)
  }

  updateCurrentPage = () => {
    this.currentPageNo++
  }

  resetCurrentPageNo = () => {
    this.currentPageNo = DEFAULT_SETTINGS.currentPageNo
  }

  getAllCharactersList = async () => {

    const charactersList = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.GET_ALL_CHARACTERS,
      apiId: API_IDS.GET_ALL_CHARACTERS,
      urlParams: {
        page: this.currentPageNo,
        name: this.searchText
      }
    })
    await  charactersList.hitGetApi()
  }

  updateFetchingStatus = (value) => {
    this.isFetching = value
  }

  @action
  setCharactersListData = (charactersList) => {
    this.charactersList = [...this.charactersList, ...charactersList]
  }

  setTotalRecordsCount = (totalRecords) => {
    this.totalRecords = totalRecords
  }

  @action
  updateSearchText = (searchText) => {
    this.searchText = searchText
  }

  constructCharacterListData = (responseData) => {
    const totalRecords = get(responseData, 'info.count', 0)
    const results = get(responseData, 'results', [])
    const formattedData: ICharacterData[] = map(results, (item) => {
      return {
        ...item
      }
    })
    this.setCharactersListData(formattedData)
    this.setTotalRecordsCount(totalRecords)
  }

  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response)
    switch (apiId) {
      case API_IDS.GET_ALL_CHARACTERS:
        this.constructCharacterListData(response)
        this.updateFetchingStatus(false)
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.GET_ALL_CHARACTERS:
        showAndroidToastMessage(get(error, 'error', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        this.updateFetchingStatus(false)

        break
      default:
        break
    }
  }
}