import React, { Component } from 'react'
import { View, TouchableOpacity, Animated } from 'react-native'
import { get, isNumber } from 'lodash'
import { log } from '../../config'
import { getImageSource, isImageCached } from '../../utils/app-utils'



const getIconImageStyle = (iconHeight: number | string, iconWidth: number | string, backgroundColor?: string) => ({
  height: iconHeight,
  width: iconWidth,
  alignSelf: 'center',
  // backgroundColor,
  resizeMode: 'contain'
})

interface Props {
  backgroundColor?: string
  iconHeight?: number | string
  iconImage: any
  iconWidth?: number | string
  imageResizeMode?: string
  onHold?: () => any
  onLeave?: () => any
  onPressIn?: () => any
  styling?: object
  submitFunction?: () => any
  testID?: string
  imageTestID?: string
  alternateImage?: any
  alternateImageStyle?: any
  containerStyle?: any
}
interface State {
  imageObject
  imageStyle
}

export class IconButtonWrapper extends Component<Props, State> {
  static defaultProps = {
    backgroundColor: '#000',
    iconHeight: 50,
    iconWidth: 50,
    imageResizeMode: 'contain',
    onHold: undefined,
    onLeave: undefined,
    onPressIn: undefined,
    styling: {},
    submitFunction: undefined,
    displayLoadingImage: false,
    testID: '',
    imageTestID: '',
    containerStyle: {}
  }

  wrapperContainerProps = {}

  constructor(props) {
    super(props)
    this.wrapperContainerProps = this.getWrapperContainerProps(props)

    const { iconImage, styling } = props
    this.state = {
      imageObject: getImageSource(iconImage),
      imageStyle: styling
    }
  }

  getWrapperContainerProps = (props) => {
    const { iconHeight, iconWidth } = props
    const isIconDimensionType = typeof iconHeight === 'string' && typeof iconWidth === 'string'
    if (isIconDimensionType) {
      return {
        style: {
          flex: 1,
          justifyContent: 'space-around'
        }
      }
    }

    return {}
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.styling) !== JSON.stringify(this.props.styling)) {
      this.setState({
        imageStyle: nextProps.styling
      })
    }

    if (JSON.stringify(nextProps.iconImage) !== JSON.stringify(this.props.iconImage)) {
      this.setState({
        imageObject: getImageSource(nextProps.iconImage)
      })
    }
  }

  componentDidMount = async () => {
    const { alternateImage, iconImage, alternateImageStyle } = this.props
    if (!isNumber(iconImage)) {
      const isImageAvailable = await isImageCached(iconImage)
      if (!isImageAvailable && alternateImage) {
        this.setState({
          imageObject: getImageSource(alternateImage),
          imageStyle: alternateImageStyle
        })
      }
    }
  }

  render() {
    const {
      submitFunction,
      iconHeight,
      iconWidth,
      imageResizeMode,
      onHold,
      onLeave,
      onPressIn,
      testID = '',
      imageTestID,
      containerStyle
    } = this.props
    const { imageObject, imageStyle } = this.state


    const wrapperStyleProps = get(this.wrapperContainerProps, 'style', {})
    log('submitFunctionsubmitFunctionsubmitFunction', submitFunction)
    return (
      <View {...this.wrapperContainerProps}>
        <TouchableOpacity
          activeOpacity={1}
          disabled={!(submitFunction || onHold || onLeave)}
          onLongPress={onHold}
          onPress={submitFunction}
          onPressIn={onPressIn}
          onPressOut={onLeave}
          style={{
            ...wrapperStyleProps,
            ...containerStyle
          }}
          testID={testID}
        >
          <Animated.Image
            source={imageObject}
            style={[getIconImageStyle(iconHeight, iconWidth), { resizeMode: imageResizeMode }, imageStyle]}
            testID={imageTestID}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
