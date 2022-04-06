import { action, makeObservable, observable } from "mobx"

const DEFAULT_SETTING = {
  userInfoData: {}
}


export class UserDataStore {
  @observable userInfoData: any
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