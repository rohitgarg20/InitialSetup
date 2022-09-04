import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { heightToDp } from '../common'
import { CustomText } from '../common/components'
import { BACK_ICON_TYPES } from '../common'
import { BackButtonComponent } from './BackButtonComponent'

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    height: heightToDp('14%'),
    flexDirection: 'row'
  },
  heading: {
    flex: 1,
    textAlign: 'center',
    left: -20
  },
})

interface IProps {
  headerLabel: string
  hideBackButton?: boolean
  backIconType?: BACK_ICON_TYPES
  customHeadingStyle?: any
  headerStyle?: any
  customizedView?: () => ReactElement<any>
}

const headerComponent = (props: IProps) => {

  const { headerLabel, hideBackButton = false, backIconType, customHeadingStyle = {}, headerStyle = {}, customizedView } = props

  const renderHeaderSection = () => {
    return (
      <View style = {[styles.headerContainer, headerStyle]}>
        {hideBackButton ? null : <BackButtonComponent backIconType = {backIconType}/>}
        <CustomText textStyle={{ ...styles.heading, ...customHeadingStyle }}>{headerLabel}</CustomText>
        {customizedView && customizedView()}
      </View>
    )
  }
  return (
    renderHeaderSection()
  )
}

export {
  headerComponent as HeaderComponent
}
