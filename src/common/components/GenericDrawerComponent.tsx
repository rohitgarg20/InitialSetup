import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef } from 'react'
import { Animated, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { log } from '../../config'
import { genericDrawerStore } from '../../store'
import { colors } from '../config'
import { getHeight } from '../Scaling'
import { CustomText } from './CustomText'

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    bottom: 0,
    backgroundColor: colors.drawerBackGroundGray
  },
  touchableContainer: {
    flex: 1,
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    height: '100%',
    left: 0,
    bottom: 0
  },
  renderContent: {
    flex: 1
  }
})

export const genericDrawerComponent = observer(() => {

  const { isDrawerEnabled, renderingComponent, closeDrawerOnOutsideTouch } = genericDrawerStore
  const drawerAnimatedValue = useRef(new Animated.Value(0)).current

  const showDrawerAnimation = useCallback(() => {
    Animated.timing(drawerAnimatedValue, {
      duration: 100,
      useNativeDriver: true,
      toValue: 1
    }).start()
  }, [drawerAnimatedValue])

  const closeDrawerAnimation = useCallback(() => {
    Animated.timing(drawerAnimatedValue, {
      duration: 100,
      useNativeDriver: true,
      toValue: 0
    }).start(() => genericDrawerStore.disableDrawer())
  }, [drawerAnimatedValue])

  useEffect(() => {
    log('isDrawerEnabledisDrawerEnabledisDrawerEnabled', isDrawerEnabled)

    if (isDrawerEnabled) {
      log('isDrawerEnabledisDrawerEnabledisDrawerEnabled', isDrawerEnabled)
      showDrawerAnimation()
    }
  }, [isDrawerEnabled, showDrawerAnimation])

  const getTransformedObj = () => {
    return {
      transform: [{
        translateY: drawerAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [getHeight(), 0],
          extrapolate: 'clamp'
        })
      }]
    }
  }


  const renderDrawerComponent = () => {
    const modalStyling = getTransformedObj()
    return (
      <Animated.View style = {[styles.mainContainer, modalStyling, { } ]}>
        <TouchableOpacity style = {styles.touchableContainer} activeOpacity = {1} onPress = {() => {
          if (closeDrawerOnOutsideTouch) {
            closeDrawerAnimation()
          }
        }} />
        <View style = {styles.renderContent}>
          {renderingComponent ? renderingComponent() : null }
        </View>
      </Animated.View>
    )
  }
  return (
    <>
      {isDrawerEnabled ? renderDrawerComponent() : null }
    </>
  )
})

export {
  genericDrawerComponent as GenericDrawerComponent
}
