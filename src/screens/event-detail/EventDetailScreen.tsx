import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { colors } from '../../common'
import { get } from 'lodash'
import { icons } from '../../common/icons'
import { BackButtonComponent, CustomText, IconButtonWrapper, ImageWithLoaderComponent, Loader, UserAvatar } from '../../components'
import { HeaderCardComponent } from '../../components/HeaderCardComponent'
import { eventDetailStore } from '../../store'
import { IEventListItem } from '../../store/interfaces'
import { formatDate, getFormattedTime } from '../../utils/app-utils'
import { BASE_URL } from '../../common/constant'
import { goBack } from '../../service'


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
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  networkTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600'
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
    fontSize: 10,
    color: colors.black
  },
  registerBtn: {
    backgroundColor: colors.lightBlue,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  eventDetailsContainer: {
    backgroundColor: colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    fontSize: 14,
    color: colors.black,
    fontWeight: '600'
  },
  eventDescription: {
    fontSize: 12,
    color: colors.black,
    lineHeight: 16
  },
  eventDateRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  eventDateTimeTextStyle: {
    fontSize: 10,
    color: colors.black
  },
  userNameStyle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.lightBlue,
    flexWrap: 'wrap'
  },
  userDescription: {
    fontSize: 12,
    paddingTop: 13,
    color: colors.black
  },
  registerBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15
  },
  eventDetailsSubHeading: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.black
  },
  eventDetailsDes: {
    fontSize: 12,
    color: colors.black,
    lineHeight: 16
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avtarContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    marginRight: 5
  },
  withoutImageColor: {
    backgroundColor: '#cccccc'
  },
})

interface IProps {
  route?: any
  navigation?: any
}
@observer
export class EventDetailScreen extends Component<IProps> {

  constructor(props: IProps) {
    super(props)
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
      <View style = {styles.loaderContainer}>
        <ActivityIndicator
          animating = {true}
          size={'large'}
          color={colors.darkBlue}
        />
      </View>
    )
  }


  renderRoundedAvtar = () => {
    const { eventData } = eventDetailStore
    const {  author } = eventData as IEventListItem
    const { picture = '', userName } = author || {}

    return userName ? (
      <View style={[styles.avtarContainer]}>
        <UserAvatar
          size={'45'}
          imageStyle={[styles.withoutImageColor, { width: '100%', height: '100%' }]}
          showBorderRadius={true}
          name={userName.toUpperCase()}
          src={`${BASE_URL}${picture}`}
        />
      </View>
    ) : null
  }

  render() {
    const { navigation } = this.props
    const { eventData, isFetching } = eventDetailStore
    const { name = '', field_1 = '', description_1 = '', field_2 = '', description_2 = '', description = '', author, startDate, image  } = eventData as IEventListItem
    const { picture = '', signature, aboutme, userName } = author || {}
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {/* <HeaderCardComponent /> */}
        { isFetching ? this.renderFetchingView() : (
          <ScrollView>
            <View style={{ marginTop: -5, position: 'relative' }}>
              <TouchableOpacity style={styles.backBtn} onPress = {() => goBack(navigation)}>
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
                containerStyle = {{
                  height: 320,
                  width: '100%'
                }}
                srcImage={`${BASE_URL}${image}`}
              // iconHeight={320}
              // iconWidth={'100%'}
              />
              <View style={styles.sliderHeadingBg}>
                <View>
                  <CustomText textStyle={styles.networkTitle}>{name}</CustomText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <IconButtonWrapper
                    iconImage={icons.FILTER_ICON}
                    iconHeight={20}
                    iconWidth={20}
                    styling={{ tintColor: colors.white }}
                  />
                  <IconButtonWrapper
                    iconImage={icons.SAVE_ICON}
                    iconHeight={18}
                    iconWidth={18}
                    styling={{ tintColor: colors.white, marginLeft: 20 }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.eventDateTimeContainer}>
              <View style={styles.eventDateRow}>
                <IconButtonWrapper
                  iconImage={icons.CALENDAR_ICON}
                  iconHeight={18}
                  iconWidth={18}
                  styling={{ marginRight: 5 }}
                />
                <CustomText textStyle={styles.eventDateTimeTextStyle}>{formatDate(startDate)}</CustomText>
              </View>
              <View style={styles.eventDateRow}>
                <IconButtonWrapper
                  iconImage={icons.SCHEDULE_ICON}
                  iconHeight={18}
                  iconWidth={18}
                  styling={{ marginRight: 5 }}
                />
                <CustomText textStyle={styles.eventDateTimeTextStyle}>{getFormattedTime(startDate)} Onwards</CustomText>
              </View>
              <View style={styles.eventDateRow}>
                <IconButtonWrapper
                  iconImage={icons.DAFAULT_ICON}
                  iconHeight={20}
                  iconWidth={20}
                  styling={{ marginRight: 5 }}
                />
                <CustomText textStyle={styles.eventDateTimeTextStyle}>+10 signups</CustomText>
              </View>
            </View>
            <View style={styles.eventDetailsView}>
              <View style={styles.eventDetailsInnerView}>
                <View style={{ paddingBottom: 15 }}>
                  <CustomText textStyle={styles.eventDetailsHeading}>{field_1}</CustomText>
                  <CustomText textStyle={styles.eventDescription}>{description_1}</CustomText>
                </View>
                <View>
                  <CustomText textStyle={styles.eventDetailsHeading}>{field_2}</CustomText>
                  <CustomText textStyle={styles.eventDescription}>{description_2}</CustomText>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.usrProfileWrap}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    {this.renderRoundedAvtar()}
                    <View style={{ flex: 1 }}>
                      <CustomText textStyle={styles.userNameStyle}>{userName}</CustomText>
                      <CustomText textStyle={styles.userGrad}>{signature}</CustomText>
                    </View>

                  </View>
                  <CustomText textStyle={styles.userDescription}>
                    {aboutme}
                  </CustomText>


                </View>
                <View style={styles.registerBtnContainer}>
                  <TouchableOpacity style={styles.registerBtn}>
                    <CustomText textStyle={{ color: colors.white, fontSize: 12 }}>
                    Register
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.eventDetailsContainer}>
              <CustomText textStyle={styles.eventDetailsSubHeading}>Event Details</CustomText>
              <CustomText textStyle={styles.eventDetailsDes}>{description}</CustomText>
            </View>
          </ScrollView>
        )}
      </View>
    )
  }
}
