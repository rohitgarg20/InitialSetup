import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { commonStyles, segoeFontTextStyles, strings } from '../common'
import { TEXT_FIELD_KEYS } from '../common/constant'
import { CustomText } from './CustomText'
import { HeaderComponent } from './HeaderComponent'
import { TextInputComponent } from './TextInputWrapper'

interface IProps {
  userDetails: any
}

const styles = StyleSheet.create({
  textInputSeperator: {
    paddingBottom: 25
  },
  formContentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center'
  },
  mainContainer: {
    paddingHorizontal: '10%',
    // paddingTop: 40,
    flex: 1
  },
})

const { USER_DETAILS  } = strings.USER_PROFILE_PAGE

export const userProfileComponent = (props: IProps) => {

  const { userDetails } = props
  const renderTextInput = (textFieldData) => {
    const { INPUT_VALUE, LABEL, IS_EDITABLE, IS_PASSWORD_FIELD, ERROR_MESSAGE, IS_REQUIRED, KEY, FILED_TYPE } = TEXT_FIELD_KEYS
    return (
      <View style = {styles.textInputSeperator}>
        <TextInputComponent
          label={textFieldData[LABEL]}
          inputValue = {textFieldData[INPUT_VALUE] || ''}
          editable = {textFieldData[IS_EDITABLE]}
          // shouldShowEyeIcon = {textFieldData[IS_PASSWORD_FIELD] || false}
          // errorMsg = {textFieldData[ERROR_MESSAGE] || ''}
          // isRequired = {textFieldData[IS_REQUIRED] || false}
          // onChangeText = {(value) => onChangeUserDetails(textFieldData[KEY], value, FILED_TYPE)}
          // errorMessageStyle = {commonStyles.errorMessage}
        //   inputContainerStyle = {{
        //       backgroundColor: textFieldData[IS_EDITABLE] ? colors.grey : '#DCDCDC'
        //   }}
        />
      </View>
    )
  }

  const renderForm = () => {
    return (
      <ScrollView contentContainerStyle = {styles.formContentContainer}
        keyboardShouldPersistTaps = {'handled'}
      >
        {/* {renderUserProfileIcon()} */}
        {
          Object.keys(userDetails).map((userKey) => renderTextInput(userDetails[userKey]))
        }

      </ScrollView>
    )
  }


  const renderHeadingComponent = () => {
    return (
      <HeaderComponent
        headerStyle={{ ...commonStyles.yellowBottomBorder, ...commonStyles.rowWithVerticalCenter }}
        headerLabel = {USER_DETAILS}
        customHeadingStyle = {{ ...segoeFontTextStyles.twentyTwoNormalGreyish, ...commonStyles.textLeftAlign }}
        hideBackButton = {true}
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
}

export {
    userProfileComponent as UserProfileComponent
}
