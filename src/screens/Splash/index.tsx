import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../common'
import { LogoComponent } from '../../components'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lightGreyish,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export const splashScreen = () => {
  return (
    <View style = {styles.mainContainer}>
      <LogoComponent/>
    </View>
  )
}

export {
  splashScreen as SplashScreen
}