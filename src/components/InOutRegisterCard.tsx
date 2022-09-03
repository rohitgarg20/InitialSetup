import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, icons } from '../common'
import { popinsTextStyle, commonStyles } from '../common/commonStyles'
import { UserAvatar, CustomText, IconButtonWrapper } from '../common/components'
import { BASE_URL, GET_DATA_BY_VISITOR_TYPE } from '../common/Constant'

const HEADER_HEIGHT = 70

const styles = StyleSheet.create({
  avtarContainer: {
    height: HEADER_HEIGHT - 15,
    width: HEADER_HEIGHT - 15,
    justifyContent: 'center',
    marginRight: 5
  },
  withoutImageColor: {
    backgroundColor: '#cccccc'
  },
  container: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginTop: 4
  },
  inOutBorderContainer: {
    borderRadius: 10,
    // paddingVertical: 8,
    paddingHorizontal: 2,
    alignItems: 'center',
    borderWidth: 2,
    flex: 10,
    height: 60,
    justifyContent: 'space-between'
    // height: 70
  },
  flatNo: {
    backgroundColor: colors.black,
    borderColor: colors.primaryButton
  },
  inContainer: {
    backgroundColor: colors.white,
    borderColor: colors.white
  },
  outContainer: {
    backgroundColor: colors.primaryButton,
    borderColor: colors.white,
    marginLeft: 10
  },
  detailedInfoContainer: {
    borderRadius: 10,
    backgroundColor: colors.black,
    padding: 10,
    flexDirection: 'row',
    // flex: 35,
    alignItems: 'center',
    marginTop: 15
  },
  rightArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 5
    // paddingHorizontal: 15,
  },
  cardContainer: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: colors.white
  },
  paddingLeft: {
    paddingLeft: 10
  }
})

export const InOutRegisterCard = (props) => {

  const { username, picture = 'abcdefg', visitorType } = props


  const renderRoundedAvtar = () => {
    return username ? (
      <View style={[styles.avtarContainer]}>
        <UserAvatar
          size={'60'}
          imageStyle={[styles.withoutImageColor, { width: '80%', height: '80%' }]}
          showBorderRadius={true}
          name={username.toUpperCase()}
          src={`${BASE_URL}${picture}`}
        />
      </View>
    ) : null
  }

  const renderUserName = () => {
    return (
      <CustomText textStyle={popinsTextStyle.twentyNormalBlack}>{username}</CustomText>
    )
  }

  const renderUserType = () => {
    const { displayLabel, bgColor } = GET_DATA_BY_VISITOR_TYPE.get(visitorType)
    return (
      <View style = {[
        styles.container,
        {
          backgroundColor: bgColor
        }
      ]}>
        <CustomText textStyle={popinsTextStyle.fourteenNormalBlack}>{displayLabel}</CustomText>
      </View>
    )
  }

  const renderVisitedFlatNo = () => {
    return (
      <View style = {[styles.inOutBorderContainer, styles.flatNo]}>
        <CustomText textStyle={popinsTextStyle.eitheenNormalWhite}>A</CustomText>
        <CustomText textStyle={popinsTextStyle.eitheenNormalWhite}>205</CustomText>
      </View>
    )
  }

  const renderInData = () => {
    return (
      <View style = {[styles.inOutBorderContainer, styles.inContainer]}>
        <IconButtonWrapper
          iconImage={icons.ADD_MORE_TAB}
          iconHeight = {27}
          iconWidth = {27}
        />
        <CustomText textStyle={popinsTextStyle.eighteenNormalBlack}> 03:05PM</CustomText>
      </View>
    )
  }

  const renderOutData = () => {
    return (
      <View style = {[styles.inOutBorderContainer, styles.outContainer]}>
        <IconButtonWrapper
          iconImage={icons.ADD_MORE_TAB}
          iconHeight = {27}
          iconWidth = {27}
        />
        <CustomText textStyle={popinsTextStyle.eighteenNormalBlack}>Out</CustomText>
      </View>
    )
  }

  const renderArrow = () => {
    return (
      <View style = {styles.rightArrow}>
        <IconButtonWrapper
          iconImage={icons.ADD_MORE_TAB}
          iconHeight = {20}
          iconWidth = {20}
        />
      </View>
    )
  }

  const renderDetailedInfo = () => {
    return (
      <View style = {styles.detailedInfoContainer}>
        {renderVisitedFlatNo()}
        {renderArrow()}
        {renderInData()}
        {renderOutData()}
      </View>
    )
  }

  const renderUserNameWithType = () => {
    return (
      <View style = {styles.paddingLeft}>
        {renderUserName()}
        {renderUserType()}
      </View>
    )
  }

  const renderUserDetail = () => {
    return (
      <View style = {commonStyles.rowWithEqualSpaced}>
        <View style = {[commonStyles.rowContainer, { alignItems: 'center' }]}>
          {renderRoundedAvtar()}
          {renderUserNameWithType()}
        </View>

      </View>
    )
  }

  return (
    <View style = {styles.cardContainer}>
      {renderUserDetail()}
      {renderDetailedInfo()}
    </View>
  )

}