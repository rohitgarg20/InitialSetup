import React, { useState } from 'react'
import {  StyleSheet, TouchableOpacity, View } from 'react-native'
import { map } from 'lodash'
import { strings } from '../common/Strings'
import { CustomText, IconButtonWrapper, RoundedBorderContainerComponent } from '../common/components'
import { colors } from '../common'
import { popinsTextStyle } from '../common/commonStyles'
import { icons } from '../common/icons'

const styles = StyleSheet.create({
  borderContainer: {
    borderRadius: 10,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black
  },
  tempOperatorContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.black,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%'
  }
})


const { BODY_TEMP } = strings.RESIDENT_ENTRY

enum BUTTON_KEYS {
  DECREASE = 'desc',
  INCREASE = 'inc'
}

const MINIMUM_TEMP = 80
const MAX_TEMP = 110

export const BodyTemperatureComponent = () => {
  const [bodyTemp, updateTemp] = useState(90)


  const onChangeTempValue = (btnKey) => {
    if(btnKey === BUTTON_KEYS.DECREASE) {
      updateTemp(bodyTemp - 1)
    } else {
      updateTemp(bodyTemp + 1)
    }
  }


  const renderTempOperatorButton = ({ iconSrc, btnKey, disabled }) => {
    return (
      <TouchableOpacity style = {styles.borderContainer} onPress = {() => {
        onChangeTempValue(btnKey)
      }}
      disabled = {disabled}
      >
        <IconButtonWrapper
          iconImage={iconSrc}
          iconHeight = {2}
          iconWidth = {'70%'}
        />
      </TouchableOpacity>
    )
  }

  const renderCurrentTempComponent = () => {
    return (
      <View style = {styles.tempOperatorContainer}>
        {renderTempOperatorButton({
          iconSrc: icons.ADD_MORE_TAB,
          btnKey: BUTTON_KEYS.DECREASE,
          disabled: bodyTemp === MINIMUM_TEMP
        })}
        <CustomText textStyle={popinsTextStyle.twentyNormalBlack}>{bodyTemp}</CustomText>
        {renderTempOperatorButton({
          iconSrc: icons.ACTIVITY_TAB,
          btnKey: BUTTON_KEYS.INCREASE,
          disabled: bodyTemp === MAX_TEMP
        })}
      </View>
    )
  }

  return (
    <RoundedBorderContainerComponent containerStyle = {{
      paddingBottom: 10,
      alignItems: 'center',
      width: '45%',
      marginBottom: 2,
      borderRadius: 15
    }}>
      <CustomText textStyle={popinsTextStyle.sixteenSemiBoldBlack}>{BODY_TEMP}</CustomText>
      {renderCurrentTempComponent()}
    </RoundedBorderContainerComponent>
  )
}