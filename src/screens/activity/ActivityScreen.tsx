import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, segoeFontTextStyles } from '../../common'
import { CustomText } from '../../components/CustomText'

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dardBlack
  }
})

const activityScreen = () => {
  return (
    <View style = {style.mainContainer}>
      <CustomText textStyle={{
        ...segoeFontTextStyles.extraLargeHeadingWithBoldWeight
      }}>Coming Soon...</CustomText>
    </View>
  )
}

export {
  activityScreen as ActivityScreen
}
