import { observer } from 'mobx-react'
import React, { } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { colors } from '../common'
import { LoaderDataStore, loaderDataStore } from '../store'

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    opacity: 0.5
  }
})

const loader = observer(() => {
  const { showLoader } = loaderDataStore as LoaderDataStore
  return (
    showLoader ? <View style = {styles.mainContainer}>
      <ActivityIndicator
        animating = {true}
        size={'large'}
        color={colors.loader}
      />
    </View> : null
  )
})

export {
  loader as Loader
}