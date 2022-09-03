/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AppState, StyleSheet, View } from 'react-native'
import { log } from '../../config'
import { segoeFontTextStyles } from '../commonStyles'
import { colors } from '../config'
import { CustomText } from './CustomText'

interface IProps {
  timerCountdown: number
  onTick?: (currentTime) => void
  onTimerElapsed?: () => void
}

const styles = StyleSheet.create({
  otpItemContainer: {
    // borderWidth: 1,
    borderRadius: 7,
    backgroundColor: colors.white,
    height: 48,
    width: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.primaryButton,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export const timeWrapper = (props: IProps) => {
  const { timerCountdown, onTick, onTimerElapsed } = props

  const [timerValue, updateTimerValue] = useState(0)
  const timerRef = useRef(null)
  const wentBackgroundAt = useRef(null)

  const onAppStateChange = useCallback((currentState) => {
    if (currentState === 'background') {
      wentBackgroundAt.current = Date.now()
    } else if (currentState === 'active') {
      if (wentBackgroundAt.current !== 0) {
        const timeInBackground = Math.round((Date.now() - (wentBackgroundAt.current)) / 1000)
        updateTimerValue(seconds => {
          const updatedTime = seconds + timeInBackground
          if (updatedTime <= timerCountdown) {
            return updatedTime
          }
          return timerCountdown
        })
      }
    }
  }, [timerCountdown])

  useEffect(() => {
    log('app state use effetc t is called')
    const backgroundListener = AppState.addEventListener('change', onAppStateChange)
    return () => backgroundListener.remove()
  }, [onAppStateChange])

  useEffect(() => {
    // log('first useeffect is called')
    timerRef.current = setInterval(() => {
      updateTimerValue(seconds => seconds + 1)
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [timerCountdown])

  useEffect(() => {
    // log('timerValuetimerValuetimerValue', timerValue)
    if (timerValue === timerCountdown) {
      clearInterval(timerRef.current)
      if (onTimerElapsed) {
        onTimerElapsed()
      }
    }
    if (onTick) {
      onTick(timerValue)
    }
  }, [timerCountdown, timerValue, onTick, onTimerElapsed])


  return (
    <View style = {styles.otpItemContainer}>
      <CustomText textStyle={segoeFontTextStyles.extraLargeHeadingWithBlackNormalWeight}>{timerCountdown - timerValue}</CustomText>
    </View>
  )
}

export {
  timeWrapper as TimeWrapper
}
