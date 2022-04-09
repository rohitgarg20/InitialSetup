import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../../common'
import { icons } from '../../common/icons'
import { BackButtonComponent, CustomText, IconButtonWrapper } from '../../components'
import { HeaderCardComponent } from '../../components/HeaderCardComponent'


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
  }
})
export class EventListingFinal extends Component {

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <HeaderCardComponent />
        <ScrollView>
          <View style={{ marginTop: -5, position: 'relative' }}>
            <View style={styles.backBtn}>
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
            </View>
            <IconButtonWrapper
              iconImage={icons.NETWORK_ICON}
              iconHeight={320}
              iconWidth={'100%'}
            />
            <View style={styles.sliderHeadingBg}>
              <View>
                <CustomText textStyle={styles.networkTitle}>Neural Networks</CustomText>
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
              <CustomText textStyle={styles.eventDateTimeTextStyle}>Sat, May 21, 2022</CustomText>
            </View>
            <View style={styles.eventDateRow}>
              <IconButtonWrapper
                iconImage={icons.SCHEDULE_ICON}
                iconHeight={18}
                iconWidth={18}
                styling={{ marginRight: 5 }}
              />
              <CustomText textStyle={styles.eventDateTimeTextStyle}>03:00 PM - 06:00 PM</CustomText>
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
                <CustomText textStyle={styles.eventDetailsHeading}>Learning Value</CustomText>
                <CustomText textStyle={styles.eventDescription}>Lorem ipsum dolor sit amet, sit a consectetur adipiscing elit</CustomText>
                <CustomText textStyle={styles.eventDescription}>Lorem ipsum dolor sit amet, sit a consectetur adipiscing elit</CustomText>
              </View>
              <View>
                <CustomText textStyle={styles.eventDetailsHeading}>Learning Value</CustomText>
                <CustomText textStyle={styles.eventDescription}>Lorem ipsum dolor sit amet, sit a consectetur adipiscing elit</CustomText>
                <CustomText textStyle={styles.eventDescription}>Lorem ipsum dolor sit amet, sit a consectetur adipiscing elit</CustomText>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.usrProfileWrap}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <IconButtonWrapper
                    iconImage={icons.DAFAULT_ICON}
                    iconHeight={50}
                    iconWidth={50}
                    styling={{ marginRight: 10 }}
                  />
                  <View style={{ flex: 1 }}>
                    <CustomText textStyle={styles.userNameStyle}>Chad Pitt</CustomText>
                    <CustomText textStyle={styles.userGrad}>Young Researcher</CustomText>
                    <CustomText textStyle={styles.userGrad}>Grade VI</CustomText>
                  </View>

                </View>
                <CustomText textStyle={styles.userDescription}>
                  Lorem ipsum dolor sit amet, sit a  consectetur adipiscing elit
                  Lorem ipsum dolor sit amet, sit a know more
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
            <CustomText textStyle={styles.eventDetailsDes}>Lorem ipsum dolor sit amet, sit a consectetur adipiscing elit Lorem ipmos...</CustomText>
          </View>
        </ScrollView>
      </View>
    )
  }
}
