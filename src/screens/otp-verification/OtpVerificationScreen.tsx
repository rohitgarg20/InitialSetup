import { computed } from 'mobx'
import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, commonStyles, icons, isOTPValid, segoeFontTextStyles, strings, textStyles } from '../../common'
import { BACK_ICON_TYPES } from '../../common/constant'
import { BackButtonComponent, ButtonComponent, HeaderComponent, IconButtonWrapper, KeyboardAwareScrollViewComponent, TimeWrapper } from '../../components'
import { CustomText } from '../../components/CustomText'
import { OtpInputComponent } from '../../components/OtpInputComponent'
import { log } from '../../config'
import { goBack } from '../../service'

const styles = StyleSheet.create({
  paddingContainer: {
    paddingHorizontal: '15%',
    paddingTop: 20
    // justifyContent: 'center'
  },
  textSeperator: {
    paddingVertical: 20,
    textDecorationLine: 'underline'
    // flex: 1
    // borderBottomWidth: 1
  },
  horizontal: {
    borderWidth: 2,
    borderColor: colors.primaryButton,
    backgroundColor: colors.primaryButton
  },
  otpSendView: {
    flexDirection: 'row',
    paddingTop: 6,
    paddingBottom: 30,
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignSelf: 'center'
  },
  emailId: {
    textDecorationLine: 'underline',
    color: colors.primaryButton
  },
  clickHereButtonContainer: {
    width: 'auto',
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  itemSeperator: {
    paddingTop: 20
  },
  itemSeperatorBottom: {
    paddingBottom: 20
  },
  submitButton: {
    marginTop: 20
  }
})

const { OTP_SENT_SUCCESS, CHECK_SPAM, OTP_SEND, CLICK_HERE, RESEND_OTP, RESEND_OTP_IN, VERIFY_OTP } = strings.OTP_VERIFICATION_SCREEN
export const otpVerificationScreen = ({ navigation, route }) => {

  const [otpInput, updateOtpInputValue] = useState([])
  const [showResendTimerView, updateResendViewStatus] = useState(true)
  const { emailId, onResendOtp, onVerifyOtp  } = route.params || {}

  const isSubmitButtonDisabled: any = computed(() => {
    return !isOTPValid(otpInput.map((otp) => otp).join(''))
  }).get()

  const renderOtpVerificationImage = () => {
    return (
      <IconButtonWrapper
        iconImage={icons.OTP_VERIFICATION}
        iconHeight = {200}
        iconWidth = {'100%'}
        imageResizeMode = {'cover'}
      />
    )
  }

  const renderEmailSentHeading = () => {
    return (
      <>
        <CustomText textStyle={{ ...segoeFontTextStyles.twentyNormalGreyish, ...commonStyles.textHorizontalCenter}}>
          {OTP_SENT_SUCCESS}
        </CustomText>
      </>
    )
  }

  const renderCheckSpam = () => {
    return (
      <CustomText textStyle={{ ...segoeFontTextStyles.sixteenNormalGreyish, ...commonStyles.textHorizontalCenter, ...styles.textSeperator}}>
        {CHECK_SPAM}
      </CustomText>
    )
  }

  const renderHorizontalLine = () => {
    return (
      <View style = {styles.horizontal}/>
    )
  }

  const renderOtpSendToEmail = () => {
    // const { emailId } = this.props
    return (
      <View style = {styles.otpSendView}>
        <CustomText textStyle={{ ...segoeFontTextStyles.eighteenNormalGreyish, ...commonStyles.textHorizontalCenter }}>
          {OTP_SEND}
          <CustomText textStyle={{ ...segoeFontTextStyles.eighteenNormalGreyish, ...styles.emailId }}>
            {emailId}
          </CustomText>
        </CustomText>
      </View>
    )
  }

  const onChangeOtpValue = (updatedOtpValue) => {
    updateOtpInputValue(updatedOtpValue)
  }

  const renderOtpView = () => {
    return (
      <OtpInputComponent
        otpLength={6}
        onChangeOtpValue={onChangeOtpValue}
        otpInputValue = {otpInput}
      />
    )
  }

  const resendOtp = () => {
    updateResendViewStatus(true)
    if (onResendOtp) {
      onResendOtp()
    }
  }

  const renderResendOtpView = () => {
    return (
      <View style = {commonStyles.rowWithHorizontalCenter}>
        <ButtonComponent
          buttonLabel={CLICK_HERE}
          buttonLabelStyles={{ ...segoeFontTextStyles.eighteenNormalGreyish, ...styles.emailId}}
          onPressButton={resendOtp}
          buttonType = {'normal'}
          buttonContainerStyles = {styles.clickHereButtonContainer}
        />
        <CustomText textStyle={{ ...segoeFontTextStyles.eighteenNormalGreyish }}>{RESEND_OTP}</CustomText>
      </View>
    )
  }


  const onTimerElapsed = useCallback(() => {
    updateResendViewStatus(false)
  }, [])

  const renderResendTimerView = () => {
    if (!showResendTimerView) {
      return null
    }
    return (
      <View style = {[commonStyles.columnWithHorizontalCenter, styles.itemSeperator]}>
        <CustomText textStyle={{ ...segoeFontTextStyles.eighteenNormalGreyish, ...styles.itemSeperatorBottom }}>{RESEND_OTP_IN}</CustomText>
        <TimeWrapper
          timerCountdown={60}
          onTimerElapsed = {onTimerElapsed}
        />
      </View>
    )
  }


  const submitOtp = () => {
    if (onVerifyOtp) {
      onVerifyOtp(otpInput.map((otp) => otp).join(''))
    }
  }

  const renderSubmitButton = () => {
    return (
      <ButtonComponent
        buttonLabel={VERIFY_OTP}
        onPressButton = {submitOtp}
        buttonContainerStyles = {[styles.submitButton, {
          opacity: isSubmitButtonDisabled ? 0.5 : 1
        }]}
        disabled = {isSubmitButtonDisabled}
      />
    )
  }

  const renderBackButton = () => {
    return (
      <View style = {[commonStyles.flexStart, styles.itemSeperator]}>
        <BackButtonComponent
          backIconType={BACK_ICON_TYPES.CARET}
          onPressBack = {() => goBack(navigation)}
          backButtonStyle = {{
            tintColor: colors.primaryButton
          }}
        />
      </View>
    )
  }


  return (
    <KeyboardAwareScrollViewComponent style = {[commonStyles.fullBlackContainer]}>
      {renderBackButton()}
      <View style = {[ styles.paddingContainer]}>
        {renderOtpVerificationImage()}
        {renderEmailSentHeading()}
        {renderCheckSpam()}
      </View>
      {renderHorizontalLine()}
      <View style = {[ styles.paddingContainer]}>
        {renderOtpSendToEmail()}
        {renderOtpView()}
        {showResendTimerView ? null : renderResendOtpView()}
        {renderResendTimerView()}
        {renderSubmitButton()}
      </View>

    </KeyboardAwareScrollViewComponent>
  )
}

export {
  otpVerificationScreen as OtpVerificationScreen
}
