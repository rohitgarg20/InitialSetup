import React, { Component } from 'react'
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
import { get } from 'lodash'
import { colors, fontDimens } from '../../common'
import { BASE_URL, FOOTER_LIST_ITEMS, OPTIONS_DATA_FOR_OTHER_POST, POST_TYPES } from '../../common/constant'
import { icons } from '../../common/icons'
import { IPostItem, IUserObj } from '../../store/interfaces'
import { formatDate } from '../../utils/app-utils'
import { CustomText } from '../CustomText'
import { IconButtonWrapper } from '../IconButtonWrapper'
import { UserAvatar } from '../UserAvtar'
import { log } from '../../config'
import { InfoToolTip } from '../InfoToolTip'
import { CommunityOptionsComponent } from '../OptionsListComponent'

const styles = StyleSheet.create({
  withoutImageColor: {
    backgroundColor: '#cccccc'
  },
  nameLabel: {
    fontSize: fontDimens.medium,
    lineHeight: 18,
    color: colors.black
  },
  aboutUser: {
    fontSize: fontDimens.extraSmall,
    lineHeight: 12,
    color: colors.lightBlue,
    // width: '50%'
  },
  dateView: {
    fontSize: fontDimens.extraSmall,
    lineHeight: 12,
    color: colors.labelColor
  },
  contentView: {
    fontSize: fontDimens.small,
    lineHeight: 15,
    color: colors.black,
    fontWeight: '400'
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
    borderColor: colors.borderColor,
    marginTop: 10
  },
  postView: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 5,
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
    borderColor: colors.black,
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
    marginRight: 10
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
  }

})


interface IProps {
  postData: IPostItem
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
        {displayname}
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
        <CustomText numberOfLines={4} ellipsizeMode={'tail'} style={styles.contentView}>
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
          <CustomText textStyle={styles.contentView}>{title}</CustomText>
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
        {image.length > 0 && <IconButtonWrapper
          iconImage={`${BASE_URL}${image}`}
          iconWidth={'100%'}
          iconHeight={130}
          imageResizeMode={'stretch'}
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
        <CustomText textStyle={styles.dateView}>{subLabel}</CustomText>
      </View>
    )
  }

  renderFooterItem = (item) => {
    const { key, name, icon } = item
    return (
      <View style={styles.footerItem}>
        <IconButtonWrapper iconImage={icon} iconHeight={12} iconWidth={15} />
        <CustomText textStyle={styles.contentView}>
          {name}
        </CustomText>
      </View>
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
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        flex: 10,
        paddingLeft: 12
      }}>
        <View style={[styles.rowContainer, { flex: 8 }]}>
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

  renderOptionsListComponent = () => {
    return (
      <CommunityOptionsComponent
        optionsList={OPTIONS_DATA_FOR_OTHER_POST}
      />
    )
  }

  renderCustomView = () => {
    return (
      <View>
        <CustomText>
          123
        </CustomText>
      </View>
    )
  }

  renderOptionsComponent = () => {
    return (
      <InfoToolTip
        toolTipRef={(ref) => {
          if (ref && this.toolTipRef) {
            this.setToolTipRef(ref)
          }
        }}
        backgroundColor={colors.white}
        customToolTipView={this.renderOptionsListComponent}
        customView={this.renderCustomView}
        customWidth={120}
        customHeight={150}
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
