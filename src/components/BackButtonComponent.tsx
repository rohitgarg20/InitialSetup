import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from '../common'
import { IconButtonWrapper } from '../common/components'
import { BACK_ICON_TYPES } from '../common'
import { icons } from '../common/icons'
import { log } from '../config'
import { goBack } from '../service'

const styles = StyleSheet.create({
  backButtonContainer: {
    borderWidth: 1,
    backgroundColor: colors.black,
    padding: 5,
    zIndex: 9999
  }
})

interface IProps {
  onPressBack?: () => void
  backButtonStyle?: any
  backIconType?: BACK_ICON_TYPES
}

const backButton = (props: IProps) => {
  const { backButtonStyle = {}, backIconType = BACK_ICON_TYPES.DEFAULT } = props


  const onBackButtonPressed = () => {
    const { onPressBack } = props
    log('onBackButtonPressed')
    if (onPressBack) {
      onPressBack()
    } else {
      goBack(undefined)
    }
  }

  const getBackIcon = useCallback(() => {
    switch (backIconType) {
      case BACK_ICON_TYPES.DEFAULT:
        return icons.BACK_ARROW
      case BACK_ICON_TYPES.CARET:
        return icons.BACK_CARET
      default:
        return icons.BACK_ARROW
    }
  }, [backIconType])

  return (
    <IconButtonWrapper
      iconImage={getBackIcon()}
      iconHeight = {20}
      iconWidth = {20}
      submitFunction = {onBackButtonPressed}
      styling = {backButtonStyle}
      containerStyle = {styles.backButtonContainer}
    />
  )
}

export {
  backButton as BackButtonComponent
}
