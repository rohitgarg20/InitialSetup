/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, icons } from '../../common'
import { popinsTextStyle, segoeFontTextStyles, commonStyles } from '../../common/commonStyles'
import { IconButtonWrapper, CustomText, RoundedBorderContainerComponent, OtpInputComponent, FlatListWrapper } from '../../common/components'
import { OPTIONS_LIST } from '../../common'
import { strings } from '../../common'
import { ContainerDataComponent, HeaderComponent } from '../../components'
import { logoutTransitionPopup } from '../../service'

const { HEADER_TITLE, ENTER_PASSCODE, SCAN_QR_CODE } = strings.HOME_SCREEN

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryButton
  },
  logoutIconContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    height: '100%'
  },
  bottomBorder: {
    borderWidth: 1
  },
  passcodeContainer: {
    // alignItems: 'center'
  },
  passcodeLabel: {
    textDecorationLine: 'underline',
    paddingBottom: 10,
    textAlign: 'center',
    fontWeight: '700'
  },
  scanQRCode: {
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryButton,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10
  },
  blackContainer: {
    borderRadius: 14,
    backgroundColor: colors.black,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionListContainer: {
    paddingVertical: 20
    // marginTop: 10
  },
  optionsContainer: {
    marginTop: 10
  }
})


export const GuardHomeScreen = () => {

  const renderLogoutView = () => {
    return  (
      <View style = {styles.logoutIconContainer}>
        <IconButtonWrapper
          iconImage={icons.LOGOUT}
          iconHeight = {40}
          iconWidth = {40}
          imageResizeMode = {'contain'}
          submitFunction = {logoutTransitionPopup}
          styling = {{
            // tintColor: colors.lightGrey
          }}
        />
      </View>
    )
  }


  const renderHeaderSection = () => {
    return (
      <HeaderComponent
        headerLabel={HEADER_TITLE}
        hideBackButton = {true}
        customizedView = {renderLogoutView}
        customHeadingStyle = {{
          left: 0
        }}
      />
    )
  }

  const renderScanQrCodeButton = () => {

    return (
      <TouchableOpacity style = {styles.scanQRCode} disabled = {true}>
        <View style = {[styles.blackContainer, { padding: 10, borderRadius: 10 }]}>
          <IconButtonWrapper
            iconImage={icons.SCAN_QR}
            iconWidth = {15}
            iconHeight = {15}
          />
        </View>
        <CustomText textStyle={{
          ...popinsTextStyle.eighteenBoldBlack,
          textAlign: 'center',
          paddingLeft: 5
        }}>{SCAN_QR_CODE}</CustomText>
      </TouchableOpacity>
    )
  }

  const renderFixedHeaderComponent = () => {
    return (
      <RoundedBorderContainerComponent>
        <View style = {styles.passcodeContainer}>
          <CustomText textStyle={{
            ...segoeFontTextStyles.extraLargeHeadingWithBlackNormalWeight,
            ...styles.passcodeLabel
          }}>{ENTER_PASSCODE}</CustomText>
          <OtpInputComponent
            otpLength = {6}
            otpInputValue = {[]}
            onChangeOtpValue = {() => {}}
            isDisabled = {true}
          />
          <View style = {styles.bottomBorder}/>
          {renderScanQrCodeButton()}
        </View>
      </RoundedBorderContainerComponent>
    )
  }

  const renderIconWithBlackContainer = (optionImg) => {
    return (
      <View style = {styles.blackContainer}>
        <IconButtonWrapper
          iconImage={optionImg}
          iconWidth = {25}
          iconHeight = {25}/>
      </View>
    )
  }

  const renderOptionLabel = (optionLabel) => {
    return (
      <CustomText textStyle={{
        ...popinsTextStyle.eighteenBoldBlack,
        paddingLeft: 10
      }}>
        {optionLabel}
      </CustomText>
    )
  }

  const renderOptionItem = ({ item }) => {
    const { label, icon, key } = item || {}
    return (
      <RoundedBorderContainerComponent containerStyle = {{
        paddingBottom: 10
      }}>
        <TouchableOpacity style = {[
          commonStyles.rowWithEqualSpaced,
          commonStyles.rowWithVerticalCenter
        ]}>
          <View style = {commonStyles.rowWithVerticalCenter}>
            {renderIconWithBlackContainer(icon)}
            {renderOptionLabel(label)}
          </View>
          <IconButtonWrapper
            iconImage={icons.RIGHT_ARROW}
            iconWidth = {35}
            iconHeight = {35}
            styling = {{
              tintColor: colors.black
            }}
          />
        </TouchableOpacity>
      </RoundedBorderContainerComponent>
    )
  }

  const renderMainContainer = () => {
    return (
      <FlatListWrapper
        data = {OPTIONS_LIST}
        style = {styles.optionsContainer}
        contentContainerStyle = {styles.optionListContainer}
        renderItem = {renderOptionItem}
        ItemSeparatorComponent = {() => (
          <View style = {{
            paddingBottom: 10
          }}/>
        )}
      />
    )
  }


  return (
    <View style = {styles.container}>
      {renderHeaderSection()}
      <ContainerDataComponent
        fixedHeaderComponent={renderFixedHeaderComponent}
        renderContainerComponent = {renderMainContainer}
      />
    </View>
  )
}
