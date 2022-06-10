import React from 'react'
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { CustomText } from './CustomText'
import { colors, fontDimensPer } from '../common/config'
import { widthToDp } from '../common/Responsive'

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.primaryButton,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.eighteenFont),
    fontWeight: '400',
    fontFamily: 'Segoe-UI',
  },
  normalButtonContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  normalButtonText: {
    fontSize: widthToDp(fontDimensPer.eighteenFont),
    fontWeight: '400',
    color: colors.lightGreyish
  }
})

interface IProps {
  buttonLabel: string
  onPressButton: () => void
  buttonType?: 'normal' | 'borderButton'
  buttonContainerStyles?: any
  buttonLabelStyles?: any
  disabled?: boolean
}

export const ButtonComponent = (props: IProps) => {
  const { buttonLabel, onPressButton, buttonType = 'borderButton', buttonContainerStyles = {}, buttonLabelStyles = {}, disabled = false } = props

  let buttonLabelStyle = {}
  let buttonContainerStyle = {}

  if (buttonType === 'borderButton') {
    buttonContainerStyle = styles.buttonContainer
  } else {
    buttonContainerStyle = styles.normalButtonContainer
  }

  if (buttonType === 'borderButton') {
    buttonLabelStyle = styles.buttonText
  } else {
    buttonLabelStyle = styles.normalButtonText
  }
  return (
    <TouchableOpacity onPress={onPressButton} style = {[buttonContainerStyle, buttonContainerStyles]} disabled = {disabled}>
      <CustomText textStyle={{ ...buttonLabelStyle, ...buttonLabelStyles }}>{buttonLabel}</CustomText>
    </TouchableOpacity>
  )
}
