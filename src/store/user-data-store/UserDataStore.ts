import { action, makeObservable, observable } from "mobx"
import { get } from 'lodash'

const DEFAULT_SETTING = {
  userInfoData: {},
  userOptionsList: [],
  searchText: '',
  xsrfToken: ''
}


export class UserDataStore {
  @observable userInfoData: any
  @observable userOptionsList
  @observable searchText
  xsrfToken

  constructor() {
    this.init()
    makeObservable(this)
  }

  @action
  updateSearchText = (value) => {
    this.searchText = value
  }

  @action
  init() {
    Object.keys(DEFAULT_SETTING).forEach((key) => (this[key] = DEFAULT_SETTING[key]))
  }

  setXsrfToken = (token) => {
    this.xsrfToken = token
  }

  @action
  setUserInfoData = async (userInfoData) => {
    this.userInfoData = { ...userInfoData }
  }

  getUserId = () => {
    return get(this.userInfoData, 'uid', '')
  }

}