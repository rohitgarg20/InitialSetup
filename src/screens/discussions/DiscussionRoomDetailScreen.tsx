import { observable } from 'mobx'
import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native'
import { colors, fontDimens, fontDimensPer, strings } from '../../common'
import { get } from 'lodash'
import { BASE_URL } from '../../common/constant'
import { icons } from '../../common/icons'
import { CustomText, IconButtonWrapper, ImageWithLoaderComponent, LoaderWithApiErrorComponent, UserAvatar } from '../../components'
import { discussionRoomDetailStore } from '../../store'
import { observer } from 'mobx-react'
import { IEventListItem, IHighlightedChatItem } from '../../store/interfaces'
import { goBack } from '../../service'
import { capitalizeFirstLetterOnly } from '../../utils/app-utils'
import { widthToDp } from '../../utils/Responsive'
import { getHeight } from '../../common/scaling'
import { log } from '../../config'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { HighlightedChatCardComponent } from '../../components/discussion-detail'

const PADDING_HORIZONTAL = 20

const styles = StyleSheet.create({
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.black,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopRightRadius: 4,
    borderBottomEndRadius: 4,
    position: 'absolute',
    top: 20,
    left: 0,
    zIndex: 9
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  memberLabel: {
    fontSize: fontDimens.extraSmall,
    color: colors.lightestGrey,
    paddingBottom: 5
  },
  count: {
    fontSize: fontDimens.small,
    lineHeight: 15,
    color: colors.lightBlack,
    fontWeight: '600'
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.lightBlue,
    minWidth: 60,
    position: 'absolute',
    right: PADDING_HORIZONTAL,
    bottom: 20
  },
  joinButtonLabel: {
    fontSize: widthToDp(fontDimensPer.medium),
    color: colors.white,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium'
  },
  knowPhysiographics: {
    fontSize: fontDimens.extraSmall,
    color: colors.black,
    fontWeight: '400'
  },
  aboutLabel: {
    fontSize: widthToDp(fontDimensPer.large),
    color: colors.black,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    paddingBottom: 10
  },
  content: {
    fontSize: fontDimens.extraSmall,
    lineHeight: 16,
    color: colors.black,
    fontWeight: '400'
  },
  avtarContainer: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    marginRight: 7
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
    height: 6,
    width: 6,
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
    marginHorizontal: 7
  },
  discssionHeading: {
    fontSize: fontDimens.large,
    color: colors.white,
    fontWeight: '600',
    flex: 1
  },
  roundBorder: {
    borderTopLeftRadius: 4,
    backgroundColor: colors.black
  },
  flexEnd: {
    alignItems: 'flex-end'
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subheadingTitle: {
    fontSize: fontDimens.small,
    color: colors.black
  },
  knowPsychographics: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 3,
    borderBottomColor: colors.black,
    marginTop: 12,
    alignItems: 'center'
  },
  memberContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  onlineTextStyle: {
    fontSize: fontDimens.small,
    color: colors.white
  },
  eventDetailsDes: {
    fontSize: widthToDp(fontDimensPer.medium),
    fontWeight: '400',
    fontFamily: 'OpenSans-VariableFont_wdth,wght',
    color: colors.black
  },
  heading: {
    fontSize: widthToDp(fontDimensPer.medium),
    color: colors.black,
    fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
    paddingBottom: 20,
    paddingTop: 10
  }
})

interface IProps {
  navigation?: any
  route?: any
}

interface IState {
  showViewMoreText?: boolean
  containerOnLayoutHeight?: number
  isTextMore?: boolean
}

@observer
export class DiscussionRoomDetailScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      showViewMoreText: false,
      containerOnLayoutHeight: 0,
      isTextMore: false
    }
    discussionRoomDetailStore.updateFetchingStatus(true)
  }

  componentDidMount() {
    const { route } = this.props
    discussionRoomDetailStore.getInitData(get(route, 'params.id', ''))
  }

  renderTotalMembers = () => {
    const { discussionRoomData } = discussionRoomDetailStore
    const { membersCount } = discussionRoomData as IEventListItem
    const { MEMBERS } = strings.DISCUSSION_ROOM_DETAIL_SCREEN
    return (
      <View style={{ marginRight: 30 }}>
        <CustomText textStyle={styles.memberLabel}>{MEMBERS}</CustomText>
        <View style={styles.rowContainer}>
          <IconButtonWrapper
            iconImage={icons.GROUP_MEMBERS_ICON}
            iconHeight={10}
            iconWidth={20}
            styling={{ marginRight: 7 }}
          />
          <CustomText textStyle={styles.count}>
            {membersCount}
          </CustomText>
        </View>
      </View>
    )
  }

  renderTotalMascots = () => {
    const { MASCOTS } = strings.DISCUSSION_ROOM_DETAIL_SCREEN
    const { discussionRoomData } = discussionRoomDetailStore
    const { mascotsCount } = discussionRoomData as IEventListItem
    return (
      <View>
        <CustomText textStyle={styles.memberLabel}>{MASCOTS}</CustomText>
        <View style={styles.rowContainer}>
          <IconButtonWrapper
            iconImage={icons.GROUP_MEMBERS_ICON}
            iconHeight={10}
            iconWidth={20}
            styling={{ marginRight: 7 }}
          />
          <CustomText textStyle={styles.count}>
            {mascotsCount}
          </CustomText>
        </View>
      </View>
    )
  }

  renderJoinButton = () => {
    const { JOIN } = strings.DISCUSSION_ROOM_DETAIL_SCREEN
    const { joinDiscussionRoom } = discussionRoomDetailStore
    return (
      <TouchableOpacity style={styles.button} onPress = {joinDiscussionRoom}>
        <CustomText textStyle={styles.joinButtonLabel}>
          {JOIN}
        </CustomText>
      </TouchableOpacity>
    )
  }

  renderKnowPhysiographicsButton = () => {
    const { KNOW_PHYSOGRAPHICS } = strings.DISCUSSION_ROOM_DETAIL_SCREEN

    return (
      <View style={styles.knowPsychographics}>
        <CustomText textStyle={styles.knowPhysiographics}>
          {KNOW_PHYSOGRAPHICS}
        </CustomText>
        <IconButtonWrapper
          iconImage={icons.RIGHT_ARROW}
          iconHeight={10}
          iconWidth={10}
          styling={{ tintColor: colors.black, marginLeft: 5 }}
        />
      </View>
    )
  }


  updateMoreTextPresent = (event, maxLinesCanCome) => {
    const numberOfLines = event.nativeEvent.lines.length
    const { isTextMore } = this.state
    if (numberOfLines > maxLinesCanCome && !isTextMore) {
      this.setState({
        isTextMore: true
      })
    }
  }

  toggleNumberOfLines = () => {
    const { showViewMoreText } = this.state
    this.setState({
      showViewMoreText: !showViewMoreText
    })
  }

  renderAboutContainer = () => {
    const { ABOUT } = strings.DISCUSSION_ROOM_DETAIL_SCREEN
    const { discussionRoomData } = discussionRoomDetailStore
    const { containerOnLayoutHeight, isTextMore, showViewMoreText  } = this.state

    const { description } = discussionRoomData as IEventListItem
    const spaceLeft = (getHeight() * 0.8) - containerOnLayoutHeight
    const numberOfLines = spaceLeft / (widthToDp(fontDimensPer.medium) * 1.45) - 3
    log('renderAboutContainerrenderAboutContainer', numberOfLines)
    return (
      <View style = {{
        paddingHorizontal: PADDING_HORIZONTAL,
        paddingVertical: 15
      }}>
        <CustomText textStyle={styles.aboutLabel}>
          {ABOUT}
        </CustomText>
        <View style = {{ }}>
          <CustomText textStyle={styles.eventDetailsDes} onTextLayout = {(event) => {
            this.updateMoreTextPresent(event, numberOfLines)
            log('eventeventeventeventeventeventevent', event )
          }} numberOfLines = {showViewMoreText ? undefined : numberOfLines} ellipsizeMode = {'clip'}>{description}
          </CustomText>
          {
            isTextMore ? <CustomText
              onPress={this.toggleNumberOfLines}
              textStyle={{ lineHeight: 21, color: colors.lightBlue}}>{showViewMoreText ? 'read less...' : 'read more...'}</CustomText>
              : null
          }

        </View>
      </View>
    )
  }

  renderRoundedAvtar = () => {
    const { discussionRoomData } = discussionRoomDetailStore
    const { author } = discussionRoomData as IEventListItem
    const { userName = '', picture, fullName } = author || {}
    return fullName || userName ? (
      <View style={styles.avtarContainer}>
        <UserAvatar
          size={'20'}
          imageStyle={[styles.withoutImageColor, { width: '100%', height: '100%' }]}
          showBorderRadius={true}
          name={fullName.toUpperCase() || userName.toUpperCase()}
          src={`${BASE_URL}${picture}`}
        />
      </View>
    ) : null
  }

  renderLabel = () => {
    const { discussionRoomData } = discussionRoomDetailStore
    const { tagline, author } = discussionRoomData as IEventListItem
    const { userName, fullName } = author || {}
    return (
      <View style={styles.spaceBetween}>
        {/* <View style={styles.rowContainer}>
          <IconButtonWrapper
            iconImage={icons.HUMAN_HEAD_ICON}
            iconHeight={16}
            iconWidth={16}
            styling={{ marginRight: 7 }}
          />
          <CustomText textStyle={styles.subheadingTitle}>
            {tagline}
          </CustomText>
        </View> */}
        <View style={styles.rowContainer}>
          {this.renderRoundedAvtar()}
          <CustomText textStyle={styles.subheadingTitle}>
            by {capitalizeFirstLetterOnly(fullName)}
          </CustomText>
        </View>
      </View>
    )
  }

  renderDiscussionLabel = () => {
    const { discussionRoomData } = discussionRoomDetailStore
    const { name, onlineUsersCount } = discussionRoomData as IEventListItem

    return (
      <View style={[styles.spaceBetween, styles.roundBorder]}>
        <CustomText numberOfLines={1} ellipsizeMode='tail' textStyle={styles.discssionHeading}>
          {name}
        </CustomText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.blueDot} />
          <CustomText textStyle={styles.onlineTextStyle}>
            {onlineUsersCount} online
          </CustomText>
        </View>
      </View>
    )
  }

  renderDiscussionRoomImage = () => {
    const { discussionRoomData } = discussionRoomDetailStore
    const { navigation } = this.props
    const { image } = discussionRoomData as IEventListItem
    return (
      <View style={{ position: 'relative' }}>
        <TouchableOpacity style={styles.backBtn}
          onPress = {() => goBack(navigation)}>
          <IconButtonWrapper
            iconImage={icons.RIGHT_ARROW_ICON}
            iconHeight={10}
            iconWidth={10}
            styling={{
              tintColor: colors.white,
              marginRight: 5,
              transform: [{ rotate: '180deg' }]
            }}
          />
          <CustomText textStyle={{ color: colors.white, fontSize: 12 }}>
            back
          </CustomText>
        </TouchableOpacity>
        <ImageWithLoaderComponent
          // iconImage={icons.NETWORK_ICON}
          containerStyle={{
            height: 300,
            width: '100%'
          }}
          srcImage={`${BASE_URL}${image}`}
        // iconHeight={320}
        // iconWidth={'100%'}
        />
      </View>
    )
  }

  renderDiscussionRoomCount = () => {
    return (
      <View style={styles.rowContainer}>
        {this.renderTotalMembers()}
        {this.renderTotalMascots()}
      </View>
    )
  }

  renderRoomStats = () => {
    return (
      <View style={{ marginVertical: 20 }}>
        <View style={styles.memberContainer}>
          {/* {this.renderDiscussionRoomCount()} */}
          {/* {this.renderJoinButton()} */}
        </View>
        <View style={styles.flexEnd}>
          {this.renderKnowPhysiographicsButton()}
        </View>
      </View>
    )
  }

  renderFetchingView = () => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          animating={true}
          size={'large'}
          color={colors.darkBlue}
        />
      </View>
    )
  }


  renderDetailContentView = () => {
    const { containerOnLayoutHeight } = this.state
    const { highlightedChatList } = discussionRoomDetailStore
    return (
      <View style = {{
        height:  highlightedChatList.length > 0 ? '80%' : '100%',
        backgroundColor: colors.white
      }}>
        <ScrollView >
          <View onLayout = {(event) => {
            log('renderEventDetailViewrenderEventDetailView', event.nativeEvent.layout.height)
            const containerHeight = event.nativeEvent.layout.height
            if (containerOnLayoutHeight !== containerHeight) {
              this.setState({
                containerOnLayoutHeight: containerHeight
              })
            }
          }}>
            {this.renderDiscussionRoomImage()}
            {this.renderDiscussionLabel()}
            {this.renderLabel()}
            {/* {this.renderRoomStats()} */}
          </View>
          {this.renderAboutContainer()}

        </ScrollView>

      </View>
    )
  }

  renderHighlightedChatComponent = ({ item }) => {
    return  (
      <HighlightedChatCardComponent
        chatData={item}/>
    )
  }

  renderItemSeperator = () => {
    return (
      <View style = {{
        paddingBottom: 10
      }}/>
    )
  }

  renderBottomSheetFlatListComponent = () => {
    const { highlightedChatList }  = discussionRoomDetailStore
    log('highlightedChatListhighlightedChatList', highlightedChatList)
    return (
      <BottomSheetFlatList
        data={highlightedChatList as IHighlightedChatItem[]}
        keyExtractor={(item, index) => get(item, '_id', index)}
        renderItem={this.renderHighlightedChatComponent}
        contentContainerStyle = {{
          paddingBottom: 20
        }}
        ItemSeparatorComponent = {this.renderItemSeperator}
        // contentContainerStyle={styles.contentContainer}
      />
    )
  }

  renderBottomSheet = () => {
    return (
      <BottomSheet
        index={0}
        snapPoints={['20%', getHeight() - 310]}
        enableHandlePanningGesture = {true}
        enableContentPanningGesture = {false}
        enableOverDrag = {true}
        style = {{
          backgroundColor: colors.white
        }}
      >
        <View style = {{
          backgroundColor: colors.grey,
          height: '100%',
          paddingLeft: 20,
          paddingRight: 30,
          overflow: 'hidden',
          borderRadius: 10,
        }}>
          <CustomText textStyle={styles.heading}>Chat Preview</CustomText>
        {this.renderBottomSheetFlatListComponent()}
        </View>
      </BottomSheet>
    )
  }

  renderContainerContent = () => {
    const { isFetching, isApiError, onRefetchData } = discussionRoomDetailStore
    if (isFetching || isApiError) {
      return (
        <View style = {{
          flex: 1
        }}>
          <LoaderWithApiErrorComponent
            isFetching = {isFetching}
            isApiError = {isApiError}
            onTryAgain = {onRefetchData}
          />
        </View>
      )
    }


    return (
      <View style = {{
        height: '100%'
      }}>
        {this.renderDetailContentView()}
        {this.renderBottomSheet()}
        {this.renderJoinButton()}
      </View>
    )

  }

  render() {
    return (
      <>
        {this.renderContainerContent()}
      </>
    )
  }
}
