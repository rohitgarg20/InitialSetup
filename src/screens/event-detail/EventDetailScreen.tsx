import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View, TouchableOpacity, ScrollView, Text } from 'react-native'
import { colors, fontDimensPer } from '../../common'
import { get, find } from 'lodash'
import { icons } from '../../common/icons'
import { BackButtonComponent, CustomText, IconButtonWrapper, ImageWithLoaderComponent, Loader, LoaderWithApiErrorComponent, UserAvatar, ViewPager } from '../../components'
import { HeaderCardComponent } from '../../components/HeaderCardComponent'
import { eventDetailStore } from '../../store'
import { IEventListItem } from '../../store/interfaces'
import { capitalizeFirstLetterOnly, formatDate, getFormattedTime } from '../../utils/app-utils'
import { BASE_URL } from '../../common/constant'
import { goBack } from '../../service'
import { widthToDp } from '../../utils/Responsive'
import BottomSheet from '@gorhom/bottom-sheet'
import { log } from '../../config'
import { getHeight } from '../../common/scaling'


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
    top: 15,
    left: 0,
    zIndex: 9
  },
  sliderHeadingBg: {
    backgroundColor: colors.black,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
    // left: 0
  },
  networkTitle: {
    color: colors.white,
    fontWeight: '600',
    fontSize: widthToDp(fontDimensPer.extraLarge),
    fontFamily: 'Poppins-SemiBold'
  },
  eventDateTimeContainer: {
    backgroundColor: colors.grey,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  usrProfileWrap: {
    backgroundColor: colors.grey,
    paddingVertical: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 1
  },
  userGrad: {
    fontSize: widthToDp(fontDimensPer.small),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    // fontSize: 10,
    color: colors.black
  },
  registerBtn: {
    backgroundColor: colors.lightBlue,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  eventDetailsContainer: {
    // backgroundColor: colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10
  },
  eventDetailsView: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 25
  },
  eventDetailsInnerView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  eventDetailsHeading: {
    fontSize: widthToDp(fontDimensPer.large),
    color: colors.black,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold'
  },
  eventDescription: {
    fontSize: widthToDp(fontDimensPer.small),
    color: colors.black,
    lineHeight: 16,
    fontWeight: '400',
    fontFamily: 'OpenSans-VariableFont_wdth,wght'
  },
  eventDateRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  eventDateTimeTextStyle: {
    fontSize: widthToDp(fontDimensPer.small),
    // lineHeight: 16,
    fontWeight: '400',
    fontFamily: 'OpenSans-VariableFont_wdth,wght',
    color: colors.black
  },
  participantCounts: {
    fontSize: widthToDp(fontDimensPer.small),
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: colors.black,
    flexWrap: 'wrap'
  },
  userNameStyle: {
    fontSize: widthToDp(fontDimensPer.small),
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: colors.black,
    flexWrap: 'wrap'
  },
  userDescription: {
    // fontSize: 12,
    paddingTop: 13,
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.small),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular'
  },
  registerBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  eventDetailsSubHeading: {
    fontSize: widthToDp(fontDimensPer.large),
    color: colors.black,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    paddingBottom: 10
  },
  eventDetailsDes: {
    fontSize: widthToDp(fontDimensPer.medium),
    fontWeight: '400',
    fontFamily: 'OpenSans-VariableFont_wdth,wght',
    color: colors.black,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avtarContainer: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    marginRight: 5
  },
  withoutImageColor: {
    backgroundColor: '#cccccc'
  },
  registerButtonLabel: {
    fontSize: widthToDp(fontDimensPer.medium),
    color: colors.white,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium'
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20
  }
})

interface IProps {
  route?: any
  navigation?: any
}

interface IState {
  showViewMoreText?: boolean
  containerOnLayoutHeight?: number
  isTextMore?: boolean
}
@observer
export class EventDetailScreen extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      showViewMoreText: false,
      containerOnLayoutHeight: 0,
      isTextMore: false
    }
    eventDetailStore.updateFetchingStatus(true)
  }

  componentDidMount() {
    const { route } = this.props
    eventDetailStore.getInitData(get(route, 'params.id', ''))
  }

  componentWillUnmount() {
    eventDetailStore.init()
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


  renderRoundedAvtar = () => {
    const { eventData } = eventDetailStore
    const { author } = eventData as IEventListItem
    const { picture = '', fullName = '', userName = '' } = author || {}

    return fullName || userName ? (
      <View style={[styles.avtarContainer]}>
        <UserAvatar
          size={'25'}
          imageStyle={[styles.withoutImageColor, { width: '100%', height: '100%' }]}
          showBorderRadius={true}
          name={fullName.toUpperCase() || userName.toUpperCase()}
          src={`${BASE_URL}${picture}`}
        />
      </View>
    ) : null
  }

  renderEventScheduleTime = () => {
    const { eventData } = eventDetailStore
    const { startDate } = eventData as IEventListItem
    return (
      <View style={styles.eventDateRow}>
        <IconButtonWrapper
          iconImage={icons.SCHEDULE_ICON}
          iconHeight={18}
          iconWidth={18}
          styling={{ marginRight: 5 }}
        />
        <CustomText textStyle={styles.eventDateTimeTextStyle}>{getFormattedTime(startDate)} Onwards</CustomText>
      </View>
    )
  }

  renderEventStartDate = () => {
    const { eventData } = eventDetailStore
    const { startDate } = eventData as IEventListItem
    return (
      <View style={styles.eventDateRow}>
        <IconButtonWrapper
          iconImage={icons.CALENDAR_ICON}
          iconHeight={18}
          iconWidth={18}
          styling={{ marginRight: 5 }}
        />
        <CustomText textStyle={styles.eventDateTimeTextStyle}>{formatDate(startDate)}</CustomText>
      </View>
    )
  }

  renderEventImage = () => {
    const { eventData } = eventDetailStore
    const { image } = eventData as IEventListItem
    return (
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
    )
  }

  renderEventName = () => {
    const { eventData } = eventDetailStore
    const { name } = eventData as IEventListItem
    return (
      <View style={{ flex: 1 }}>
        <CustomText numberOfLines={1} ellipsizeMode='tail' textStyle={styles.networkTitle}>{name}</CustomText>
      </View>
    )
  }

  renderBackButton = () => {
    const { navigation } = this.props

    return (
      <TouchableOpacity style={styles.backBtn} onPress={() => goBack(navigation)}>
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
        <CustomText textStyle={{ color: colors.white,   fontSize: widthToDp(fontDimensPer.small),
          fontWeight: '400',
          fontFamily: 'Poppins-Regular' }}>
      back
        </CustomText>
      </TouchableOpacity>
    )
  }

  renderSaveEventImage = () => {
    const { eventData, isFetching, registerEvent, saveCurrentEvent } = eventDetailStore

    return (
      <IconButtonWrapper
        iconImage={icons.SAVE_ICON}
        iconHeight={18}
        iconWidth={18}
        styling={{ tintColor: colors.white, marginLeft: 20 }}
        submitFunction = {saveCurrentEvent}
      />
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

  renderEventDetailComponent = () => {
    const { eventData, isFetching, registerEvent, saveCurrentEvent } = eventDetailStore
    const { containerOnLayoutHeight, isTextMore, showViewMoreText  } = this.state
    const { description } = eventData || {}
    const spaceLeft = (getHeight() * 0.8) - containerOnLayoutHeight
    const numberOfLines = spaceLeft / (widthToDp(fontDimensPer.medium) * 1.45) - 3

    log('spaceLeftspaceLeftspaceLeft', numberOfLines)
    return (
      <View style={styles.eventDetailsContainer}>
        <CustomText textStyle={styles.eventDetailsSubHeading}>About</CustomText>
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

  renderPagerView = () => {
    return (
      <View style={{
        height: '100%',
        width: '100%',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: colors.grey,
        padding: 20,
      }}>
        <ViewPager
          pages={[this.renderLearningValue(), this.renderGrowthValue()]}
          dotContainer = {{
            maxWidth: 40,
            alignSelf: 'center',
            borderRadius: 50,
            backgroundColor: '#C4C4C4',
            paddingHorizontal: 5,
            paddingRight: 0,
            paddingVertical: 5
          }}
          selectedBgColor = {'rgba(255, 255, 255, 0.6)'}
          unSelectedBgColor = {colors.white}
          // onPageChange={this.setSelectedPageIndex}
        />
      </View>
    )
  }

  renderBottomSheet = () => {
    return (
      <BottomSheet
      // ref={bottomSheetRef}
        index={0}
        snapPoints={['20%', getHeight() - 310]}
        enableHandlePanningGesture = {true}
        enableContentPanningGesture = {false}
        enableOverDrag = {true}
        // handleComponent = {({ animatedIndex, animatedPosition }) => {
        //   log('handleComponenthandleComponent', props)
        //   return (
        //     <Text>124</Text>
        //   )
        // }}
      // onChange={handleSheetChanges}
      >
        {this.renderPagerView()}
      </BottomSheet>
    )
  }

  renderLearningValue = () => {
    const { eventData } = eventDetailStore
    const { field_1, description_1  } = eventData as IEventListItem
    const fieldDisplayValue = field_1 || 'Learning Values'
    return (
      <View style={{ paddingBottom: 15 }}>
        <CustomText textStyle={styles.eventDetailsHeading}>{fieldDisplayValue}</CustomText>
        <CustomText textStyle={styles.eventDescription}>{description_1}</CustomText>
      </View>
    )
  }

  renderGrowthValue = () => {
    const { eventData } = eventDetailStore
    const { field_2, description_2  } = eventData as IEventListItem
    const fieldDisplayValue = field_2 || 'Growth Values'
    return (
      <View style={{ paddingBottom: 15 }}>
        <CustomText textStyle={styles.eventDetailsHeading}>{fieldDisplayValue}</CustomText>
        <CustomText textStyle={styles.eventDescription}>{description_2}</CustomText>
      </View>
    )
  }

  renderRegisterButton = () => {
    const { registerEvent, eventData } = eventDetailStore
    const { attendees, uid } = eventData as IEventListItem
    const isUserRegistered = attendees.includes(uid)
    const label = isUserRegistered ? 'Registered' : 'Register'
    return (
      <View style={styles.registerBtnContainer}>
        <TouchableOpacity style={[styles.registerBtn, {
          opacity: isUserRegistered ? 0.5 : 1
        }]} onPress = {registerEvent} disabled = {isUserRegistered}>
          <CustomText textStyle={styles.registerButtonLabel}>
         {label}
          </CustomText>
        </TouchableOpacity>
      </View>
    )
  }

  renderEventDetailView = () => {
    const { eventData } = eventDetailStore
    const { author, startDate, participantCount = 0 } = eventData as IEventListItem
    const { fullName = '' } = author || {}
    const { containerOnLayoutHeight } = this.state
    return (
      <View style = {{
        height: '80%'
      }}>
        <ScrollView contentContainerStyle = {{}}>
          <View style={{ }} onLayout = {(event) => {
            log('renderEventDetailViewrenderEventDetailView', event.nativeEvent.layout.height)
            const containerHeight = event.nativeEvent.layout.height
            if (containerOnLayoutHeight !== containerHeight) {
              this.setState({
                containerOnLayoutHeight: containerHeight
              })
            }
          }}>
            {this.renderBackButton()}
            {this.renderEventImage()}
            <View style={styles.sliderHeadingBg}>
              {this.renderEventName()}
              {this.renderSaveEventImage()}
            </View>
            <View style={styles.eventDateTimeContainer}>
              <View style={styles.eventDateRow}>
                {this.renderRoundedAvtar()}
                <CustomText textStyle={styles.userNameStyle}> by {capitalizeFirstLetterOnly(fullName)}</CustomText>
              </View>
              <View style={styles.eventDateRow}>
                <IconButtonWrapper
                  iconImage={icons.SIGNUP_COUNT}
                  iconHeight={18}
                  iconWidth={18}
                  styling={{ marginRight: 5 }}
                />
                <CustomText textStyle={styles.participantCounts}>{participantCount} Signups</CustomText>
              </View>
            </View>
            <View style = {styles.flexRow}>
              {this.renderEventStartDate()}
              {this.renderEventScheduleTime()}
            </View>
          </View>

          {this.renderEventDetailComponent()}
        </ScrollView>
      </View>
    )
  }

  renderContainerContent = () => {
    const { isFetching, isApiError, onRefetchData } = eventDetailStore
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
        {this.renderEventDetailView()}
        {this.renderBottomSheet()}
        {this.renderRegisterButton()}
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {/* <HeaderCardComponent /> */}
        {this.renderContainerContent()}
      </View>
    )
  }
}
