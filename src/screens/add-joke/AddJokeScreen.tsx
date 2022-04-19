import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { map } from 'lodash'
import { colors, fontDimensPer, strings } from '../../common'
import { icons } from '../../common/icons'
import { I_TEXT_FIELD } from '../../common/Interfaces'
import { BackButtonComponent, CustomText, IconButtonWrapper, LogoComponent, TextInputComponent, ViewPager } from '../../components'
import { KeyboardAwareScrollViewComponent } from '../../components/KeyboardAwareScrollViewComponent'
import { addJokeDataStore } from '../../store'
import { observer } from 'mobx-react'
import { widthToDp } from '../../utils/Responsive'
import { log } from '../../config'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20
  },
  centerView: {
    alignItems: 'center'
  },
  backContainer: {
    alignItems: 'flex-start',
    paddingTop: 5
  },
  rowContainer: {
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20
  },
  fieldSeperator: {
    paddingBottom: 15
  },
  formContainer: {
    paddingTop: 20,
    paddingHorizontal: 40,
    backgroundColor: colors.white
  },
  formHeading: {
    fontSize: widthToDp(fontDimensPer.large),
    fontFamily: 'Poppins-Regular',
    paddingBottom: 20,
    fontWeight: '400',
    color: colors.black
    // fontSize: fontDimens.medium,
    // lineHeight: 18
  },
  inputContainer: {
    height: 100,
    alignItems: 'flex-start',
    padding: 0,

  },
  labelContainerStyle: {
    top: 14,
    backgroundColor: 'red'
  },
  textInput: {
    textAlignVertical: 'top'
  },
  signInButton: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView: {
    alignItems: 'center',
    paddingTop: 50
  },
  buttonLabel: {
    color: colors.white,
    // fontSize: fontDimens.normal,
    lineHeight: 1.5 * widthToDp(fontDimensPer.medium),
    fontSize: widthToDp(fontDimensPer.medium),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',

  }
})

@observer
export class AddJokeScreen extends Component {

  renderLogoComponent = () => {
    return (
      <View style={styles.centerView}>
        <LogoComponent />
      </View>
    )
  }

  renderBackArrowContainer = () => {
    return (
      <View style={styles.backContainer}>
        <BackButtonComponent />
      </View>
    )
  }

  rendePersonIcon = () => {
    return (
      <View style={{
        zIndex: 99,
        bottom: -10
      }}>
        <IconButtonWrapper
          iconImage={icons.PERSON}
          iconHeight={95}
          iconWidth={85}
        />
      </View>
    )
  }

  renderViewJokesView = () => {
    return (
      <IconButtonWrapper
        iconImage={icons.BRICK}
        iconHeight={100}
        iconWidth={'100%'}
        imageResizeMode={'cover'}
      />
    )
  }

  renderBackWithPersonIcon = () => {
    return (
      <View style={styles.rowContainer}>
        {this.renderBackArrowContainer()}
        {this.rendePersonIcon()}
      </View>
    )
  }

  renderFormFields = () => {
    const { formData, onChangeText } = addJokeDataStore
    return map(Object.keys(formData), (formKey) => {
      const { label, inputValue, key, isPasswordField = false, errorMessage = '' } = formData[formKey] as I_TEXT_FIELD
      return (
        <View style={styles.fieldSeperator}>
          <TextInputComponent
            label={label}
            inputValue={inputValue}
            shouldShowEyeIcon={isPasswordField}
            errorMsg={errorMessage}
            onChangeText={(value) => onChangeText(key, value)}
          />
        </View>
      )
    })
  }

  renderJokeInput = () => {
    const { joke, onChangeText } = addJokeDataStore
    const { label, inputValue, key, errorMessage = '' } = joke
    log('renderJokeInputrenderJokeInput', inputValue)
    return (
      <TextInputComponent
        label={label}
        inputValue={inputValue}
        errorMsg={errorMessage}
        onChangeText={(value) => onChangeText(key, value)}
        multiline={true}
        inputContainerStyle={styles.inputContainer}
        labelContainerStyle={styles.labelContainerStyle}
        textInputStyle={styles.textInput}
      />
    )
  }

  renderAddJokeForm = () => {
    const { HEADING } = strings.ADD_JOKE
    return (
      <View style={styles.formContainer}>
        <CustomText textStyle={styles.formHeading}>
          {HEADING}
        </CustomText>
        {this.renderFormFields()}
        {this.renderJokeInput()}
      </View>
    )
  }


  renderAddJokeButton = () => {
    const { SUBMIT } = strings.ADD_JOKE
    const { validateFormFields } = addJokeDataStore
    return (
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.signInButton} onPress={validateFormFields}>
          <CustomText textStyle={styles.buttonLabel}>
            {SUBMIT}
          </CustomText>
        </TouchableOpacity>
      </View>
    )
  }



  render() {
    return (
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollViewComponent>
          {this.renderLogoComponent()}
          {this.renderBackWithPersonIcon()}
          {this.renderViewJokesView()}
          {this.renderAddJokeForm()}
          {this.renderAddJokeButton()}
        </KeyboardAwareScrollViewComponent>
      </View>
    )
  }
}
