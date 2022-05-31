import React, { useEffect } from 'react'
import { Keyboard, View } from 'react-native'
import { commonStyles, icons, segoeFontTextStyles, strings, textStyles } from '../../common'
import { BACK_ICON_TYPES, SIGN_UP_USERS_TYPE, SIGN_UP_USER_TYPE_MAP } from '../../common/constant'
import { BackButtonComponent, ButtonComponent, HeaderComponent, IconButtonWrapper } from '../../components'
import { CustomText } from '../../components/CustomText'
import { log } from '../../config'
import { navigateSimple } from '../../service'
import { registerUserDataStore } from '../../store'
import { styles } from './styles'

const { SELECT_SIGN_UP, OWNER, TENANT  } = strings.REGISTER_USER
const { HEADING, DESCRIPTION, BUTTON_LABEL, HEADER_LABEL } = strings.VERIFY_EMAIL_SCREEN

const registerUserTypeScreen = ({ navigation }) => {

  useEffect(() => {
    return () => {
      registerUserDataStore.init()
    }
  }, [])

  const renderHeaderComponent = () => {
    return (
    //   <View style = {[commonStyles.yellowBottomBorder, commonStyles.rowWithVerticalCenter]}>
    //     <BackButtonComponent
    //       backIconType = {BACK_ICON_TYPES.CARET}
    //     />
    //     <CustomText textStyle={{ ...segoeFontTextStyles.extraLargeHeadingWithNormalWeight, ...styles.leftSpacing}}>
    //       {SELECT_SIGN_UP}
    //     </CustomText>
    //   </View>
      <HeaderComponent
        headerStyle={{ ...commonStyles.yellowBottomBorder, ...commonStyles.rowWithVerticalCenter }}
        backIconType = {BACK_ICON_TYPES.CARET}
        headerLabel = {SELECT_SIGN_UP}
        customHeadingStyle = {{ ...segoeFontTextStyles.twentyTwoNormalGreyish, ...styles.leftSpacing, ...commonStyles.textLeftAlign }}
      />
    )
  }

  const renderSignUpTypeView = ({
    iconSrc,
    buttonName,
    onClickButton
  }) => {
    return (
      <View>
        <IconButtonWrapper
          iconImage={iconSrc}
          iconHeight = {120}
          iconWidth = {'80%'}
          containerStyle = {{
            paddingBottom: 30
          }}
        />
        <ButtonComponent
          buttonLabel= {buttonName}
          onPressButton = {onClickButton}
          buttonLabelStyles = {segoeFontTextStyles.twentyNormalBlack}

        />
      </View>
    )
  }

  const verifyUserEmail = (emailId) => {
    const { registerUserByEmail } = registerUserDataStore
    Keyboard.dismiss()
    registerUserByEmail(emailId)
  }

  const navigateToEmailVerify = (userType) => {
    registerUserDataStore.setUserRegisterType(userType)
    navigateSimple(navigation, 'EmailVerificationScreen', {
      heading: HEADING,
      description: DESCRIPTION,
      buttonLabel: BUTTON_LABEL,
      headerLabel: HEADER_LABEL,
      verifyEmail: verifyUserEmail
    })
  }

  const renderSignUpButtonsType = () => {
    return (
      <View style = {[styles.horizontalPaddingContainer, commonStyles.verticalEquallySpaced]}>
        {renderSignUpTypeView({
          iconSrc: icons.OWNER,
          buttonName: SIGN_UP_USER_TYPE_MAP.get(SIGN_UP_USERS_TYPE.OWNER),
          onClickButton: () => navigateToEmailVerify(SIGN_UP_USERS_TYPE.OWNER)
        })}
        {renderSignUpTypeView({
          iconSrc: icons.TENANT,
          buttonName: SIGN_UP_USER_TYPE_MAP.get(SIGN_UP_USERS_TYPE.TENANT),
          onClickButton: () => navigateToEmailVerify(SIGN_UP_USERS_TYPE.TENANT)
        })}
      </View>
    )
  }

  return (
    <View style = {commonStyles.fullBlackContainer}>
      {renderHeaderComponent()}
      {renderSignUpButtonsType()}
    </View>
  )
}

export {
  registerUserTypeScreen as RegisterUserTypeScreen
}
