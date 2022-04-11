import React, { Component } from 'react'
import { Dimensions, ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native'
import  Share  from 'react-native-share'

import { get } from 'lodash'
import { colors, fontDimens, fontDimensPer } from '../../common'
import { BASE_URL, FOOTER_KEYS, FOOTER_LIST_ITEMS, OPTIONS_DATA_FOR_OTHER_POST, OPTIONS_DATA_FOR_SELF_POST, POST_TYPES } from '../../common/constant'
import { icons } from '../../common/icons'
import { IPostItem, IUserObj } from '../../store/interfaces'
import { capitalizeFirstLetterOnly, formatDate } from '../../utils/app-utils'
import { CustomText } from '../CustomText'
import { IconButtonWrapper } from '../IconButtonWrapper'
import { UserAvatar } from '../UserAvtar'
import { log } from '../../config'
import { InfoToolTip } from '../InfoToolTip'
import { CommunityOptionsComponent } from '../OptionsListComponent'
import { ImageWithLoaderComponent } from '../ImageWithLoaderComponent'
import { widthToDp } from '../../utils/Responsive'

const styles = StyleSheet.create({
  withoutImageColor: {
    backgroundColor: '#cccccc'
  },
  nameLabel: {
    fontSize: widthToDp(fontDimensPer.large),
    // lineHeight: 20,
    color: colors.black,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    // lineHeight: 18
  },
  aboutUser: {
    fontSize: widthToDp(fontDimensPer.medium),
    // lineHeight: 16,
    color: colors.lightBlue,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    // width: '50%'
  },
  dateView: {
    fontSize: widthToDp(fontDimensPer.small),
    // lineHeight: 16,
    color: colors.labelColor,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    // paddingTop: 2,
  },
  contentView: {
    fontSize: widthToDp(fontDimensPer.medium),
    color: colors.black,
    fontWeight: '400',
    fontFamily: 'OpenSans-VariableFont_wdth,wght'
  },
  postTime: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.grey
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
    marginTop: 10
  },
  postView: {
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    borderRadius: 10,
    padding: 10
  },
  dotView: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: colors.grey
  },
  footerList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: colors.lightestGrey,
    paddingTop: 10,
    marginTop: 10
  },
  footerItem: {
    alignItems: 'center'
  },
  avtarContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    marginRight: 5
  },
  cardContainer: {
    padding: 20,
    borderColor: colors.borderColor,
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: colors.labelColor,
    shadowOpacity: 0.26,
    elevation: 3
  },
  otherInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10
  },
  titleLabel: {

  },
  mainViewStyle: {
    borderWidth: 1,
    borderColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 10,
    padding: 0,
    paddingVertical: 15,
    // left: Dimensions.get('window').width - 180,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    overflow: 'hidden',
    marginTop: 15,
    marginLeft: 10
  },
  userInfoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    flex: 10,
    paddingLeft: 15
  }

})


interface IProps {
  postData: IPostItem
  onClickPostOption?: (data) => void
}


export default class PostCardComponent extends Component<IProps> {
  toolTipRef

  getUserData = () => {
    const { postData } = this.props
    const { user } = postData || {}
    return user
  }


  renderRoundedAvtar = () => {
    const userObj: IUserObj = this.getUserData()
    const { displayname = '', picture = '' } = userObj || {}

    return displayname ? (
      <View style={[styles.avtarContainer]}>
        <UserAvatar
          size={'50'}
          imageStyle={[styles.withoutImageColor, { width: '100%', height: '100%' }]}
          showBorderRadius={true}
          name={displayname.toUpperCase()}
          src={`${BASE_URL}${picture}`}
        />
      </View>
    ) : null
  }

  renderUserName = () => {
    const userObj: IUserObj = this.getUserData()
    const { displayname = '', picture = '' } = userObj || {}
    return (
      <CustomText textStyle={styles.nameLabel}>
        {capitalizeFirstLetterOnly(displayname)}
      </CustomText>
    )
  }

  renderAboutUser = () => {
    const userObj: IUserObj = this.getUserData()
    const { signature = '' } = userObj || {}
    return (
      <CustomText textStyle={styles.aboutUser} numberOfLines={1} ellipsizeMode={'tail'} >
        {signature}
      </CustomText>
    )
  }

  renderDateView = () => {
    const { postData } = this.props
    const { postDate } = postData || {}
    return (
      <CustomText textStyle={styles.dateView}>
        {formatDate(postDate, {
          showDay: false
        })}
      </CustomText>
    )
  }

  renderPostContent = () => {
    const { postData } = this.props
    const { content = '' } = postData || {}
    return (
      <View style={{
        // paddingBottom: 10
      }}>
        <CustomText numberOfLines={4} ellipsizeMode={'tail'} textStyle={styles.contentView}>
          {content}
        </CustomText>
      </View>
    )
  }

  renderPostTimeToReadView = () => {
    const { postData } = this.props
    const attachment = get(postData, 'attachment', {})
    const {
      content,
      image,
      title = ''
    } = attachment
    return (
      <View style={styles.postTime}>
        <View>
          <CustomText textStyle={styles.contentView}>{capitalizeFirstLetterOnly(title)}</CustomText>
          <CustomText textStyle={styles.aboutUser}>2 min read</CustomText>
        </View>
        <View style={styles.rowContainer}>
          <CustomText textStyle={styles.contentView}>Read more</CustomText>
          <IconButtonWrapper
            iconImage={icons.RIGHT_ARROW}
            iconHeight={16}
            iconWidth={16}
            styling={{
              tintColor: colors.black,
              marginLeft: 5
            }}
          />
        </View>
      </View>
    )
  }

  renderIconWithTimeView = () => {
    const { postData } = this.props
    const attachment = get(postData, 'attachment', {})
    const attachmentType = get(attachment, 'type', '')
    if (attachmentType !== POST_TYPES.ARTICLE) {
      return null
    }
    const {
      image = ''
    } = attachment
    log('imageimage', `${BASE_URL}${image}`)
    return (
      <View style={styles.imageContainer}>
        {image.length > 0 && <ImageWithLoaderComponent
          srcImage={`${BASE_URL}${image}`}
          containerStyle={{
            height: 130,
            width: '100%'
          }}
        />}
        {this.renderPostTimeToReadView()}
      </View>
    )
  }

  renderPostInfoView = () => {
    return (
      <View style={styles.postView}>
        {this.renderPostContent()}
        {this.renderIconWithTimeView()}
      </View>
    )
  }

  renderThreeDotsIcon = () => {

  }

  renderDiscussionCommentView = () => {
    const { postData } = this.props
    const { comment_count = 0 } = postData
    const subLabel = comment_count === 1 ? `${comment_count} comment` : `${comment_count} comments`
    return (
      <View style={styles.otherInfo}>
        <CustomText textStyle={[styles.dateView, {
          paddingTop: 0
        }]}>{subLabel}</CustomText>
      </View>
    )
  }

  getButtonStateByType = (key) => {
    const { postData } = this.props
    const { isDiscussionRoomAvailable = false } = postData
    let buttonContainer = {}
    let disabled = false
    switch (key) {
      case FOOTER_KEYS.DISCUSSION:
        if (!isDiscussionRoomAvailable) {
          buttonContainer = {
            opacity: 0.5
          }
          disabled = true
        }
        break
      default:
    }
    return {
      buttonContainerStyle: buttonContainer,
      disabled
    }
  }

  renderFooterItem = (item) => {
    const { key, name, icon } = item
    const { buttonContainerStyle = {}, disabled } = this.getButtonStateByType(key)
    return (
      <TouchableOpacity style={[styles.footerItem, buttonContainerStyle]} disabled = {disabled}>
        <IconButtonWrapper
          iconImage={icon}
          iconHeight={20}
          iconWidth={20}
          styling={{ marginBottom: 3 }}
        />
        <CustomText textStyle={styles.contentView}>
          {name}
        </CustomText>
      </TouchableOpacity>
    )
  }

  renderFooterListView = () => {
    return (
      <View style={styles.footerList}>
        {
          FOOTER_LIST_ITEMS.map((item) => this.renderFooterItem(item))
        }
      </View>
    )
  }

  renderUserDetails = () => {
    return (
      <View style={{
        justifyContent: 'center',
        flex: 1
      }}>
        {this.renderUserName()}
        {this.renderAboutUser()}
        {this.renderDateView()}
      </View>
    )
  }

  renderUserInfoView = () => {
    return (
      <View style={styles.userInfoView}>
        <View style={[styles.rowContainer, { flex: 8, alignItems: 'flex-start' }]}>
          {this.renderRoundedAvtar()}
          {this.renderUserDetails()}
        </View>
        <View style={{
          flex: 2,
          alignItems: 'flex-end'
        }}>
          {this.renderOptionsComponent()}
        </View>
      </View>

    )
  }

  renderCardComponent = () => {
    return (
      <View style={styles.cardContainer}>
        {this.renderUserInfoView()}
        {this.renderPostInfoView()}
        {this.renderDiscussionCommentView()}
        {this.renderFooterListView()}
      </View>
    )
  }

  setToolTipRef = (ref) => {
    this.toolTipRef = ref
  }

  actionOnClickPost = (optionData) => {
    const { onClickPostOption } = this.props
    if (onClickPostOption) {
      onClickPostOption(optionData)
    }
    if (this.toolTipRef) {
      this.toolTipRef.toggleTooltip()
    }
  }

  renderOptionsListComponent = () => {
    const { postData } = this.props
    const  { isPostByLoggedInUser = false } = postData
    log('isPostByLoggedInUserisPostByLoggedInUser', isPostByLoggedInUser)
    return (
      <CommunityOptionsComponent
        optionsList={isPostByLoggedInUser ? OPTIONS_DATA_FOR_SELF_POST : OPTIONS_DATA_FOR_OTHER_POST}
        onClickListItem = {this.actionOnClickPost}
      />
    )
  }

  renderCustomView = () => {
    return (
      <View>
        <IconButtonWrapper
          iconImage={icons.MORE_THREE_DOT}
          iconHeight={24}
          iconWidth={24}
          styling={{
            tintColor: colors.lightBlack
          }}
        />
      </View>
    )
  }

  renderOptionsComponent = () => {
    return (
      <InfoToolTip
        toolTipRef={(ref) => {
          if(ref && !this.toolTipRef) {
            this.setToolTipRef(ref)

          }
        }}
        backgroundColor={colors.white}
        customToolTipView={this.renderOptionsListComponent}
        customView={this.renderCustomView}
        customWidth={120}
        customHeight={200}
        mainViewStyle={{ ...styles.mainViewStyle }}
        useAsDropDownView={true}
        withPointer={false}
        customToolTipViewStyle={{ width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1 }}
      />
    )
  }

  render() {
    return (
      <>
        {this.renderCardComponent()}
      </>
    )
  }
}
