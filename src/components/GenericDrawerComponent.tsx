import React from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { inject, observer } from 'mobx-react'

import { getHeight, getWidth } from '../common/Scaling'
import { GenericDrawerStore } from '../store/generic-drawer-store'
import { colors } from '../common'
import { log } from '../config'

interface MainDrawerProps {
  genericDrawerStore?: GenericDrawerStore
}

interface Props {
  genericDrawerStore?: GenericDrawerStore
  showDrawer: boolean
  renderModalContent: any
  modalTransitionDuration?: number
  modalStyling?: any
  modalMode?: 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top'
  closeDrawerOnOutsideTouch?: boolean
}

const DEFAULT_TRANSITION = 300
interface State {
  modalTransitionXY: any
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: '50%',
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: colors.white
  },

  screenContentWrapper: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },

  modal: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: colors.drawerBackGroundGray,
    justifyContent: 'center',
    zIndex: 99
  },
  submitButton: {
    backgroundColor: colors.darkBlue,
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 0,
    width: 70,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
    height: 40
  },
  submitTextStyle: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 14
  },
  inputTextStyle: {
    flex: 7,
    padding: 10,
    height: 40,
    borderWidth: 1,
    borderColor: colors.grey
  },
  inputFeildsWrapper: {
    // flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    minHeight: 40,
    marginBottom: 10
  },
  inviteFooterButton: {
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  backgroundView: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    top: 0,
    left: 0,
    width: '100%'
  }
})

@inject('genericDrawerStore')
@observer
export class GenericDrawerComponent extends React.Component<Props, State> {
  static defaultProps = {
    modalTransitionDuration: DEFAULT_TRANSITION,
    modalStyling: StyleSheet.create({}),
    modalMode: 'left-right'
  }

  constructor(props: Props, state: State) {
    super(props, state)

    const { genericDrawerStore } = this.props

    this.state = {
      modalTransitionXY: new Animated.Value(this.getInitAnimatedValue())
    }

    const isDrawerEnabled = genericDrawerStore.isDrawerEnabled()
    if (isDrawerEnabled) {
      this.onOpenDrawer()
    }
  }

  componentDidUpdate(prevProps) {
    const { showDrawer } = this.props

    if (showDrawer && showDrawer !== prevProps.showDrawer) {
      this.onOpenDrawer()
    } else if (!showDrawer && showDrawer !== prevProps.showDrawer) {
      this.onCloseDrawer()
    }
  }

  getInitAnimatedValue = () => {
    const { modalMode } = this.props

    let animatedValue = 0

    switch (modalMode) {
      case 'left-right':
        animatedValue = -getWidth()
        break

      case 'right-left':
        animatedValue = 2 * getWidth()
        break

      case 'top-bottom':
        animatedValue = -getHeight()
        break

      case 'bottom-top':
        animatedValue = 2 * getHeight()
        break

      default:
    }
    return animatedValue
  }

  getTransformObj = () => {
    const { modalMode } = this.props

    let translateObj = {}

    switch (modalMode) {
      case 'left-right':
      case 'right-left':
        translateObj = { translateX: this.state.modalTransitionXY }
        break

      case 'top-bottom':
      case 'bottom-top':
        translateObj = { translateY: this.state.modalTransitionXY }
        break

      default:
    }

    return translateObj
  }

  closeDrawer = () => {
    const { genericDrawerStore } = this.props
    genericDrawerStore.disableDrawer()
  }

  onOpenDrawer = () => {
    const { modalTransitionDuration } = this.props
    Animated.timing(this.state.modalTransitionXY, {
      duration: modalTransitionDuration,
      toValue: 0,
      useNativeDriver: true
    }).start()
  }

  onCloseDrawer = () => {
    const { modalTransitionDuration } = this.props
    Animated.timing(this.state.modalTransitionXY, {
      duration: modalTransitionDuration,
      toValue: this.getInitAnimatedValue(),
      useNativeDriver: true
    }).start()
  }

  render() {
    const { renderModalContent, modalStyling, closeDrawerOnOutsideTouch } = this.props

    const transformObj = this.getTransformObj()
    return (
      <Animated.View style={[styles.modal, modalStyling, { transform: [transformObj] }]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (closeDrawerOnOutsideTouch) {
              this.closeDrawer()
            }
          }}
          style={styles.backgroundView}
        />
        <View style = {{ flex: 1 }}>
          {renderModalContent()}
        </View>
      </Animated.View>
    )
  }
}

@inject('genericDrawerStore')
@observer
export class GenericDrawer extends React.Component<MainDrawerProps> {
  render() {
    const { genericDrawerStore } = this.props
    log('genericDrawerStoregenericDrawerStoregenericDrawerStore', genericDrawerStore.isDrawerEnabled())
    return genericDrawerStore.isDrawerEnabled() ? (
      <GenericDrawerComponent
        showDrawer={genericDrawerStore.isDrawerEnabled()}
        renderModalContent={genericDrawerStore.getRenderingComponent}
        modalTransitionDuration={genericDrawerStore.getModalTransitionVal()}
        modalStyling={genericDrawerStore.getModalStyling()}
        modalMode={genericDrawerStore.getModalType()}
        closeDrawerOnOutsideTouch={genericDrawerStore.getCloseDrawerOnOutsideClick()}
      />
    ) : null
  }
}
