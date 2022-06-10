import { observer } from 'mobx-react-lite'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../common'
import { HEADER_TOP } from '../common/constant'

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.dardBlack,
    padding: 10,
    borderColor: colors.lightBlack
  },
  fixedContainer: {
      marginTop: HEADER_TOP
  }
})

interface IProps {
  fixedHeaderComponent?: () => ReactElement<any>
  renderContainerComponent?: () => ReactElement<any>
  subContainerStyle?: any
}

const containerDataComponent = observer((props: IProps) => {
  const { fixedHeaderComponent, renderContainerComponent, subContainerStyle = {} } = props

  const renderFixedHeaderComponent = () => {
    if (fixedHeaderComponent) {
      return (
        <View style = {styles.fixedContainer}>
          {fixedHeaderComponent()}
        </View>
      )
    }
    return null
  }

  return (
    <View style = {[styles.subContainer, subContainerStyle]}>
      {renderFixedHeaderComponent()}
      {renderContainerComponent && renderContainerComponent()}
    </View>
  )
})

export {
  containerDataComponent as ContainerDataComponent
}
