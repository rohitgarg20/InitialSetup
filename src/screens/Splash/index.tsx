import React from 'react'
import { View, Text } from 'react-native'
import { icons } from '../../common/icons'
import { IconButtonWrapper } from '../../components'

export const splashScreen = () => {
  return (
    <View style = {{
      flex: 1
    }}>
      <IconButtonWrapper
        iconImage={icons.SPLASH_ICON}
        iconHeight = {'100%'}
        iconWidth = {'80%'}
      />
    </View>
  )
}

export {
  splashScreen as SplashScreen
}