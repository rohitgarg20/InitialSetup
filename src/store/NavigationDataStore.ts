import { action, makeObservable, observable } from "mobx";

const DEFAULT_SETTINGS = {
  router: null,
  currentStackName: undefined
}

export class NavigationDataStore {

  @observable router
  @observable currentStackName
  constructor() {
    this.init()
    makeObservable(this)
  }

  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach(key => this[key] = DEFAULT_SETTINGS[key]);
  }

  @action
  updateRouter = (router) => {
    this.router = router
  }

  @action
  setCurrentStackName = (stackName) => {
    this.currentStackName = stackName
  }

}