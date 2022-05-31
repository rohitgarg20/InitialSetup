import React from 'react'
import { StyleSheet, View } from 'react-native'
import { commonStyles, icons, segoeFontTextStyles, strings, textStyles } from '../../common'
import { ButtonComponent, IconButtonWrapper } from '../../components'
import { CustomText } from '../../components/CustomText'
import { setInititalStackName } from '../../service'
import { logoutHandler } from '../../service/LogoutService'
import { getScreenNameToNavigateToOnLogin } from '../../service/UserNavigationService'

const styles = StyleSheet.create({
  itemSeperator: {
    paddingVertical: 20
  },
  paddingHorizontal: {
    paddingHorizontal: '20%'
  }
})

const { HEADING, DESCRIPTION, REFRESH, LOGOUT } = strings.APPROVAL_PENDING

export const approvalRequestPendingScreen = () => {

  const renderPendingIcon = () => {
    return (
      <IconButtonWrapper
        iconImage={icons.APPROVAL_PENDING}
        iconWidth = {200}
        iconHeight = {200}
      />
    )
  }

  const renderHeading = () => {
    return (
      <View style = {styles.itemSeperator}>
        <CustomText textStyle={{ ...segoeFontTextStyles.extraLargeHeadingWithBoldWeight, ...commonStyles.textHorizontalCenter}}>
          {HEADING}
        </CustomText>
      </View>
    )
  }

  const renderDescription = () => {
    return (
      <View style = {styles.itemSeperator}>
        <CustomText textStyle={{ ...segoeFontTextStyles.extraLargeHeadingWithNormalWeight, ...commonStyles.textHorizontalCenter}}>
          {DESCRIPTION}
        </CustomText>
      </View>
    )
  }

  const refershData = () => {
    getScreenNameToNavigateToOnLogin().then((stackToNavigate) => {
      if (stackToNavigate) {
        setInititalStackName(stackToNavigate)
      }
    }).catch((err) => {
      
    })
  }



  const renderButtons = () => {
    return (
      <View style = {commonStyles.flexColumnWithStretch}>
        <ButtonComponent
          buttonLabel={REFRESH}
          onPressButton = {refershData}
        />
         <ButtonComponent
          buttonContainerStyles={{
              marginTop: 20
          }}
          buttonLabel={LOGOUT}
          onPressButton = {logoutHandler}
        />
      </View>
    )
  }

  return (
    <View style = {[commonStyles.fullBlackContainer, commonStyles.verticalCenter, commonStyles.columnWithHorizontalCenter, styles.paddingHorizontal]}>
      {renderPendingIcon()}
      {renderHeading()}
      {renderDescription()}
      {renderButtons()}
    </View>
  )
}

export {
  approvalRequestPendingScreen as ApprovalRequestPendingScreen
}
