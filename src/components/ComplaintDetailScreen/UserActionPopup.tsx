import { observer } from 'mobx-react'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, commonStyles, fontDimensPer, popinsTextStyle, strings } from '../../common'
import { widthToDp } from '../../common/Responsive'
import { complaintDetailStore, genericDrawerStore } from '../../store'
import { ButtonComponent } from '../ButtonComponent'
import { CustomText } from '../CustomText'
import { TextInputComponent } from '../TextInputWrapper'

interface IProps {

}

const styles = StyleSheet.create({
  notifyAdminPopup: {
    borderRadius: 20,
    borderColor: colors.white,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    zIndex: 99999,
    width: '80%',
    alignItems: 'center'

  },
  roundedBorderContainer: {
    borderRadius: 20,
    paddingBottom: 20,
    backgroundColor: colors.grey,
    marginVertical: 10,
    height: 100,
    alignItems: 'flex-start',
    padding: 0
  },
  textInput: {
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    color: colors.black,
    fontFamily: 'poppins',
    height: '100%',
    textAlignVertical: 'top'
  },
  cancelButton: {
    width: 'auto',
    backgroundColor: colors.darkGrey,
    borderColor: colors.darkGrey
  },
  actionButton: {
    width: 'auto',
    backgroundColor: colors.darkBlue,
    borderColor: colors.darkBlue,
    paddingVertical: 0
  },
  paddingVertical: {
    paddingVertical: 10
  },
  textUnderline: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.darkBlue,
    color: colors.darkBlue
  }
})

interface IProps {
  popupType: 'notifyAdmin' | 'markAsResolved' | 'closeComplaint'
}

const userActionPopup = observer((props: IProps) => {

  const {popupType  } = props

  const renderFooterButtons = ({ secondButtonLabel, buttonAction }) => {
    const { HEADING, CANCEL, TEXT_INPUT } = strings.NOTIFY_ADMIN_POPUP

    return (
      <View style = {[commonStyles.rowWithEqualSpaced, { width: '100%' }]}>
        <ButtonComponent
          buttonLabel={CANCEL}
          onPressButton = {() => {
            genericDrawerStore.disableDrawer()
          }}
          buttonContainerStyles = {styles.cancelButton}
          buttonLabelStyles = {{
            ...popinsTextStyle.sixteenSemiBoldBlack,
            color: colors.white
          }}
        />
        <ButtonComponent
          buttonLabel={secondButtonLabel}
          onPressButton = {() => {
            buttonAction()
          }}
          buttonContainerStyles = {styles.actionButton}
          buttonLabelStyles = {{
            ...popinsTextStyle.sixteenSemiBoldBlack,
            color: colors.white
          }}
        />
      </View>
    )
  }
  const renderCloseComplaint = () => {
    const { HEADING, COMPLAINT_STATUS, CLOSE_COMPLAINT } = strings.CLOSE_COMPLAINT_ALERT
    const { complainDetailData } = complaintDetailStore
    const { statusDisplayData } = complainDetailData
    const {  backgroundColor, value  } = statusDisplayData || {}

    return (
      <View style = {styles.notifyAdminPopup}>
        <CustomText textStyle={popinsTextStyle.sixteenSemiBoldBlack}>{HEADING}</CustomText>
        <View style = {[commonStyles.rowContainer, styles.paddingVertical]}>
          <CustomText textStyle={popinsTextStyle.sixteenSemiBoldBlack}>{COMPLAINT_STATUS}</CustomText>
          <CustomText textStyle={{ ...popinsTextStyle.sixteenSemiBoldBlack, ...styles.textUnderline}}>{value}</CustomText>
        </View>
        {renderFooterButtons({
          secondButtonLabel: CLOSE_COMPLAINT,
          buttonAction: () => {}
        })}
      </View>
    )
  }


  const renderMarkAsResolved = () => {
    const { HEADING, CANCEL, TEXT_INPUT } = strings.MARK_AS_RESOLVED_POPUP
    const { userMsg } = complaintDetailStore
    return (
      <View style = {styles.notifyAdminPopup}>
        <CustomText textStyle={popinsTextStyle.sixteenSemiBoldBlack}>{HEADING}</CustomText>
        <TextInputComponent
          placeholder={TEXT_INPUT}
          multiline = {true}
          inputContainerStyle = {[styles.roundedBorderContainer, {  }]}
          useAnimated = {false}
          textInputStyle = {styles.textInput}
          onChangeText = {complaintDetailStore.updateUserMsg}
          inputValue = {userMsg}
        />
        {renderFooterButtons({
          secondButtonLabel: HEADING,
          buttonAction: () => {}
        })}
      </View>
    )
  }

  const showNotifyAdmin = () => {
    const { HEADING, CANCEL, TEXT_INPUT } = strings.NOTIFY_ADMIN_POPUP
    const { userMsg } = complaintDetailStore

    return (
      <View style = {styles.notifyAdminPopup}>
        <CustomText textStyle={popinsTextStyle.sixteenSemiBoldBlack}>{HEADING}</CustomText>
        <TextInputComponent
          placeholder={TEXT_INPUT}
          multiline = {true}
          inputContainerStyle = {[styles.roundedBorderContainer, {  }]}
          useAnimated = {false}
          textInputStyle = {styles.textInput}
          onChangeText = {complaintDetailStore.updateUserMsg}
          inputValue = {userMsg}

        />
        {renderFooterButtons({
          secondButtonLabel: HEADING,
          buttonAction: () => {}
        })}
      </View>
    )
  }

  let viewToRender = null
  if (popupType === 'notifyAdmin') {
    viewToRender = showNotifyAdmin()
  }

  if (popupType === 'markAsResolved') {
    viewToRender = (renderMarkAsResolved())
  }

  if (popupType === 'closeComplaint') {
    viewToRender = renderCloseComplaint()
  }

  return (viewToRender)

})

export {
  userActionPopup as UserActionPopup
}
