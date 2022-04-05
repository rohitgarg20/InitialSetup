import React from 'react'
import { IconButtonWrapper } from '.'
import { icons } from '../common/icons'
import { log } from '../config'
import { goBack } from '../service'

interface IProps {
  onPressBack?: () => void
  backButtonStyle?: any
}

const backButton = (props: IProps) => {
  const { backButtonStyle = {} } = props
  const onBackButtonPressed = () => {
    const { onPressBack } = props
    log('onBackButtonPressed')
    if (onPressBack) {
      onPressBack()
    } else {
      goBack(undefined)
    }
  }

  return (
    <IconButtonWrapper
      iconImage={icons.BACK_ARROW}
      iconHeight = {20}
      iconWidth = {20}
      submitFunction = {onBackButtonPressed}
      styling = {backButtonStyle}
    />
  )
}

export {
  backButton as BackButtonComponent
}
