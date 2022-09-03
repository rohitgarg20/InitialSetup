import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../config'

const styles = StyleSheet.create({
  roundedBorderContainer: {
    borderRadius: 20,
    padding: 10,
    paddingBottom: 20,
    backgroundColor: colors.white
  }
})

const roundedBorderContainerComponent = (props) => {
  return (
    <View style = {[styles.roundedBorderContainer, props.containerStyle]}>
      {props.children}
    </View>
  )
}

export {
  roundedBorderContainerComponent as RoundedBorderContainerComponent
}
