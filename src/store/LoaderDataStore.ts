import { action, makeObservable, observable } from "mobx"

const DEFAULT_SETTINGS = {
  showLoader: false
}

export class LoaderDataStore {

  @observable showLoader: boolean

  constructor() {
    this.init()
    makeObservable(this)
  }

  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => this[key] = DEFAULT_SETTINGS[key])
  }

  @action
  updateLoaderStatus = (status) => {
    this.showLoader = status
  }

}