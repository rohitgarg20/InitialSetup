import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, fontDimens, strings } from '../../common'
import { icons } from '../../common/icons'
import { getHeight } from '../../common/scaling'
import { BackButtonComponent, CustomText, IconButtonWrapper, LogoComponent, TextInputComponent, UserReviewComponent, ViewPager } from '../../components'
import { map } from 'lodash'
import { observer } from 'mobx-react'
import { signupDataStore } from '../../store'
import { KeyboardAwareScrollViewComponent } from '../../components/KeyboardAwareScrollViewComponent'
import { I_TEXT_FIELD } from '../../common/Interfaces'
import { log } from '../../config'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 10
  },
  centerView: {
    alignItems: 'center'
  },
  formContainer: {
    paddingTop: 50,
    paddingHorizontal: 60,
    paddingBottom: 45
  },
  formHeading: {
    fontSize: fontDimens.normal,
    lineHeight: 22,
    fontWeight: '600',
    color: colors.black,
    paddingBottom: 20
  },
  fieldSeperator: {
    paddingBottom: 15
  },
  backContainer: {
    paddingTop: 20,
    alignItems: 'flex-start',
    paddingLeft: 40
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
    alignItems: 'center'
    // paddingTop: 10
  },
  buttonLabel: {
    color: colors.white,
    fontSize: fontDimens.normal,
    lineHeight: 15
  },

  // buttonLabel: {
  //   color: colors.white,
  //   fontSize: fontDimens.normal,
  //   lineHeight: 15
  // },
  clickabkeText: {
    borderBottomColor: colors.lightBlue,
    borderBottomWidth: 1
  },
  clickableText: {
    color: colors.lightBlue
  },
  termsAndPolicy: {
    fontSize: fontDimens.medium,
    lineHeight: 16
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerPagerView: {
    borderTopWidth: 1,
    borderColor: colors.grey,
    paddingVertical: 20,
    flex: 1
  }

})

interface I_STATE {
  selectedPageIndex?: number
}

@observer
export class RegisterUserScreen extends Component<{}, I_STATE> {

  state = {
    selectedPageIndex: 0
  }
  renderLogoComponent = () => {
    return (
      <View style = {styles.centerView}>
        <LogoComponent/>
      </View>
    )
  }

  renderBackArrowContainer = () => {
    return (
      <View style = {styles.backContainer}>
        <BackButtonComponent/>
      </View>
    )
  }

  renderFormFields = () => {
    const { formData, onChangeText } = signupDataStore
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

  renderSignUpForm = () => {
    const { HEADING } = strings.SIGN_UP_SCREEN
    return (
      <View style = {styles.formContainer}>
        <CustomText textStyle={styles.formHeading}>
          {HEADING}
        </CustomText>
        {this.renderFormFields()}

      </View>
    )
  }


  renderRegisterButton = () => {
    const { CREATE_ACCOUNT_BUTTON } = strings.SIGN_UP_SCREEN
    const { registerUser } = signupDataStore
    return (
      <View style = {styles.buttonView}>
        <TouchableOpacity style = {styles.signInButton} onPress = {registerUser}>
          <CustomText textStyle={styles.buttonLabel}>
            {CREATE_ACCOUNT_BUTTON}
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

  getReviviwsView = () => {
    const { reviews } = signupDataStore
    return (
      reviews.map((review) => (
        <UserReviewComponent review={review}/>
      ))
    )
  }


setSelectedPageIndex = (pageIndex) => {
  const { selectedPageIndex } = this.state
  if (pageIndex !== selectedPageIndex) {
    this.setState({
      selectedPageIndex: pageIndex
    })
  }
}

  renderPagerView = () => {
    const reviewsView = this.getReviviwsView()
    return (
      <View style = {styles.footerPagerView}>
        <ViewPager
          pages={reviewsView}
          onPageChange={this.setSelectedPageIndex}
        />
      </View>
    )
  }

  render() {
    return (
      <View style = {styles.mainContainer}>
        {this.renderLogoComponent()}
        {this.renderBackArrowContainer()}
        <ScrollView>
          {this.renderSignUpForm()}
          {this.renderRegisterButton()}
          {this.renderCopyRightView()}
        </ScrollView>
        {this.renderPagerView()}
      </View>
    )
  }
}
