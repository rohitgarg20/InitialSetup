import React, { useCallback, useState } from 'react'
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import { commonStyles, emailIdValidator, icons, INCORRECT_EMAIL_ID, segoeFontTextStyles } from '../../common'
import { BACK_ICON_TYPES } from '../../common/constant'
import { ButtonComponent, HeaderComponent, IconButtonWrapper, LogoComponent } from '../../components'
import { CustomText } from '../../components/CustomText'
import { TextInputComponent } from '../../components/TextInputWrapper'

const styles = StyleSheet.create({
  leftSpacing: {
    paddingLeft: 10
  },
  detailContainer: {
    paddingHorizontal: '15%',
    paddingTop: '10%'
  },
  headingSeperator: {
    paddingBottom: 20
  },
  descriptionSeperator: {
    paddingBottom: 60
  },
  buttonSeperator: {
    marginTop: 20
  }
})

const emailVerificationScreen = ({ navigation, route }) => {

  const [emailId, updateEmailId] = useState('')
  const [showErrorMessage, updateErrorMessageStatus] = useState(false)
  const { headerLabel = '', heading = '', description = '', buttonLabel, verifyEmail } = route.params || {}

  const renderHeaderComponent = () => {
    return (
      <HeaderComponent
        headerStyle={{ ...commonStyles.yellowBottomBorder, ...commonStyles.rowWithVerticalCenter }}
        backIconType = {BACK_ICON_TYPES.CARET}
        headerLabel = {headerLabel}
        customHeadingStyle = {{ ...segoeFontTextStyles.twentyTwoNormalGreyish, ...styles.leftSpacing, ...commonStyles.textLeftAlign }}
      />
    )
  }

  const renderHeadingComponent = () => {
    return (
      heading?.length > 0 && <View>
        <CustomText textStyle={{
          ...segoeFontTextStyles.twentyFourNormalGreyish,
          ...commonStyles.textHorizontalCenter,
          ...styles.headingSeperator
        }}>{heading}</CustomText>
      </View>
    )
  }

  const renderDescriptionComponent = () => {
    return (
      description?.length > 0 && <View>
        <CustomText textStyle={{
          ...segoeFontTextStyles.twentyTwoNormalGreyish,
          ...commonStyles.textHorizontalCenter,
          ...styles.descriptionSeperator

        }}>{description}</CustomText>
      </View>
    )
  }

  const onChangeEmailId = (value) => {
    updateEmailId(value)
    if (showErrorMessage) {
      updateErrorMessageStatus(false)
    }
  }

  const renderEmailTextInput = () => {
    return (
      <TextInputComponent
        label= {'Email Id'}
        inputValue = {emailId}
        errorMsg = {showErrorMessage ? INCORRECT_EMAIL_ID : ''}
        onChangeText = {onChangeEmailId}
      />
    )
  }

  const onPressButton = useCallback(() => {
    Keyboard.dismiss()
    const isEmailIdValid = emailIdValidator(emailId)
    if (isEmailIdValid && verifyEmail) {
      verifyEmail(emailId)
    } else {
      updateErrorMessageStatus(true)
    }
  }, [emailId, verifyEmail])

  const renderButtonComponent = () => {
    return (
      <ButtonComponent
        buttonLabel={buttonLabel}
        onPressButton = {onPressButton}
        buttonContainerStyles = {styles.buttonSeperator}
      />

    )
  }

  const renderIcon = () => {
    return (

      <IconButtonWrapper
        iconImage={icons.VERIFY_EMAIL}
        iconWidth = {'80%'}
        iconHeight = {240}
        imageResizeMode = {'contain'}
      />
    )
  }

  return (
    <ScrollView style = {commonStyles.fullBlackContainer} keyboardShouldPersistTaps = {'handled'}>
      {renderHeaderComponent()}
      <View style = {styles.detailContainer}>
        {renderIcon()}
        {renderHeadingComponent()}
        {renderDescriptionComponent()}
        {renderEmailTextInput()}
        {renderButtonComponent()}
      </View>
    </ScrollView>
  )
}

export {
  emailVerificationScreen as EmailVerificationScreen
}
