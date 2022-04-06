import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { colors, fontDimens, strings } from '../../common'
import { BASE_URL } from '../../common/constant'
import { icons } from '../../common/icons'
import { CustomText, IconButtonWrapper, UserAvatar } from '../../components'

const PADDING_HORIZONTAL = 10

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  memberLabel: {
    fontSize: fontDimens.extraSmall,
    lineHeight: 12,
    color: colors.lightestGrey
  },
  count: {
    fontSize: fontDimens.small,
    lineHeight: 15,
    color: colors.lightBlack,
    fontWeight: '600'
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.lightBlue
  },
  joinButtonLabel: {
    fontSize: fontDimens.small,
    lineHeight: 15,
    color: colors.white,
    fontWeight: '500'
  },
  knowPhysiographics: {
    fontSize: fontDimens.extraSmall,
    lineHeight: 12,
    color: colors.black,
    fontWeight: '400',
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderColor: colors.black
  },
  aboutLabel: {
    fontSize: fontDimens.medium,
    lineHeight: 18,
    color: colors.black,
    fontWeight: '600',
    paddingBottom: 8
  },
  content: {
    fontSize: fontDimens.extraSmall,
    lineHeight: 12,
    color: colors.black,
    fontWeight: '400'
  },
  avtarContainer: {
    height: 10,
    width: 10,
    justifyContent: 'center',
    marginRight: 10
  },
  withoutImageColor: {
    backgroundColor: '#cccccc'
  },
  spaceBetween: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.grey
  },
  blueDot: {
    height: 5,
    width: 5,
    backgroundColor: colors.lightBlue,
    borderRadius: 5,
    marginHorizontal: 10
  },
  discssionHeading: {
    fontSize: fontDimens.large,
    lineHeight: 20,
    color: colors.white,
    fontWeight: '600',
    paddingBottom: 8
  },
  roundBorder: {
    borderTopLeftRadius: 4,
    backgroundColor: colors.black
  },
  flexEnd: {
    alignItems: 'flex-end'
  }
})

export class DiscussionRoomDetailScreen extends Component {

  renderTotalMembers = () => {
    const { MEMBERS } = strings.DISCUSSION_ROOM_DETAIL_SCREEN
    return (
      <View>
        <CustomText textStyle={styles.memberLabel}>{MEMBERS}</CustomText>
        <View style = {styles.rowContainer}>
          <IconButtonWrapper
            iconImage={icons.ADD_DISCUSSSION}
            iconHeight = {10}
            iconWidth = {10}
          />
          <CustomText textStyle={styles.count}>
          23
          </CustomText>
        </View>
      </View>
    )
  }

  renderTotalMascots = () => {
    const { MASCOTS } = strings.DISCUSSION_ROOM_DETAIL_SCREEN
    return (
      <View>
        <CustomText textStyle={styles.memberLabel}>{MASCOTS}</CustomText>
        <View style = {styles.rowContainer}>
          <IconButtonWrapper
            iconImage={icons.ADD_DISCUSSSION}
            iconHeight = {10}
            iconWidth = {10}
          />
          <CustomText textStyle={styles.count}>
              3
          </CustomText>
        </View>
      </View>
    )
  }

  renderJoinButton = () => {
    const { JOIN } = strings.DISCUSSION_ROOM_DETAIL_SCREEN

    return (
      <TouchableOpacity style = {styles.button}>
        <CustomText textStyle={styles.joinButtonLabel}>
          {JOIN}
        </CustomText>
      </TouchableOpacity>
    )
  }

  renderKnowPhysiographicsButton = () => {
    const { KNOW_PHYSOGRAPHICS } = strings.DISCUSSION_ROOM_DETAIL_SCREEN

    return (
      <View style = {styles.rowContainer}>

        <CustomText textStyle={styles.knowPhysiographics}>
          {KNOW_PHYSOGRAPHICS}
        </CustomText>
        <IconButtonWrapper
          iconImage={icons.RIGHT_ARROW}
          iconHeight = {10}
          iconWidth = {10}
        />
      </View>
    )
  }

  renderAboutContainer = () => {
    const { ABOUT } = strings.DISCUSSION_ROOM_DETAIL_SCREEN

    return (
      <View>
        <CustomText textStyle={styles.aboutLabel}>
          {ABOUT}
        </CustomText>
        <CustomText textStyle={styles.content}>
        I would like to start a discussion on what we can learn from on of the world’s I Lorem ipsum dolor sit amet, sit a consectetur adipiscing elit Lorem ipsum dolor sit amet, sit a consectetur adipiscing elit Lorem ipsum dolor sit read more
        </CustomText>
      </View>
    )
  }

  renderRoundedAvtar = (displayname, picture) => {

    return displayname ? (
      <View style={[styles.avtarContainer]}>
        <UserAvatar
          size={'10'}
          imageStyle={[styles.withoutImageColor, { width: '100%', height: '100%' }]}
          showBorderRadius={true}
          name={displayname.toUpperCase()}
          src={`${BASE_URL}${picture}`}
        />
      </View>
    ) : null
  }

  renderLabel = () => {
    return (
      <View style = {styles.spaceBetween}>
        <View style = {styles.rowContainer}>
          <IconButtonWrapper
            iconImage={icons.ADD_DISCUSSSION}
            iconHeight = {10}
            iconWidth = {10}
          />
          <CustomText textStyle={styles.count}>
          for visionary parents
          </CustomText>
        </View>
        <View style = {styles.rowContainer}>
          {this.renderRoundedAvtar('', '')}
          <CustomText textStyle={styles.count}>
          by Clara Bane
          </CustomText>
        </View>
      </View>
    )
  }

  renderDiscussionLabel = () => {
    return (
      <View style = {[styles.spaceBetween, styles.roundBorder]}>
        <CustomText textStyle={styles.discssionHeading}>
          Learning from Steve Jobs
        </CustomText>
        <View>
          <View style = {styles.blueDot} />
          <CustomText textStyle={{ ...styles.memberLabel, color: colors.white }}>
           3 online
          </CustomText>
        </View>
      </View>
    )
  }

  renderDiscussionRoomImage = () => {
    return (
      <View>
        <IconButtonWrapper
          iconImage={icons.BRICK}
          iconWidth = {'100%'}
          iconHeight = {150}
        />
      </View>
    )
  }

  renderDiscussionRoomCount = () => {
    return (
      <View style = {styles.rowContainer}>
        {this.renderTotalMembers()}
        {this.renderTotalMascots()}
      </View>
    )
  }

  renderRoomStats = () => {
    return (
      <View>
        <View style = {{
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {this.renderDiscussionRoomCount()}
          {this.renderJoinButton()}
        </View>
        <View style = {styles.flexEnd}>
          {this.renderKnowPhysiographicsButton()}
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>
        {this.renderDiscussionRoomImage()}
        {this.renderDiscussionLabel()}
        {this.renderLabel()}
        <ScrollView contentContainerStyle = {{
          paddingHorizontal: PADDING_HORIZONTAL
        }}>
          {this.renderRoomStats()}
          {this.renderAboutContainer()}
        </ScrollView>
      </View>
    )
  }
}
