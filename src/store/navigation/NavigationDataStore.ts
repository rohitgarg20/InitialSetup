import { observable, action, makeObservable } from 'mobx'
import { get } from 'lodash'
import { log } from '../../config/AppConfig'

const DEFAULT_SETTING = {
  currentRouteData: {},
  router: undefined,
  prevRouteData: {},
  currentStackName: undefined,
  activeBottomTabName: undefined
}

export class NavigationDataStore {
  @observable currentRouteData: any = {}
  @observable router: any
  prevRouteData: any = {}
  @observable currentStackName
  @observable activeBottomTabName

  constructor() {
    Object.keys(DEFAULT_SETTING).forEach((key) => {
      this[key] = DEFAULT_SETTING[key]
    })
    makeObservable(this)
  }

  @action
  setPreviousRouteData(prevRouteObject) {
    this.prevRouteData = prevRouteObject
  }

  @action
  setCurrentRouteData(currentRouteObject) {
    this.currentRouteData = { ...currentRouteObject }
  }

  getPreviousRouteData() {
    return this.prevRouteData
  }

  @action
  getCurrentRouteData() {
    return this.currentRouteData
  }

  @action
  updateState(router) {
    log('updateStateupdateStateupdateStateupdateState', router)
    this.router = router
  }

  @action
  setCurrentStackName = (value) => {
    this.currentStackName = value
  }

  @action
  setActiveTabName = (tabBarName: string) => {
    this.activeBottomTabName = tabBarName
  }
}
