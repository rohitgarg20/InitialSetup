import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import { colors, fontDimensPer } from '../common'
import { log } from '../config'
import { isEmpty } from 'lodash'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { isNumbers } from '../common/validator'
import { widthToDp } from '../utils/Responsive'

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
    fontSize:  widthToDp(fontDimensPer.medium),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  otpItemContainer: {
    // borderWidth: 1,
    borderRadius: 7,
    backgroundColor: colors.white,
    height: 48,
    width: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.grey,

  }
})

interface IProps {
  otpLength: number
  onChangeOtpValue: (value) => void
  otpInputValue: any[]
}

export const otpInputComponent = (props: IProps) => {
  const { otpLength, onChangeOtpValue, otpInputValue} = props
  const otpFields = Array(otpLength).fill(0)
  const otpInputRef = useRef([])

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
    log('onKeyPressonKeyPressonKeyPress', key, otpInputValue)
    if (key === 'Backspace' && !otpInputValue[index]) {
      let filteredOutput = []
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
      // width: '60%',

    }}>
      {renderOtpComponent()}
    </TouchableWithoutFeedback>
  )
}

export {
  otpInputComponent as OtpInputComponent
}