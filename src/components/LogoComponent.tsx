import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CustomText, IconButtonWrapper } from '.'
import { colors, fontDimensPer, strings } from '../common'
import { icons } from '../common/icons'
import { goBack } from '../service'
import { widthToDp } from '../utils/Responsive'

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5
  },
  deepLabel: {
    fontWeight: '400',
    fontSize: widthToDp(fontDimensPer.medium),
    fontFamily: 'Poppins',
    // lineHeight: 18,
    color: colors.black
  },
  thoughtLabel: {
    fontWeight: '700',
    fontSize: widthToDp(fontDimensPer.medium),
    // lineHeight: 18,
    color: colors.lightBlue,
    paddingLeft: 4,
    fontFamily: 'Poppins-SemiBold',
  }
})

interface IProps {
  logoIconStyle?: any
  textStyling?: any
}

const logoComponent = (props: IProps) => {
  const { logoIconStyle = {}, textStyling = {} } = props

  const goBackToPreviousScreen = () => {
    goBack(undefined)
  }

  const renderIconComponent = () => {
    return (
      <IconButtonWrapper
        iconImage={icons.LOGO}
        iconHeight = {20}
        iconWidth = {20}
        styling = {logoIconStyle}
        submitFunction = {goBackToPreviousScreen}
      />
    )
  }

  const renderNameComponent = () => {
    const { DEEP, THOUGHT } = strings.DEEP_THOGHT
    return (
      <View style = {styles.rowContainer}>
        <CustomText textStyle={{ ...styles.deepLabel, ...textStyling }}>
          {DEEP}
        </CustomText>
        <CustomText textStyle={{ ...styles.thoughtLabel, ...textStyling }}>
          {THOUGHT}
        </CustomText>
      </View>
    )
  }

  return (
    <View style = {styles.rowContainer}>
      {renderIconComponent()}
      {renderNameComponent()}
    </View>
  )
}

export {
  logoComponent as LogoComponent
}