import React from 'react'
import { StyleSheet, View } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder-1'
import { colors } from '../config'


const style = StyleSheet.create({
  containerViewStyle: {
    marginBottom: 10
  },
  singleLineSlimShimmerPlaceholder: {
    width: '100%',
    height: 45,
    marginBottom: 10,
    borderRadius: 2,
    backgroundColor: colors.red
  }
})

const singleLineSlimShimmerComponent = (props: any = {}) => {
  const { extraStyle = {}, ...extraProps } = props || {}
  return (
    <View style={style.containerViewStyle}>
      <ShimmerPlaceHolder
        isInteraction={false}
        autoRun
        style={[style.singleLineSlimShimmerPlaceholder, { ...extraStyle }]}
        {...extraProps}
        shimmerColors = {[colors.red, colors.primaryButton, colors.primaryButton]}
      />
    </View>
  )
}

export {
  singleLineSlimShimmerComponent as SingleLineSlimShimmerComponent
}