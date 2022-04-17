import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { map } from 'lodash'
import { colors, fontDimens, fontDimensPer, strings } from '../../common'
import { icons } from '../../common/icons'
import { I_TEXT_FIELD } from '../../common/Interfaces'
import { BackButtonComponent, CustomText, IconButtonWrapper, LogoComponent, OtpComponent, TextInputComponent, UserReviewComponent, ViewPager } from '../../components'
import { resetPasswordDataStore } from '../../store'
import { KeyboardAwareScrollViewComponent } from '../../components/KeyboardAwareScrollViewComponent'
import { navigateSimple } from '../../service'
import { widthToDp } from '../../utils/Responsive'
import { IJokeItem } from '../../store/interfaces'
import { log } from '../../config'
import { getWidth } from '../../common/scaling'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 10
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
    paddingBottom: 30
  },
  otpContainer: {
    paddingHorizontal: 40,
    paddingTop: 40
  },
  heading: {
    fontSize: widthToDp(fontDimensPer.large),
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    paddingBottom: 10,
    // lineHeight: 24,
    fontWeight: '600'
  },
  content: {
    fontSize: widthToDp(fontDimensPer.medium),
    color: colors.labelColor,
    paddingBottom: 20,
    lineHeight: 16,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular'
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
    // fontSize: fontDimens.normal,
    lineHeight: 15,
    fontSize:  widthToDp(fontDimensPer.medium),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular'
  },
  footerPagerView: {
    marginHorizontal: 30,
    marginVertical: 15,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: colors.white,
    flex: 1
  }
})

interface IProps {
  navigation?: any
}

@observer
export class ResetPasswordScreen extends Component<IProps> {

  componentDidMount() {
    resetPasswordDataStore.getJokesList()
  }

  componentWillUnmount() {
    resetPasswordDataStore.init()
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

  rendePersonIcon = () => {
    return (
      <View style = {{
        zIndex: 99
      }}>
        <IconButtonWrapper
          iconImage={icons.PERSON}
          iconHeight = {95}
          iconWidth = {85}
        />
      </View>
    )
  }

  renderBackWithPersonIcon = () => {
    return (
      <View style = {styles.rowContainer}>
        {this.renderBackArrowContainer()}
        {this.rendePersonIcon()}
      </View>
    )
  }

  renderViewJokesView = () => {
    return (
      <View>
        <IconButtonWrapper
          iconImage={icons.BRICK}
          iconHeight = {200}
          iconWidth = {'100%'}
          imageResizeMode = {'cover'}
        />
        <View style = {{ position: 'absolute', width: '100%', height: 200 }}>
          {this.renderPagerView()}
        </View>
      </View>
    )
  }

  renderPersonJokeView = () => {
    return (
      <View style = {{
        top: -10
      }}>
        {this.renderViewJokesView()}
      </View>
    )
  }

  renderEmailView = () => {
    const { formData, onChangeText } = resetPasswordDataStore
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

  renderSendOtpView = () => {
    const { SEND_OTP_SCREEN } = strings
    const { HEADING, CONTENT }  = SEND_OTP_SCREEN
    return (
      <View style = {styles.otpContainer}>
        <CustomText textStyle={styles.heading}>
          {HEADING}
        </CustomText>
        <CustomText textStyle={styles.content}>
          {CONTENT}
        </CustomText>
        {this.renderEmailView()}
        {this.renderSendOtpButton()}
      </View>
    )
  }

  renderSendOtpButton = () => {
    const { SEND_OTP_SCREEN } = strings
    const { SEND_OTP }  = SEND_OTP_SCREEN
    const { onSendOtpButtonPressed } = resetPasswordDataStore
    return <View style = {styles.buttonView}>
      <TouchableOpacity style = {styles.signInButton} onPress = {onSendOtpButtonPressed}>
        <CustomText textStyle={styles.buttonLabel}>
          {SEND_OTP}
        </CustomText>
      </TouchableOpacity>
    </View>
  }

  onResendOtp = () => {
    const { navigation } = this.props
    const { onSendOtpButtonPressed, getEmailId } = resetPasswordDataStore
    onSendOtpButtonPressed()
    navigateSimple(navigation, 'EnterOtpScreen', {
      emailId: getEmailId()
    })
  }

  renderEnterOtpView = () => {
    const { getEmailId, onSubmitOtpButtonPressed } = resetPasswordDataStore

    return (
      <View style = {styles.otpContainer}>
        <OtpComponent
          onPressResendOtp = {this.onResendOtp}
          emailId = {getEmailId()}
          submitOtp = {onSubmitOtpButtonPressed}
        />
      </View>
    )
  }

  getReviviwsView = () => {
    const { jokesList } = resetPasswordDataStore
    log('jokesListjokesList', jokesList)

    return (
      jokesList.map((joke: IJokeItem) => {
        const { authorName, content } = joke || {}
        return (
          <View style = {{
            width: getWidth() * 0.82 ,
            // flex: 1
          }}>
            <CustomText>{content}</CustomText>
            <CustomText>{authorName}</CustomText>
          </View>
        )
      })
    )
  }


  // setSelectedPageIndex = (pageIndex) => {
  //   const { selectedPageIndex } = this.state
  //   if (pageIndex !== selectedPageIndex) {
  //     this.setState({
  //       selectedPageIndex: pageIndex
  //     })
  //   }
  // }

  renderPagerView = () => {
    const reviewsView = this.getReviviwsView()
    return (
      <View style={styles.footerPagerView}>
        <ViewPager
          pages={reviewsView}
          // onPageChange={this.setSelectedPageIndex}
        />
      </View>
    )
  }

  render() {
    const { showOtpView } = resetPasswordDataStore
    return (
      <View style = {styles.mainContainer}>
        <KeyboardAwareScrollViewComponent>
          {this.renderLogoComponent()}
          {this.renderBackWithPersonIcon()}
          {this.renderPersonJokeView()}
          {showOtpView ? this.renderEnterOtpView() : this.renderSendOtpView()}
        </KeyboardAwareScrollViewComponent>
      </View>
    )
  }
}
