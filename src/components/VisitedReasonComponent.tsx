import React, { useState } from 'react'
import {  StyleSheet, View } from 'react-native'
import { colors } from '../common'
import { popinsTextStyle } from '../common/commonStyles'
import { RoundedBorderContainerComponent, CustomText, TextInputComponent } from '../common/components'
import { strings } from '../common'

const styles = StyleSheet.create({
  inputTextContainer: {
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 10,
    marginTop: 10,
    textAlignVertical: 'center',
    minHeight: 50
    // height: 50
  }
})


const { VISIT_REASON, PLACEHOLDER } = strings.RESIDENT_ENTRY

export const VisitedReasonComponent = () => {

  const [visitReason, updateSearchText] = useState('')


  const onChangeSearchText = (searchText) => {
    updateSearchText(searchText)
  }

  const renderInputTextContainer = () => {
    return (
      <TextInputComponent
        useAnimated = {false}
        placeholder = {PLACEHOLDER}
        inputContainerStyle = {styles.inputTextContainer}
        textInputStyle = {popinsTextStyle.eighteenNormalBlack}
        inputValue = {visitReason}
        onChangeText = {onChangeSearchText}
        placeholderTextColor = {colors.lightGreyPlaceholder}
        multiline = {true}
      />
    )
  }
  return (
    <RoundedBorderContainerComponent containerStyle = {{
        paddingBottom: 10
    }}>
      <CustomText textStyle={popinsTextStyle.eighteenSemiBoldBlack}>{VISIT_REASON}</CustomText>
      {renderInputTextContainer()}
    </RoundedBorderContainerComponent>
  )
}