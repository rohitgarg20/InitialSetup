import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, fontDimens, strings } from '../../common'
import { FORM_KEYS } from '../../common/constant'
import { icons } from '../../common/icons'
import { ATLEAST_ONE_NUMBER_REGEX, ATLEAST_ONE_SPECIAL_CHAR_REGEX, ATLEAST_ONE_UPAR_CASE_REGEX, MIN_LENGTH } from '../../common/validator'
import { BackButtonComponent, CustomText, IconButtonWrapper, LogoComponent, TextInputComponent } from '../../components'
import { KeyboardAwareScrollViewComponent } from '../../components/KeyboardAwareScrollViewComponent'
import { setPasswordDataStore } from '../../store'

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    paddingTop: 20
  },
  backContainer: {
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingBottom: 35
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  headerContainer: {
    height: '50%',
    backgroundColor: colors.darkBlue,
    paddingHorizontal: 20,
    flex: 1
  },
  flexEnd: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1
  },
  setPasswordContainer: {
    // alignItems: 'center',
    flex: 1,
    paddingHorizontal: '8%',
    paddingTop: 16,
    backgroundColor: colors.white

  },
  descriptionTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'flex-start'
  },
  descriptionText: {
    paddingLeft: 10,
    fontSize: fontDimens.normal,
    color: colors.grey
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
  heading: {
    fontSize: fontDimens.big,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.black,
    paddingBottom: 16
  }
})

@observer
export class SetPasswordScreen extends Component {

  componentWillUnmount() {
    setPasswordDataStore.init()
  }

  renderLogoComponent = () => {
    return (
      <View style = {styles.centerView}>
        <LogoComponent
          textStyling = {{
            color: colors.white
          }}
        />
      </View>
    )
  }

  renderBackArrowContainer = () => {
    return (
      <View style = {styles.backContainer}>
        <BackButtonComponent
          backButtonStyle = {{
            tintColor: colors.white
          }}
        />
      </View>
    )
  }

  renderImage = () => {
    const iconHeight = Dimensions.get('window').height * 0.4
    const iconWidth = iconHeight * 0.538
    return (
      <View style = {styles.flexEnd}>
        <IconButtonWrapper
          iconImage={icons.SET_PASSWORD}
          iconHeight = {iconHeight}
          iconWidth = {iconWidth}
          imageResizeMode = {'contain'}
        />
      </View>
    )
  }

  renderHeaderComponent = () => {
    return (
      <View style = {styles.headerContainer}>
        {this.renderLogoComponent()}
        {this.renderBackArrowContainer()}
        {this.renderImage()}
      </View>
    )
  }

  renderPasswordInput = () => {
    const { formData, onChangeText } = setPasswordDataStore
    const { label, inputValue, isPasswordField, errorMessage  } = formData[FORM_KEYS.PASSWORD]
    return (
      <TextInputComponent
        label= {label}
        inputValue = {inputValue}
        shouldShowEyeIcon = {isPasswordField}
        errorMsg = {errorMessage}
        onChangeText = {(value) => onChangeText(FORM_KEYS.PASSWORD, value)}
      />
    )
  }

  renderConfirmPasswordInput = () => {
    const { formData, onChangeText } = setPasswordDataStore
    const { label, inputValue, isPasswordField, errorMessage  } = formData[FORM_KEYS.CONFIRM_PASSWORD]
    return (
      <TextInputComponent
        label= {label}
        inputValue = {inputValue}
        shouldShowEyeIcon = {isPasswordField}
        errorMsg = {errorMessage}
        onChangeText = {(value) => onChangeText(FORM_KEYS.CONFIRM_PASSWORD, value)}
      />
    )
  }

  renderIcon = (icon) => {
    return (
      <IconButtonWrapper
        iconImage={icon}
        iconHeight = {10}
        iconWidth = {10}
      />
    )
  }

  renderPasswordDescription = (descriptionText: string, regexStr) => {
    const { formData } = setPasswordDataStore

    const { inputValue: newPassword  } = formData[FORM_KEYS.PASSWORD]
    let descTextColor = colors.red
    let isValid = false
    if (newPassword) {
      if (regexStr && regexStr.test(newPassword)) {
        descTextColor = colors.green
        isValid = true
      } else {
        descTextColor = colors.red
        isValid = false
      }
    }

    return (
      <View key={`${regexStr}`} style={[styles.descriptionTextView, { }]}>
        {this.renderIcon(isValid ? icons.TICK : icons.CROSS)}
        <CustomText textStyle={{ ...styles.descriptionText, color: descTextColor }}>{descriptionText}</CustomText>
      </View>
    )
  }

  renderPasswordInstruction = () => {
    const { PASSWORD_VALIDATIONS } = strings
    return (
      <View style = {{
        paddingBottom: 20
      }}>
        {this.renderPasswordDescription(PASSWORD_VALIDATIONS.NUMBERS, /^.*[0-9].*/g)}
        {this.renderPasswordDescription(PASSWORD_VALIDATIONS.UPPERCASE, /^.*[A-Z].*/g)}
        {this.renderPasswordDescription(PASSWORD_VALIDATIONS.SPECIAL_CHAR, /^.*[@#$].*/g)}
        {this.renderPasswordDescription(PASSWORD_VALIDATIONS.MIN_LENGTH, /^(.){8,}$/g)}
      </View>
    )
  }

  renderHeadingComponent = () => {
    const { PASSWORD_VALIDATIONS } = strings
    const { HEADING }  = PASSWORD_VALIDATIONS

    return (
      <CustomText textStyle={styles.heading}>
        {HEADING}
      </CustomText>
    )
  }

  renderSetPasswordComponent = () => {
    return (
      <View style = {styles.setPasswordContainer}>
        {this.renderHeadingComponent()}
        {this.renderPasswordInput()}
        {this.renderPasswordInstruction()}
        {this.renderConfirmPasswordInput()}
        {this.renderSubmitButton()}
      </View>
    )
  }


  renderSubmitButton = () => {
    const { PASSWORD_VALIDATIONS } = strings
    const { SUBMIT }  = PASSWORD_VALIDATIONS
    const { setNewPassword, isSubmitButtonDisabled } = setPasswordDataStore
    return <View style = {styles.buttonView}>
      <TouchableOpacity style = {[styles.signInButton, {
        opacity: isSubmitButtonDisabled ? 0.5 : 1
      }]}
      onPress = {setNewPassword}
      disabled = {isSubmitButtonDisabled}
      >
        <CustomText textStyle={styles.buttonLabel}>
          {SUBMIT}
        </CustomText>
      </TouchableOpacity>
    </View>
  }

  render() {
    return (
      <ScrollView style = {styles.mainContainer}>
        {this.renderHeaderComponent()}
        {this.renderSetPasswordComponent()}
      </ScrollView>
    )
  }
}
