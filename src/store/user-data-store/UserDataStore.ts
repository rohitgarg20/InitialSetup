import { action, makeObservable, observable } from "mobx"

const DEFAULT_SETTING = {
  userInfoData: {},
  userOptionsList: []
}


export class UserDataStore {
  @observable userInfoData: any
  @observable userOptionsList

  constructor() {
    this.init()
    makeObservable(this)
  }

  @action
  init() {
    Object.keys(DEFAULT_SETTING).forEach((key) => (this[key] = DEFAULT_SETTING[key]))
  }

  @action
  setUserInfoData = async (userInfoData) => {
    this.userInfoData = { ...userInfoData }
  }
}