import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { CustomText, OtpInputComponent } from '..'
import { colors, fontDimens, fontDimensPer, strings } from '../../common'
import { widthToDp } from '../../utils/Responsive'

interface IProps {
  emailId?: string
  onPressResendOtp?: () => void
  submitOtp?: (otpValue) => void
}

interface IState {
  otpInput?: string[]
}


const styles = StyleSheet.create({
  heading: {
    fontSize: widthToDp(fontDimensPer.large),
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
    paddingBottom: 5
  },
  otpSend: {
    fontSize: widthToDp(fontDimensPer.medium),
    fontFamily: 'Poppins-Regular',
    color: colors.labelColor,
    fontWeight: '400',
    textAlign: 'center'
  },
  email: {
    fontSize: widthToDp(fontDimensPer.medium),
    fontFamily: 'Poppins-Regular',
    color: colors.lightBlue,
    fontWeight: '400',
    lineHeight: 16
  },
  submitButton: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    minWidth: 100
  },
  resendButton: {
    backgroundColor: colors.grey,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    minWidth: 100
  },
  submitLabel: {
    // fontSize: fontDimens.small,
    color: colors.white,
    fontWeight: '500',
    lineHeight: 15,
    fontSize:  widthToDp(fontDimensPer.medium),
    fontFamily: 'Poppins-Medium',
  },
  resendLabel: {
    // fontSize: fontDimens.small,
    color: colors.black,
    fontWeight: '500',
    lineHeight: 15,
    fontSize:  widthToDp(fontDimensPer.medium),
    fontFamily: 'Poppins-Medium',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 25,
    paddingHorizontal: 20
  },
  otpSendView: {
    flexDirection: 'row',
    paddingTop: 6,
    paddingBottom: 30,
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
})

export class OtpComponent extends Component<IProps, IState> {

  state = {
    otpInput: []
  }

   onChangeOtpValue = (updatedOtpValue) => {
     this.setState({
       otpInput: updatedOtpValue
     })
   }

   renderSubmitButton = () => {
     const { SUBMIT } = strings.OTP_INPUT_COMPONENT
     const { submitOtp } = this.props
     const { otpInput } = this.state
     return (
       <TouchableOpacity style = {styles.submitButton} onPress={() => {
         if (submitOtp) {
           submitOtp(otpInput.join(''))
         }
       }}>
         <CustomText textStyle={styles.submitLabel}>
           {SUBMIT}
         </CustomText>
       </TouchableOpacity>
     )
   }


   renderResendButton = () => {
     const { RESEND_OTP } = strings.OTP_INPUT_COMPONENT
     const { onPressResendOtp } = this.props
     return (
       <TouchableOpacity style = {[styles.resendButton]} onPress={() => {
         if (onPressResendOtp) {
           onPressResendOtp()
         }
       }}>
         <CustomText textStyle={styles.resendLabel}>
           {RESEND_OTP}
         </CustomText>
       </TouchableOpacity>
     )
   }

   renderOtpButtons = () => {
     return (
       <View style = {styles.rowContainer}>
         {this.renderResendButton()}
         {this.renderSubmitButton()}
       </View>
     )
   }

  renderOtpView = () => {
    const { otpInput } = this.state
    return (
      <OtpInputComponent
        otpLength={6}
        onChangeOtpValue={this.onChangeOtpValue}
        otpInputValue = {otpInput}
      />
    )
  }

  renderOtpSendToEmail = () => {
    const { HEADING, RESEND_OTP, SUBMIT, OTP_SEND} = strings.OTP_INPUT_COMPONENT
    const { emailId } = this.props
    return (
      <View style = {styles.otpSendView}>
        <CustomText textStyle={styles.otpSend}>
          {OTP_SEND}

        </CustomText>
        <CustomText textStyle={styles.email}>
          {emailId}
        </CustomText>
      </View>
    )
  }

  render() {
    const { HEADING, RESEND_OTP, SUBMIT, OTP_SEND} = strings.OTP_INPUT_COMPONENT
    return (
      <View>
        <CustomText textStyle={styles.heading}>
          {HEADING}
        </CustomText>
        {this.renderOtpSendToEmail()}
        {this.renderOtpView()}
        {this.renderOtpButtons()}
      </View>
    )
  }
}
