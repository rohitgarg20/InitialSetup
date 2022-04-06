import React, { ReactElement, PureComponent } from 'react'
import { Animated, TouchableOpacity, View, Easing } from 'react-native'
import { get } from 'lodash'
import { log } from '../config'

interface IProps {
  renderHeaderComponent?: (isViewExpanded) => ReactElement<any>
  renderMainContent?: (isViewExpanded) => ReactElement<any>
  cardKey?: string
  onCardPress?: (cardKey) => void
  cardContainerStyle?: any
  animationDuration?: number
  testID?: string
  headerTouchableViewTestId?: string
  isAlwaysOpen?: boolean
  isOpen?: boolean
}

interface IState {
  childViewHeight?: number
  isViewExpanded?: boolean
  isHeightMeasured?: boolean
  headerHeight?: number
}

export class AnimatedCardComponent extends PureComponent<IProps, IState> {
  animatedHeightValue

  constructor(props: IProps) {
    super(props)
    this.animatedHeightValue = new Animated.Value(0)
    this.state = {
      headerHeight: 0,
      childViewHeight: 0,
      isViewExpanded: get(props, 'isAlwaysOpen', false),
      isHeightMeasured: false
    }
  }

  componentWillUnmount() {
    log('unmount is called')
  }

  componentDidMount() {
    log('did mount is called')
  }

  getChildViewLayout = ({ nativeEvent }) => {
    const { isAlwaysOpen = false } = this.props
    const { childViewHeight, isHeightMeasured } = this.state
    const { height } = nativeEvent.layout
    if (childViewHeight !== height && !isHeightMeasured) {
      this.setState({
        childViewHeight: height,
        isHeightMeasured: true
      })
      if (isAlwaysOpen) {
        this.startAnimation(height)
      }
    }
  }

  startAnimation = (toValue) => {
    const { animationDuration = 100 } = this.props

    Animated.timing(this.animatedHeightValue, {
      toValue: toValue,
      duration: animationDuration,
      useNativeDriver: false,
      easing: Easing.in(Easing.ease)
    }).start(() => {
      //
    })

    // Animated.spring(this.animatedHeightValue, {
    //     toValue: toValue,
    //     useNativeDriver: false
    // }).start()
  }

  onToggle = () => {
    const { cardKey, onCardPress } = this.props
    const { isViewExpanded, childViewHeight } = this.state
    const viewFinalHeight = isViewExpanded ? 0 : childViewHeight

    this.setState({ isViewExpanded: !isViewExpanded })
    this.startAnimation(viewFinalHeight)

    if (onCardPress) {
      onCardPress(cardKey)
    }
  }

  getHeaderViewLayout = ({ nativeEvent }) => {
    const { headerHeight } = this.state
    const { height } = nativeEvent.layout

    if (headerHeight !== height) {
      this.setState({ headerHeight: height })
    }
  }

  renderHeaderComponent = () => {
    const { renderHeaderComponent, headerTouchableViewTestId, isAlwaysOpen = false } = this.props
    const { isViewExpanded } = this.state

    return (
      <View onLayout={this.getHeaderViewLayout}>
        <TouchableOpacity disabled={isAlwaysOpen} onPress={this.onToggle} activeOpacity={1} testID={headerTouchableViewTestId}>
          {renderHeaderComponent(isViewExpanded)}
        </TouchableOpacity>
      </View>
    )
  }

  renderChildComponent = () => {
    const { renderMainContent } = this.props
    const { isViewExpanded } = this.state

    return (
      <View onLayout={this.getChildViewLayout} >
        {renderMainContent(isViewExpanded)}
      </View>
    )
  }

  render() {
    const { cardContainerStyle = {}, cardKey, isAlwaysOpen } = this.props
    const { isHeightMeasured, childViewHeight, headerHeight, isViewExpanded } = this.state
    log('isViewExpandedisViewExpandedisViewExpanded is called inannsndjnfjnfjnf', isViewExpanded, cardKey, isAlwaysOpen)

    let contentStyle: any = {}
    contentStyle = isHeightMeasured ? {
      opacity: 1,
      transform: [
        {
          translateY: this.animatedHeightValue.interpolate({
            inputRange: [0, childViewHeight],
            outputRange: [-childViewHeight - headerHeight, 0]
          })
        }
      ],
      overflow: 'hidden'
    } : {
      opacity: 0,
      position: 'absolute'
    }

    const cardContainerStyleCal: any = isHeightMeasured && (
      isViewExpanded
        ? { overflow: 'hidden', minHeight: this.animatedHeightValue }
        : { overflow: 'hidden', height: this.animatedHeightValue }
    )

    return (
      <View style={cardContainerStyle}>
        <Animated.View style={cardContainerStyleCal}>
          <Animated.View style={contentStyle}>
            {this.renderChildComponent()}
          </Animated.View>
        </Animated.View>
        {this.renderHeaderComponent()}
      </View>
    )
  }
}
