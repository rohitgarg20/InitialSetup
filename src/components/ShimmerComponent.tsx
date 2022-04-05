import React from 'react'
import { StyleSheet, View } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder-1'


const styles = StyleSheet.create({
  containerViewStyle: {
    marginBottom: 10
  },
  firstLineShimmerPlaceholder: {
    width: '100%',
    height: 15,
    marginBottom: 10,
    borderRadius: 2
  },
  lastLineShimmerPlaceholder: {
    width: '30%',
    height: 15,
    marginBottom: 10,
    borderRadius: 2
  }
})

const shimmerComponent = (viewProps: any = {}) => {
  return (
    <View {...viewProps} style={styles.containerViewStyle}>
      <View>
        <ShimmerPlaceHolder isInteraction={false} autoRun style={styles.firstLineShimmerPlaceholder} />
        <ShimmerPlaceHolder isInteraction={false} autoRun style={styles.firstLineShimmerPlaceholder} />
      </View>
      <ShimmerPlaceHolder isInteraction={false} autoRun style={styles.lastLineShimmerPlaceholder} />
    </View>
  )
}

export {
  shimmerComponent as ShimmerComponent
}