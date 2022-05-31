import React, { useState } from 'react'
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import { segoeFontTextStyles, commonStyles, strings, INVALID_SOCIET_ID, validateSocietyId, colors, icons } from '../../common'
import { BACK_ICON_TYPES } from '../../common/constant'
import { BackButtonComponent, ButtonComponent, IconButtonWrapper, KeyboardAwareScrollViewComponent } from '../../components'
import { CustomText } from '../../components/CustomText'
import { TextInputComponent } from '../../components/TextInputWrapper'
import { goBack } from '../../service'
import { registerUserDataStore } from '../../store'

const styles = StyleSheet.create({
  headingSeperator: {
    paddingBottom: 20
  },
  descriptionSeperator: {
    paddingBottom: 40
  },
  buttonSeperator: {
    marginTop: 40
  },
  containerPadding: {
    paddingHorizontal: '15%'
  },
  backContainer: {
    paddingLeft: 10,
    paddingVertical: 20
  }

})

const { BUTTON_LABEL, HEADING, DESCRIPTION, PLACEHOLDER } = strings.SEARCH_SOCIETY

export const SearchSocietyScreen = ({ navigation }) => {

  const [societyId, updateSocietyId] = useState('')
  const [showErrorMessage, updateErrorMessageStatus ] = useState(false)

  const renderHeadingComponent = () => {
    return (
      <View>
        <CustomText textStyle={{
          ...segoeFontTextStyles.twentyFourNormalGreyish,
          ...commonStyles.textHorizontalCenter,
          ...styles.headingSeperator
        }}>{HEADING}</CustomText>
      </View>
    )
  }

  const renderDescriptionComponent = () => {
    return (
      <View>
        <CustomText textStyle={{
          ...segoeFontTextStyles.eighteenNormalGreyish,
          ...commonStyles.textHorizontalCenter,
          ...styles.descriptionSeperator

        }}>{DESCRIPTION}</CustomText>
      </View>
    )
  }

  const onChangeSocietyId = (value) => {
    updateSocietyId(value)
    if (showErrorMessage) {
      updateErrorMessageStatus(false)
    }
  }

  const renderSocietyIdTextInput = () => {
    return (
      <TextInputComponent
        label= {PLACEHOLDER}
        inputValue = {societyId}
        onChangeText = {onChangeSocietyId}
        errorMsg = {showErrorMessage ? INVALID_SOCIET_ID : ''}
      />
    )
  }

  const onPressButton = () => {
    const { getDetailsBySocietyId } = registerUserDataStore
    Keyboard.dismiss()
    if (validateSocietyId(societyId)) {
      getDetailsBySocietyId(societyId)
    } else {
      updateErrorMessageStatus(true)
    }
  }

  const renderButtonComponent = () => {
    return (
      <ButtonComponent
        buttonLabel={BUTTON_LABEL}
        onPressButton = {onPressButton}
        buttonContainerStyles = {styles.buttonSeperator}
      />

    )
  }

  const renderSearchBySocietyImage = () => {
    return (
      <IconButtonWrapper
        iconImage={icons.SOCIETY}
        iconHeight = {200}
        iconWidth = {'100%'}
        imageResizeMode = {'cover'}
      />
    )
  }

  const renderBackButton = () => {
    return (
      <View style = {[commonStyles.flexStart, styles.backContainer]}>
        <BackButtonComponent
          backIconType={BACK_ICON_TYPES.CARET}
          onPressBack = {() => goBack(navigation)}
          backButtonStyle = {{
            tintColor: colors.primaryButton
          }}
        />
      </View>
    )
  }

  return (
    <View style = {[commonStyles.fullBlackContainer]}>
      {renderBackButton()}
      <ScrollView style = {[ { flex: 1 }]}
        contentContainerStyle = {[styles.containerPadding, { justifyContent: 'center', flexGrow: 1 }]} 
        keyboardShouldPersistTaps = {'handled'}
      >
        {renderSearchBySocietyImage()}
        {renderHeadingComponent()}
        {renderDescriptionComponent()}
        {renderSocietyIdTextInput()}
        {renderButtonComponent()}
      </ScrollView>
    </View>
  )
}
