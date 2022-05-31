import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { map } from 'lodash'
import { TextInputComponent } from '../../components/TextInputWrapper'
import { loginDataStore } from '../../store'
import { I_TEXT_FIELD } from '../../common/Interfaces'
import { ButtonComponent, KeyboardAwareScrollViewComponent, LogoComponent } from '../../components'
import { colors, commonStyles, segoeFontTextStyles, strings } from '../../common'
import { CustomText } from '../../components/CustomText'
import { navigateSimple } from '../../service'


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.black
  },

  // headerContainer: {
  //   paddingLeft: '5%',
  //   paddingTop: 20,
  //   paddingBottom: 10,
  //   borderBottomWidth: 3,
  //   borderColor: colors.primaryButton
  // },
  innerContainer: {
    paddingHorizontal: '15%',
    paddingTop: '30%'
    // paddingBottom: 100
  },
  textFieldsContainer: {
    paddingTop: '30%'
  },
  fieldSeperator: {
    paddingBottom: 25
  },
  paddingBottom: {
    paddingBottom: 10
  },
  flexEnd: {
    paddingTop: '25%'
  },
  formContainer: {
      width: '100%'
  }

})

interface IProps {
  navigation?: any
}

@observer
export class LoginScreen extends Component<IProps> {

  renderHeaderComponent = () => {
    const { RESIDENT_LOGIN } = strings.LOGIN_SCREEN
    return (
      <View style = {commonStyles.yellowBottomBorder}>
        <CustomText textStyle={{ ...segoeFontTextStyles.twentyTwoNormalGreyish, ...commonStyles.textLeftAlign}}>{RESIDENT_LOGIN}</CustomText>
      </View>
    )
  }


  renderFormFields = () => {
    const { formData, onChangeText } = loginDataStore
    return (
      <View style = {styles.textFieldsContainer}>
        {map(Object.keys(formData), (formKey) => {
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
      </View>
    )
  }

  renderSignInForm = () => {
    return (
      <View style = {styles.formContainer}>
        <LogoComponent/>
        {this.renderFormFields()}
      </View>
    )
  }

  navigateToResetPassword = () => {
  }

  renderForgetPasswordView = () => {
    const { FORGET_PASSWORD } = strings.LOGIN_SCREEN
    return (
      <ButtonComponent
        buttonLabel={FORGET_PASSWORD}
        onPressButton ={this.navigateToResetPassword}
        buttonType = {'normal'}
      />
    )
  }

  navigateToRegister = () => {
    navigateSimple(this.props.navigation, 'RegisterUserTypeScreen')
  }

  renderCreateAccountView = () => {
    const { CREATE_ACCOUNT, SIGNUP_BUTTON } = strings.LOGIN_SCREEN
    return (
      <View style = {styles.flexEnd}>
        <CustomText textStyle={{ ...segoeFontTextStyles.eighteenNormalGreyish, ...styles.paddingBottom, ...commonStyles.textHorizontalCenter }}>{CREATE_ACCOUNT}</CustomText>
        <ButtonComponent
          buttonLabel={SIGNUP_BUTTON}
          onPressButton = {this.navigateToRegister}
        />
      </View>
    )
  }


  renderSignInButton = () => {
    const { SIGN_IN_BUTTON } = strings.LOGIN_SCREEN
    const { loginUser } = loginDataStore
    return (
      <ButtonComponent
        buttonLabel={SIGN_IN_BUTTON}
        onPressButton ={loginUser}
      />
    )
  }


  render() {
    return (
      <View style = {styles.mainContainer}>
        {this.renderHeaderComponent()}
        <KeyboardAwareScrollViewComponent contentContainerStyle = {styles.innerContainer}>
          {this.renderSignInForm()}
          {this.renderSignInButton()}
          {this.renderForgetPasswordView()}
          {this.renderCreateAccountView()}
        </KeyboardAwareScrollViewComponent>
      </View>
    )
  }
}
