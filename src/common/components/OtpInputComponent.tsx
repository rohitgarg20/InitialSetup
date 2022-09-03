import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, TextInput, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { colors, fontDimensPer,  } from '../config'
import { widthToDp } from '../Resposive'
import { isNumbers } from '../ValidationUtils'
import { isEmpty } from 'lodash'
import { Alert } from 'react-native'


const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 20
  },
  textInput: {
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize:  widthToDp(fontDimensPer.eighteenFont),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: colors.black
  },
  otpItemContainer: {
    // borderWidth: 1,
    borderRadius: 7,
    backgroundColor: colors.white,
    height: 48,
    width: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.primaryButton,

  }
})

interface IProps {
  otpLength: number
  onChangeOtpValue: (value) => void
  otpInputValue: any[]
  isDisabled?: boolean
}

export const otpInputComponent = (props: IProps) => {
  const { otpLength, onChangeOtpValue, otpInputValue, isDisabled = false} = props
  const otpFields = Array(otpLength).fill(0)
  const otpInputRef: any = useRef([])

  const onChangeOtpInputValue = (otpVal, index) => {
    const isNumber = isNumbers(otpVal)
    if (isNumber) {
      const updatedOtpValue = [ ...otpInputValue, otpVal]
      onChangeOtpValue(updatedOtpValue)
      if (otpInputRef?.current?.[index + 1]) {
        otpInputRef?.current?.[index + 1]?.focus()
      } else {
        otpInputRef?.current?.[index]?.blur()
      }
    } else if (isEmpty(otpVal)) {
      const tempOtp = [ ...otpInputValue]
      tempOtp.splice(index, 1)
      onChangeOtpValue(tempOtp)
      otpInputRef?.current?.[index]?.focus()
    } else {
      onChangeOtpValue(otpInputValue)
    }
  }

  const keyboardDidHide = () => {
    otpFields.forEach((_ , index) => {
      if (otpInputRef?.current[index]?.isFocused()) {
        otpInputRef.current[index].blur()
      }
    })
  }

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
    return () => keyboardDidHideListener.remove()
  }, [])

  const onKeyPress = (event, index) => {
    const { key } = event.nativeEvent
    if (key === 'Backspace' && !otpInputValue[index]) {
      let filteredOutput: any = []
      filteredOutput = otpInputValue.filter((value, otpFieldNo) => otpFieldNo < index - 1)
      onChangeOtpValue(filteredOutput)
      otpInputRef.current[index === 0 ? index : index - 1].focus()
    }
  }

  const renderOtpItem = (index) => {
    // log('renderOtpItemrenderOtpItem', index)
    return (
      <TextInput
        ref={(ref) => {
          otpInputRef.current[index] = ref
        }}
        style = {styles.textInput}
        maxLength={1}
        selectionColor = {colors.black}
        keyboardType={'number-pad'}
        value={otpInputValue?.[index] || ''}
        onChangeText={(value) => onChangeOtpInputValue(value, index)}
        onKeyPress = {(event) => onKeyPress(event, index) }
        returnKeyType = {index !== (otpLength - 1) ? 'next' : 'done'}
        editable = {!isDisabled}
      />
    )
  }

  const renderOtpComponent = () => {
    return (
      <View style = {styles.mainContainer} pointerEvents='none'>
        {otpFields.map((_, index) => {
          return (
            <View style = {styles.otpItemContainer}>
              {renderOtpItem(index)}
            </View>
          )
        })}
      </View>
    )
  }

  const updateFocusedIndex = () => {
    for (let index = 0; index < otpLength; index++ ) {
      if (!otpInputValue[index] || (index === otpLength - 1)) {
        otpInputRef.current[index].focus()
        break
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={updateFocusedIndex} style = {{
      // width: '100%',

    }}>
      <View>
       {renderOtpComponent()}
      </View>
    </TouchableWithoutFeedback>
  )
}

export {
  otpInputComponent as OtpInputComponent
}
