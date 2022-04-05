import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { map } from 'lodash'
import { colors, fontDimens, fontWeight, strings } from '../../common'
import { icons } from '../../common/icons'
import { getHeight } from '../../common/scaling'
import { CustomText, IconButtonWrapper, TextInputComponent } from '../../components'
import { loginDataStore } from '../../store'
import { KeyboardAwareScrollViewComponent } from '../../components/KeyboardAwareScrollViewComponent'
import { I_TEXT_FIELD } from '../../common/Interfaces'
import { navigateSimple } from '../../service'


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  headerContainer: {
    height: getHeight() * 0.45,
    paddingVertical: 25,
    paddingLeft: 30,
    backgroundColor: colors.darkBlue
  },
  headingStyle: {
    fontSize: fontDimens.extraLarge,
    color: colors.white,
    lineHeight: 30,
    fontWeight: '600'
  },
  subHeading: {
    fontSize: fontDimens.medium,
    color: colors.white,
    lineHeight: 18,
    fontWeight: '400'
  },
  flexEnd: {
    paddingTop: 30,
    alignItems: 'flex-end'
  },
  formContainer: {
    paddingTop: 30,
    paddingHorizontal: 60,
    borderWidth: 1,
    borderRadius: 15,
    // flex: 1,
    backgroundColor: colors.white,
    borderColor: colors.grey,
    top: -15,
    // overflow: 'hidden',
    borderBottomWidth: 0
  },
  formHeading: {
    paddingBottom: 16,
    fontWeight: '600',
    color: colors.black,
    fontSize: fontDimens.medium,
    lineHeight: 18
  },
  fieldSeperator: {
    paddingBottom: 12
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomButtonLabel: {
    color: colors.lightBlue,
    fontSize: fontDimens.normal,
    lineHeight: 15
  },
  signInButton: {
    // borderWidth: 1,
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView: {
    alignItems: 'center',
    paddingTop: 30
  },
  buttonLabel: {
    color: colors.white,
    fontSize: fontDimens.normal,
    lineHeight: 15
  },
  clickabkeText: {
    borderBottomColor: colors.lightBlue,
    borderBottomWidth: 1
  },
  clickableText: {
    color: colors.lightBlue,
  },
  termsAndPolicy: {
    fontSize: fontDimens.medium,
    lineHeight: 16
  }

})

interface IProps {
  navigation?: any
}

@observer
export class LoginScreen extends Component<IProps> {

  renderHeaderComponent = () => {
    const { HEADING, SUB_HEADING } = strings.LOGIN_SCREEN
    return (
      <View style = {styles.headerContainer}>
        <CustomText textStyle={styles.headingStyle}>
          {HEADING}
        </CustomText>
        <CustomText textStyle={styles.subHeading}>
          {SUB_HEADING}
        </CustomText>
        <View style = {styles.flexEnd}>
          <IconButtonWrapper
            iconImage={icons.SIGN_IN}
            iconHeight = {199}
            iconWidth = {175}
            imageResizeMode = {'contain'}
          />
        </View>
      </View>
    )
  }


  renderFormFields = () => {
    const { formData, onChangeText } = loginDataStore
    return map(Object.keys(formData), (formKey) => {
      const { label, inputValue, key, isPasswordField = false, errorMessage = '' } = formData[formKey] as I_TEXT_FIELD
      return (
        <View style = {styles.fieldSeperator}>
          <TextInputComponent
            label= {label}
            inputValue = {inputValue}
            shouldShowEyeIcon = {isPasswordField}
            errorMsg = {errorMessage}
            onChangeText = {(value) => onChangeText(key, value)}
          />
        </View>
      )
    })
  }

  renderSignInForm = () => {
    const { LOGIN } = strings.LOGIN_SCREEN
    return (
      <View style = {styles.formContainer}>
        <CustomText textStyle={styles.formHeading}>
          {LOGIN}
        </CustomText>
        {this.renderFormFields()}
        {this.renderBottomView()}

      </View>
    )
  }

  navigateToResetPassword = () => {
    navigateSimple(this.props.navigation, 'ResetPassword')
  }

  renderForgetPasswordView = () => {
    const { FORGET_PASSWORD } = strings.LOGIN_SCREEN
    return (
      <TouchableOpacity onPress={this.navigateToResetPassword}>
        <CustomText textStyle={styles.bottomButtonLabel}>{FORGET_PASSWORD}</CustomText>
      </TouchableOpacity>
    )
  }

  navigateToRegister = () => {
    navigateSimple(this.props.navigation, 'Register')
  }

  renderCreateAccountView = () => {
    const { CREATE_ACCOUNT } = strings.LOGIN_SCREEN
    return (
      <TouchableOpacity onPress={this.navigateToRegister}>
        <CustomText textStyle={styles.bottomButtonLabel}>{CREATE_ACCOUNT}</CustomText>
      </TouchableOpacity>
    )
  }

  renderBottomView = () => {
    return (
      <View style = {styles.rowView}>
        {this.renderForgetPasswordView()}
        {this.renderCreateAccountView()}
      </View>
    )
  }

  renderSignInButton = () => {
    const { SIGN_IN_BUTTON } = strings.LOGIN_SCREEN
    const { registerUser } = loginDataStore
    return (
      <View style = {styles.buttonView}>
        <TouchableOpacity style = {styles.signInButton} onPress = {registerUser}>
          <CustomText textStyle={styles.buttonLabel}>
            {SIGN_IN_BUTTON}
          </CustomText>
        </TouchableOpacity>
      </View>
    )
  }

  renderCopyRightView = () => {
    const { COPYYRIGHT, TERMS_OF_USE, AND, APPLY, SERVICE_APPLY } = strings.LOGIN_SCREEN
    return (
      <View style = {[styles.buttonView,{ paddingTop: 40 }]}>
        <CustomText textStyle={styles.termsAndPolicy}>
          {COPYYRIGHT}
        </CustomText>
        <View style = {styles.rowView}>
          <TouchableOpacity style = {styles.clickabkeText}>
            <CustomText textStyle={{...styles.clickableText, ...styles.termsAndPolicy }}>
              {TERMS_OF_USE}
            </CustomText>
          </TouchableOpacity>
          <CustomText textStyle={styles.termsAndPolicy}>
            {AND}
          </CustomText>
          <TouchableOpacity style = {styles.clickabkeText}>
            <CustomText textStyle={{...styles.clickableText, ...styles.termsAndPolicy }}>
              {SERVICE_APPLY}
            </CustomText>
          </TouchableOpacity>
          <CustomText textStyle={styles.termsAndPolicy}>
            {APPLY}
          </CustomText>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style = {styles.mainContainer}>
        <KeyboardAwareScrollViewComponent>
          {this.renderHeaderComponent()}
          {this.renderSignInForm()}
          {this.renderSignInButton()}
          {this.renderCopyRightView()}
        </KeyboardAwareScrollViewComponent>
      </View>
    )
  }
}
