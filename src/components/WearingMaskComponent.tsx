import React, { useState } from 'react'
import {  StyleSheet, TouchableOpacity, View } from 'react-native'
import { map } from 'lodash'
import { strings } from '../common/Strings'
import { ACTIONS_ALLOWED, YES_NO_KEYS } from '../common/Constant'
import { colors, widthToDp, fontDimensPer } from '../common'
import { popinsTextStyle } from '../common/commonStyles'
import { CustomText, RoundedBorderContainerComponent } from '../common/components'

const { WEARING_MASK } = strings.RESIDENT_ENTRY

const styles = StyleSheet.create({
  yesNoContainer: {
    paddingTop: 10
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioButton: {
    height: 14,
    width: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.white
  },
  complaintTypeLabel: {
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    color: colors.black,
    paddingLeft: 10,
    fontFamily: 'poppins'
  },
})


export const WearingMaskComponent = () => {

  const [selectedActionId, updateSelectedValue] = useState(YES_NO_KEYS.YES)


  const renderUserActionComponent = () => {
    return (
      <View style = {styles.yesNoContainer}>
        {
          map(ACTIONS_ALLOWED, (action) => {
            const { id, displayLabel } = action || {}
            const isSelected = id === selectedActionId
            return (
              <TouchableOpacity
                style = {styles.rowItem}
                onPress = {() => updateSelectedValue(id)}
              >
                <View style = {{ ...styles.radioButton, backgroundColor: isSelected ? colors.black : colors.white }}/>
                <CustomText textStyle={styles.complaintTypeLabel}>{displayLabel}</CustomText>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  return (
    <RoundedBorderContainerComponent containerStyle = {{
      paddingBottom: 10,
      width: '45%',
      marginBottom: 2,
      borderRadius: 15,
    }}>
      <CustomText textStyle={popinsTextStyle.sixteenSemiBoldBlack}>{WEARING_MASK}</CustomText>
      {renderUserActionComponent()}
    </RoundedBorderContainerComponent>
  )
}