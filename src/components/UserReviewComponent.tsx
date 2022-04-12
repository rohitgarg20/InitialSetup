import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CustomText, IconButtonWrapper } from '.'
import { colors, fontDimens } from '../common'
import { icons } from '../common/icons'
import { I_REVIEWS_ITEM } from '../common/Interfaces'
import { getWidth } from '../common/scaling'
import { log } from '../config'

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    flex: 10,
    alignItems: 'center'
  },
  iconContainer: {
    // flex: 2,
    paddingRight: 10
  },
  userName: {
    paddingTop: 8,
    fontSize: fontDimens.extraSmall,
    lineHeight: 12,
    fontWeight: '600',
    color: colors.black
  },
  content: {
    fontSize: fontDimens.extraSmall,
    lineHeight: 12,
    fontWeight: '400',
    color: colors.black,
    // flexWrap: 'wrap',
    // alignItems: 'flex-start'
  },
  dotView: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: colors.black,
    marginHorizontal: 5
  },
  userGradeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userType: {
    fontSize: fontDimens.extraSmall,
    lineHeight: 12,
    fontWeight: '400',
    color: colors.black
  },
  heading: {
    fontSize: fontDimens.big,
    lineHeight: 19,
    fontWeight: '600',
    color: colors.black,
    paddingBottom: 5
  }
})

interface IProps {
  review: I_REVIEWS_ITEM
}

const userReviewComponent = (props: IProps) => {
  const { review } = props
  const { heading, profileImage, content, userName, userType, grade }  = review
  log('userReviewComponentuserReviewComponent', review)


  const renderContent = () => {
    log('contentcontent', )
    return (
      <View style = {{
        // flexWrap: 'wrap',
        // alignItems: 'flex-start',
        // flexShrink: 1
      }}>
      <CustomText textStyle={styles.content}>
        {content}
      </CustomText>
      </View>
    )
  }

  const renderUserName = () => {
    return (
      <CustomText textStyle={styles.userName}>
        {userName}
      </CustomText>
    )
  }

  const renderUserTypeGradeView = () => {
    return (
      <View style = {styles.userGradeContainer}>
        <CustomText textStyle={styles.userType}>
          {userType}
        </CustomText>
        <View style = {styles.dotView}/>
        <CustomText textStyle={styles.userType}>
          {grade}
        </CustomText>
      </View>
    )
  }

  const renderUserInfo = () => {
    return (
      <View style = {{
        flex: 8,
        // backgroundColor: 'purple'
      }}>
        {renderContent()}
        {renderUserName()}
        {renderUserTypeGradeView()}
      </View>
    )
  }

  const renderUserIcon = () => {
    return (
      <View style = {styles.iconContainer}>
        <IconButtonWrapper
          iconImage={icons.BRICK}
          iconWidth = {50}
          iconHeight = {80}
          imageResizeMode = {'cover'}
        />
      </View>
    )
  }

  return (
    <View style = {{
      // flex: 1,
      width: getWidth() * 0.85,
      paddingLeft: 30,
      paddingBottom: 10,
      height: '100%'
    }}>
      <CustomText textStyle={styles.heading}>
        {heading}
      </CustomText>
      <View style = {styles.rowContainer}>
        {renderUserIcon()}
        {renderUserInfo()}
      </View>
    </View>
  )
}

export {
  userReviewComponent as UserReviewComponent
}