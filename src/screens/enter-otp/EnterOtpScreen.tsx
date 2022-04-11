import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, fontDimens, fontDimensPer, strings } from '../../common'
import { icons } from '../../common/icons'
import { LogoComponent, BackButtonComponent, CustomText, OtpComponent, IconButtonWrapper } from '../../components'
import { KeyboardAwareScrollViewComponent } from '../../components/KeyboardAwareScrollViewComponent'
import { resetPasswordDataStore } from '../../store'
import { widthToDp } from '../../utils/Responsive'

interface IProps {

}

interface IState {

}

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center'
  },
  backContainer: {
    alignItems: 'flex-start',
    paddingTop: 35,
    paddingBottom: 35
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 43,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: colors.white
  },
  otpContainer: {
    paddingTop: 74,
    paddingBottom: 90,
    paddingHorizontal: 20
  },
  otpResendDescription: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.large),
    // lineHeight: 21,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  otpNoReceived: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.small),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    // lineHeight: 15,
    textAlign: 'center',
    paddingBottom: 20
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.black
  },
  contactUsLabel: {
    color: colors.black,
    // fontSize: fontDimens.small,
    // lineHeight: 15,
    textAlign: 'center',
    paddingLeft: 10,
    fontSize: widthToDp(fontDimensPer.medium),
    fontWeight: '400',
    fontFamily: 'Poppins-Medium',
  },
  contactUsContainer: {
    alignItems: 'center'
  }
})

@observer
export class EnterOtpScreen extends Component {

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

  renderOtpSendDescription = () => {
    const { OTP_RESEND_DESCRIPTION } = strings.OTP_INPUT_COMPONENT
    return (
      <CustomText textStyle={styles.otpResendDescription}>
        {OTP_RESEND_DESCRIPTION}
      </CustomText>
    )
  }


  renderOtpNotRecievedDescription = () => {
    const { OTP_NOT_RECIEVED } = strings.OTP_INPUT_COMPONENT
    return (
      <CustomText textStyle={styles.otpNoReceived}>
        {OTP_NOT_RECIEVED}
      </CustomText>
    )
  }


  renderEnterOtpView = () => {
    const { getEmailId, onSubmitOtpButtonPressed, onSendOtpButtonPressed } = resetPasswordDataStore

    return (
      <View style = {styles.otpContainer}>
        <OtpComponent
          onPressResendOtp = {onSendOtpButtonPressed}
          emailId = {getEmailId()}
          submitOtp = {onSubmitOtpButtonPressed}
        />
      </View>
    )
  }

  renderContactUsView = () => {
    const { CONTACT_US } = strings.OTP_INPUT_COMPONENT
    return (
      <View style = {styles.contactUsContainer}>
        <TouchableOpacity style = {styles.rowContainer}>
          <IconButtonWrapper
            iconImage={icons.CONTACT_US}
            iconHeight = {20}
            iconWidth = {20}
          />
          <CustomText textStyle={styles.contactUsLabel}>{CONTACT_US}</CustomText>

        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style = {styles.mainContainer}>
        {this.renderLogoComponent()}
        {this.renderBackArrowContainer()}
        {this.renderOtpSendDescription()}
        {this.renderEnterOtpView()}
        {this.renderOtpNotRecievedDescription()}
        {this.renderContactUsView()}
      </ScrollView>
    )
  }
}
