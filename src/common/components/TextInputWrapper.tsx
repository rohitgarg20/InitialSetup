import React, { Component } from 'react'
import { Animated, Easing, StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import { log } from '../../config'
import { colors, fontDimensPer } from '../config'
import { icons } from '../icons'
import { widthToDp } from '../Resposive'

import { CustomText } from './CustomText'
import { IconButtonWrapper } from './IconButtonWrapper'

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderColor: colors.grey,
    backgroundColor: colors.grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    color: colors.black,
    fontSize:  widthToDp(fontDimensPer.sixteenFont),
    fontWeight: '300',
    height: '100%',
    fontFamily: 'Segoe-UI',
    // backgroundColor: 'red'
  },
  labelContainer: {
    position: 'absolute',
    // top: -3 - (fontDimens.normal / 2),
    left: 15,
    backgroundColor: colors.white
  },
  labelText: {
    fontSize: widthToDp(fontDimensPer.fifteenFont),
    color: colors.labelColor,
    paddingHorizontal: 5,
    fontWeight: '400',
    fontFamily: 'Segoe-UI'
  },
  errorMsg: {
    color: colors.red,
    paddingVertical: 2,
    fontWeight: '400',
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    paddingBottom: 5,
    fontFamily: 'Segoe-UI'
  }
})

interface IProps extends TextInputProps {
  label?: string
  shouldShowEyeIcon?: boolean
  inputValue?: string
  errorMsg?: string
  inputContainerStyle?: any
  labelContainerStyle?: any
  textInputStyle?: any
  shouldShowIconOrTextInRightSideInputBox?: boolean
  customRightSideView?: any
  useAnimated?: boolean
  isRequired?: boolean
  errorMessageStyle?: any

}

interface IState {
  isPasswordVisible?: boolean
}

export class TextInputComponent extends Component<IProps, IState> {

  animatedValue
  borderColor
  backgroundColor
  labelColor
  labelViewZIndex
  labelBackgroundColor
  constructor(props: IProps, state: IState) {
    super(props, state)
    this.animatedValue = props.inputValue?.length > 0 ? new Animated.Value(1) : new Animated.Value(0)
    log('props.inputValueprops.inputValue', props.inputValue)
    this.borderColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.grey, colors.placeholder]
    })
    this.backgroundColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.grey, colors.white]
    })
    this.labelBackgroundColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.grey, colors.primaryButton]
    })
    this.labelColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.labelColor, colors.black]
    })
    this.labelViewZIndex = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-1, 1]
    })
    this.state = {
      isPasswordVisible: props.shouldShowEyeIcon ? true : false
    }
  }

  textInputRef

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>){
    if (this.animatedValue.__getValue() === 0 && prevProps.inputValue?.length === 0 && this.props.inputValue?.length > 0) {
      this.animatedValue.setValue(1)
    }
  }

  onFocusTextInput = () => {
    // this.animatedValue.setValue(1)
    Animated.timing(this.animatedValue, {
      toValue: 1,
      useNativeDriver: false,
      duration: 300,
      easing: Easing.out(Easing.ease)
    }).start()
  }

  onBlurTextInput = () => {
    const { inputValue } = this.props
    if (!inputValue) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        useNativeDriver: false,
        duration: 300,
        easing: Easing.out(Easing.ease)
      }).start()
    }
  }

  onEyeIconPressed = () => {
    const { isPasswordVisible } = this.state

    this.setState({
      isPasswordVisible: !isPasswordVisible
    })
  }

  renderEyeIcon = () => {
    const { isPasswordVisible } = this.state
    return (
      <IconButtonWrapper
        iconImage={ isPasswordVisible ? icons.EYE_ICON : icons.EYE_ICON}
        iconHeight = {11}
        iconWidth = {20}
        imageResizeMode = {'contain'}
        submitFunction = {this.onEyeIconPressed}
      />
    )
  }

  renderErrorMsg = () => {
    const { errorMsg, errorMessageStyle = {}} = this.props
    return (
      <CustomText textStyle={{ ...styles.errorMsg, errorMessageStyle }}>
        {errorMsg}
      </CustomText>
    )
  }

  renderLabelComponent = () => {
    const { label, errorMsg, labelContainerStyle } = this.props
    let labelColor = this.labelColor
    if (errorMsg) {
      labelColor = colors.red
    }
    log('renderLabelComponentrenderLabelComponent')
    return (
      <Animated.View style = {[styles.labelContainer, labelContainerStyle, {
        transform: [
          {
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -15 - (16 / 2)],
              extrapolate: 'clamp'
            })
          }
        ],
        zIndex: this.labelViewZIndex,
        backgroundColor: this.labelBackgroundColor
        // backgroundColor: this.backgroundColor,
      }]}>
        <CustomText textStyle={{ ...styles.labelText,
          color: labelColor
        }}
        useAnimatedText>{label}</CustomText>
      </Animated.View>
    )
  }

  renderIconOrTextInInputBoxRightSide = () => {
    const { customRightSideView } = this.props
    return customRightSideView ? customRightSideView() : null
  }

  render() {
    const { inputValue, errorMsg = '', shouldShowEyeIcon, label, inputContainerStyle = {}, textInputStyle = {},
      shouldShowIconOrTextInRightSideInputBox = false, useAnimated = true, editable = true, errorMessageStyle = {} } = this.props
    const { isPasswordVisible } = this.state
    let borderColor = this.borderColor
    let labelColor = this.labelColor
    let backgroundColor =  this.backgroundColor
    if (errorMsg) {
      borderColor = colors.red
      labelColor = colors.red
    }
    if (!useAnimated) {
      borderColor = colors.grey
      backgroundColor = colors.white
    }

    if (!editable) {
      backgroundColor = '#DCDCDC'
    }
    return (
      <>
        <Animated.View style = {[styles.inputContainer, { borderColor, backgroundColor }, inputContainerStyle]}>
          <TextInput style = {[styles.textInput, textInputStyle]}
            ref = {(ref) => {
              if (!this.textInputRef) {
                this.textInputRef = ref
              }
            }}
            onFocus={this.onFocusTextInput}
            onBlur = {this.onBlurTextInput}
            value = {inputValue}
            // selectionColor = {colors.black}
            secureTextEntry = {isPasswordVisible}
            placeholderTextColor = {colors.black}
            {...this.props}
          />
          {this.renderLabelComponent()}
          {shouldShowEyeIcon && this.renderEyeIcon()}
          {shouldShowIconOrTextInRightSideInputBox ? this.renderIconOrTextInInputBoxRightSide() : null}
        </Animated.View>
        {errorMsg?.length > 0 && ( this.renderErrorMsg() )}
      </>
    )
  }
}
