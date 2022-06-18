import { StyleSheet } from 'react-native'
import { observable, action, makeObservable } from 'mobx'
import { log } from '../../config'

type modalTypes = 'left-right'| 'right-left'| 'top-bottom' | 'bottom-top'

const DEFAULT_SETTING = {
  showDrawer: false,
  modalStyling: StyleSheet.create({}),
  modalType: 'left-right',
  modalTransitionValue: 300,
  isFetching: false,
  closeOnOutsideClick: false,
  drawerCloseEvent: undefined
}

export class GenericDrawerStore {
  @observable showDrawer: boolean
  modalTransitionValue: number
  modalStyling: any
  modalType: modalTypes
  @observable renderingComponent
  @observable closeOnOutsideClick
  drawerCloseEvent

  constructor() {
    this.init()
    makeObservable(this)
  }

  @action init() {
    this.showDrawer = DEFAULT_SETTING.showDrawer
    this.modalTransitionValue = DEFAULT_SETTING.modalTransitionValue
    this.modalStyling = DEFAULT_SETTING.modalStyling
    this.modalType = 'left-right'
    this.renderingComponent = undefined
    this.closeOnOutsideClick = false
  }

  @action enableDrawer() {
    this.showDrawer = true
  }

  @action disableDrawer(clearData = true) {
    this.showDrawer = false
    if (clearData) {
      this.clearData()
    }
  }

  @action clearData() {
    this.renderingComponent = undefined
  }

  @action
  setRenderingComponent = renderComponent => {
    this.renderingComponent = () => renderComponent
  }

  getRenderingComponent = () => {
    return this.renderingComponent()
  }

  setModalTransitionVal = transitionVal => {
    this.modalTransitionValue = transitionVal
  }

  getModalTransitionVal = () => {
    return this.modalTransitionValue
  }

  setModalStyling = modalStyling => {
    this.modalStyling = modalStyling
  }

  getModalStyling = () => {
    return this.modalStyling
  }

  setModalType = modalType => {
    this.modalType = modalType
  }

  getModalType = () => {
    return this.modalType
  }

  isDrawerEnabled = () => this.showDrawer

  @action
  setCloseDrawerOnOutsideClick = () => {
    this.closeOnOutsideClick = true
  }

  getCloseDrawerOnOutsideClick = () => this.closeOnOutsideClick

  closeDrawerWithAnimation = () => {
    log('closeDrawerWithAnimationcloseDrawerWithAnimation', this.drawerCloseEvent)

    if (this.drawerCloseEvent) {
      log('closeDrawerWithAnimationcloseDrawerWithAnimation')
      this.drawerCloseEvent()
    }
  }

  setDrawerCloseEvent = (event) => {
    log('setDrawerCloseEventsetDrawerCloseEvent', event)
    this.drawerCloseEvent = event
  }
}