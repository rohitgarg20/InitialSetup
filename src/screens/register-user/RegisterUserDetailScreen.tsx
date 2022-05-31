import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import { colors, commonStyles, icons, segoeFontTextStyles, strings } from '../../common'
import { BACK_ICON_TYPES, TEXT_FIELD_KEYS } from '../../common/constant'
import { ButtonComponent, HeaderComponent, IconButtonWrapper } from '../../components'
import { CustomText } from '../../components/CustomText'
import { TextInputComponent } from '../../components/TextInputWrapper'
import { registerUserDataStore } from '../../store'

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: '10%',
    // paddingTop: 40,
    flex: 1
  },
  textInputSeperator: {
    paddingBottom: 25
  },
  profileBorder: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: colors.primaryButton,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20
  },
  leftSpacing: {
    paddingLeft: 10
  },
  formContentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 10
  },
  buttonContainerStyles: {
    width: '60%',
    alignSelf: 'center'
  }
})

const { ADD_PERSONAL_DETAILS, REGISER_USER_BUTTON } = strings.REGISTER_USER

const registerUserDetailScreen = observer(() => {

  const { userDetails, onChangeUserDetails, saveUserDetailsAndRegister, resetUserDetails } = registerUserDataStore

  useEffect(() => {

    return () => {
      resetUserDetails()
    }
  }, [resetUserDetails])

  const renderTextInput = (textFieldData) => {
    const { INPUT_VALUE, LABEL, IS_EDITABLE, IS_PASSWORD_FIELD, ERROR_MESSAGE, IS_REQUIRED, KEY, FILED_TYPE } = TEXT_FIELD_KEYS
    return (
      <View style = {styles.textInputSeperator}>
        <TextInputComponent
          label={textFieldData[LABEL]}
          inputValue = {textFieldData[INPUT_VALUE] || ''}
          editable = {textFieldData[IS_EDITABLE]}
          shouldShowEyeIcon = {textFieldData[IS_PASSWORD_FIELD] || false}
          errorMsg = {textFieldData[ERROR_MESSAGE] || ''}
          isRequired = {textFieldData[IS_REQUIRED] || false}
          onChangeText = {(value) => onChangeUserDetails(textFieldData[KEY], value, FILED_TYPE)}
          errorMessageStyle = {commonStyles.errorMessage}
        //   inputContainerStyle = {{
        //       backgroundColor: textFieldData[IS_EDITABLE] ? colors.grey : '#DCDCDC'
        //   }}
        />
      </View>
    )
  }


  const renderUserProfileIcon = () => {
    return (
      <View style = {[styles.profileBorder ]}>
        <IconButtonWrapper
          iconImage={icons.DEFAULT_PROFILE}
          iconWidth = {'100%'}
          iconHeight = {'100%'}
        />
      </View>
    )
  }

  const registerUser = () => {
    Keyboard.dismiss()
    saveUserDetailsAndRegister()
  }

  const renderFooterButtonComponent = () => {
    return (
      <ButtonComponent
        buttonLabel= {REGISER_USER_BUTTON}
        onPressButton = {registerUser}
        buttonContainerStyles = {styles.buttonContainerStyles}
      />
    )
  }

  const renderForm = () => {
    return (
      <ScrollView contentContainerStyle = {styles.formContentContainer}
        keyboardShouldPersistTaps = {'handled'}
      >
        {renderUserProfileIcon()}
        {
          Object.keys(userDetails).map((userKey) => renderTextInput(userDetails[userKey]))
        }
        {renderFooterButtonComponent()}

      </ScrollView>
    )
  }

  const renderHeadingComponent = () => {
    return (
      <HeaderComponent
        headerStyle={{ ...commonStyles.yellowBottomBorder, ...commonStyles.rowWithVerticalCenter }}
        backIconType = {BACK_ICON_TYPES.CARET}
        headerLabel = {ADD_PERSONAL_DETAILS}
        customHeadingStyle = {{ ...segoeFontTextStyles.twentyTwoNormalGreyish, ...styles.leftSpacing, ...commonStyles.textLeftAlign }}
      />
    )
  }

  return (
    <View style = {commonStyles.fullBlackContainer}>
      {renderHeadingComponent()}
      <View style = {[styles.mainContainer]}>
        {renderForm()}
      </View>
    </View>
  )
})

export {
  registerUserDetailScreen as RegisterUserDetailScreen
}
