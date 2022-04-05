import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CustomText, IconButtonWrapper } from '.'
import { colors, strings } from '../common'
import { icons } from '../common/icons'

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5
  },
  deepLabel: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: colors.black
  },
  thoughtLabel: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 18,
    color: colors.lightBlue,
    paddingLeft: 4
  }
})

interface IProps {
  logoIconStyle?: any
  textStyling?: any
}

const logoComponent = (props: IProps) => {
  const { logoIconStyle = {}, textStyling = {} } = props
  const renderIconComponent = () => {
    return (
      <IconButtonWrapper
        iconImage={icons.LOGO}
        iconHeight = {20}
        iconWidth = {20}
        styling = {logoIconStyle}
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