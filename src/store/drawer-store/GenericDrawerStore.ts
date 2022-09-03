import { action, makeObservable, observable } from 'mobx'
import { log } from '../../config'

const DEFAULT_SETTINGS = {
  isDrawerEnabled: false,
  renderingComponent: undefined,
  closeDrawerOnOutsideTouch: false
}

export class GenericDrawerStore {

    @observable isDrawerEnabled
    @observable renderingComponent
    closeDrawerOnOutsideTouch

    constructor(){
      this.init()
      makeObservable(this)
    }

    init = () => {
      Object.keys(DEFAULT_SETTINGS).forEach(key => this[key] = DEFAULT_SETTINGS[key])
    }

    @action
    enableDrawer = () => {
      log('enableDrawerenableDrawer', this.isDrawerEnabled)
      this.isDrawerEnabled = true
    }

    @action
    disableDrawer = () => {
      this.isDrawerEnabled = false
    }

    @action
    setRenderingComponent = (renderingComponent) => {
      this.renderingComponent = renderingComponent
    }

    @action
    updateCloseDrawerOnOutsideTap = (value) => {
      this.closeDrawerOnOutsideTouch = value
    }

}