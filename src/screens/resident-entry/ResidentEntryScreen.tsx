import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../common'
import { commonStyles } from '../../common/commonStyles'
import { strings } from '../../common/Strings'
import { BodyTemperatureComponent, HeaderComponent, VisitedReasonComponent, WearingMaskComponent } from '../../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryButton
  }
})

const { HEADER_TITLE } = strings.RESIDENT_ENTRY


export const ResidentEntryScreen = () => {


  const renderHeaderSection = () => {
    return (

      <HeaderComponent
        headerLabel={HEADER_TITLE}
        hideBackButton = {false}
        customHeadingStyle = {{
          left: 0
        }}
      />
    )
  }


  return (
    <View style = {styles.container}>
      {renderHeaderSection()}
      <VisitedReasonComponent/>
      <View style = {[commonStyles.rowContainer, {
        justifyContent: 'space-between',
        marginTop: 20
      }]}>
        <WearingMaskComponent/>
        <BodyTemperatureComponent/>
      </View>
    </View>
  )
}