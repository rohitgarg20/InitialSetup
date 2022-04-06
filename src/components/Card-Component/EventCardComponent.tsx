import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, fontDimens, strings } from '../../common'
import { BASE_URL, CARD_HEIGHT, POST_TYPES, USER_STATUS } from '../../common/constant'
import { icons } from '../../common/icons'
import { formatDate } from '../../utils/app-utils'
import { CustomText } from '../CustomText'
import { IconButtonWrapper } from '../IconButtonWrapper'
import { ImageWithLoaderComponent } from '../ImageWithLoaderComponent'


const styles = StyleSheet.create({
  cardContainer: {
    height: CARD_HEIGHT,
    paddingVertical: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    backgroundColor: colors.white
    // flex: 10
  },
  iconContainer: {
    flex: 2,
    height: '100%',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: colors.labelColor
  },
  contentContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: colors.white
  },
  arrowContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  arrowBorder: {
    height: 50,
    width: 36,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameText: {
    fontSize: fontDimens.medium,
    lineHeight: 18,
    fontWeight: '600',
    color: colors.black
  },
  tagLine: {
    fontSize: fontDimens.extraSmall,
    lineHeight: 12,
    fontWeight: '400',
    color: colors.black
  },
  date: {
    fontSize: fontDimens.extraSmall,
    lineHeight: 12,
    fontWeight: '400',
    color: colors.lightBlue
  },
  description: {
    fontSize: fontDimens.small,
    lineHeight: 14,
    fontWeight: '400',
    color: colors.black
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 6,
    paddingLeft: 10

  }
})

interface IProps {
  imageUrl: string
  name: string
  tagline: string
  description: string
  startDate: Date
  authorName?: string
  status?: string
  lastActiveTime?: string
  category?: string
}

export class EventCardComponent extends PureComponent<IProps> {

  renderIconContainer = () => {
    const { imageUrl } = this.props
    return (
      <View style={styles.iconContainer}>
        <ImageWithLoaderComponent
          srcImage={`${BASE_URL}${imageUrl}`}
        />
      </View>
    )
  }


  renderContentContainer = () => {
    const { name, tagline, description, startDate, category, authorName } = this.props
    const subLabel = category === POST_TYPES.DISCUSSION_ROOM ? `by ${authorName}` : formatDate(startDate)
    return (
      <View style={styles.rowContainer}>
        <View style={styles.contentContainer}>
          <View>
            <CustomText textStyle={styles.nameText} numberOfLines={1} ellipsizeMode={'tail'}>{name}</CustomText>
            <CustomText textStyle={styles.tagLine} numberOfLines={2} ellipsizeMode={'tail'}>{tagline}</CustomText>
            <CustomText textStyle={styles.date}>{subLabel}</CustomText>
          </View>
          <View>
            <CustomText numberOfLines={3} ellipsizeMode={'tail'} textStyle={styles.description}>
              {description}
            </CustomText>
          </View>
        </View>
        {this.renderUserStatus()}
      </View>
    )
  }

  renderArrowContainer = () => {
    return (
      <View style={styles.arrowContainer}>
        <View style={styles.arrowBorder}>
          <IconButtonWrapper
            iconImage={icons.RIGHT_ARROW_ICON}
            iconHeight={16}
            iconWidth={16}
          />
        </View>

      </View>
    )
  }

  renderUserStatus = () => {
    const { lastActiveTime, status = '' } = this.props
    if (status.length === 0) {
      return null
    }
    if (status !== USER_STATUS.ONLINE) {
      return (
        <View>
          <View />
          <CustomText>{strings.USER_ACTIVE}</CustomText>
        </View>
      )
    }
    return (
      <View>
        <CustomText>{strings.USER_LAST_ACTIVE}</CustomText>
        <CustomText>{lastActiveTime}</CustomText>
      </View>
    )
  }

  renderEventCard = () => {
    return (
      <View style={styles.cardContainer} >
        {this.renderIconContainer()}
        {this.renderContentContainer()}
        {this.renderArrowContainer()}
      </View>
    )
  }


  render() {
    return (
      <>
        {this.renderEventCard()}
      </>
    )
  }
}
