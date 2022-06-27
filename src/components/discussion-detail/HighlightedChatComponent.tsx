import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, fontDimensPer } from '../../common'
import { BASE_URL } from '../../common/constant'
import { IHighlightedChatItem, IUserObj } from '../../store/interfaces'
import { capitalizeFirstLetterOnly } from '../../utils/app-utils'
import { widthToDp } from '../../utils/Responsive'
import { CustomText } from '../CustomText'
import { UserAvatar } from '../UserAvtar'

const styles = StyleSheet.create({
  nameLabel: {
    fontSize: widthToDp(fontDimensPer.large),
    // lineHeight: 20,
    color: colors.black,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium'
    // lineHeight: 18
  },
  aboutUser: {
    fontSize: widthToDp(fontDimensPer.small),
    // lineHeight: 16,
    color: '#828282',
    fontWeight: '400',
    fontFamily: 'Poppins-Regular'
    // width: '50%'
  },
  withoutImageColor: {
    backgroundColor: '#cccccc'
  },
  avtarContainer: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    marginRight: 5
  },
  cardContainer: {
    // justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderColor: colors.white,
    backgroundColor: colors.white
  },
  rowContainer: {
    flexDirection: 'row'
  },
  chatContent: {
    fontSize: widthToDp(fontDimensPer.medium),
    color: colors.black,
    lineHeight: 16,
    fontWeight: '400',
    fontFamily: 'OpenSans-VariableFont_wdth,wght'
  }
})

interface IProps {
  chatData: IHighlightedChatItem
}

const highlightedChatCardComponent = (props: IProps) => {

  const { chatData } = props
  const { author, content, _id } = chatData || {}
  const { picture, fullName, signature, displayName, } = author || {}

  const renderUserName = () => {
    return (
      <CustomText textStyle={styles.nameLabel}>
        {capitalizeFirstLetterOnly(displayName)}
      </CustomText>
    )
  }

  const renderAboutUser = () => {
    return (
      <CustomText textStyle={styles.aboutUser} numberOfLines={1} ellipsizeMode={'tail'} >
        {signature}
      </CustomText>
    )
  }

  const renderRoundedAvtar = () => {
    return displayName ? (
      <View style={[styles.avtarContainer]}>
        <UserAvatar
          size={'30'}
          imageStyle={[styles.withoutImageColor, { width: '100%', height: '100%' }]}
          showBorderRadius={true}
          name={displayName.toUpperCase()}
          src={`${BASE_URL}${picture}`}
        />
      </View>
    ) : null
  }

  const renderChatDetail = () => {
    return (
      <View style = {{
        paddingVertical: 5
      }}>
        <CustomText textStyle={styles.chatContent}>{content}</CustomText>
      </View>
    )
  }

  const renderUserDetails = () => {
    return (
      <View style={styles.cardContainer}>
        {renderUserName()}
        {renderAboutUser()}
        {renderChatDetail()}
      </View>
    )
  }
  return (
    <View style = {styles.rowContainer}>
      {renderRoundedAvtar()}
      {renderUserDetails()}
    </View>
  )
}

export {
  highlightedChatCardComponent as HighlightedChatCardComponent
}
