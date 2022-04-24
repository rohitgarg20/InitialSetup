import React from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, fontDimensPer, strings } from '../common'
import { icons } from '../common/icons'
import { widthToDp } from '../utils/Responsive'
import { CustomText } from './CustomText'
import { IconButtonWrapper } from './IconButtonWrapper'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  maxWidth: {
    maxWidth: widthToDp('40%')
  },
  bottomButtonLabel: {
    color: colors.white,
    // fontSize: fontDimens.normal,
    // lineHeight: 20,
    fontSize:  widthToDp(fontDimensPer.medium),
    // color: colors.white,
    // lineHeight: 18,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular'
  },
  heading: {
    color: colors.black,
    fontWeight: '600',
    fontSize: widthToDp(fontDimensPer.large),
    fontFamily: 'Poppins-SemiBold'
  },
  clickabkeText: {
    borderBottomColor: colors.lightBlue,
    borderBottomWidth: 1
  },
  clickableText: {
    color: colors.lightBlue
  },
  termsAndPolicy: {
    // fontSize: fontDimens.medium,
    // lineHeight: 20,
    fontSize:  widthToDp(fontDimensPer.small),
    fontWeight: '300',
    fontFamily: 'Poppins-Regular'
  },
  signInButton: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView: {
    alignItems: 'center',
    paddingBottom: 20
  },
  buttonLabel: {
    color: colors.white,
    // fontSize: fontDimens.normal,
    lineHeight: 1.5 * widthToDp(fontDimensPer.medium),
    fontSize:  widthToDp(fontDimensPer.medium),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular'
  },
  funFactsContainer: {
    alignItems: 'center',
    paddingBottom: 22

  },
  ffLabel: {
    fontSize:  widthToDp(fontDimensPer.medium),
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    paddingBottom: 6
  },
  ffDesc: {
    fontSize:  widthToDp(fontDimensPer.small),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: colors.lightBlue,
    textAlign: 'center',
    paddingHorizontal: 60
  },
  iconContainer: {
    paddingTop: 10,
    paddingBottom: 20
  },
  subHeading: {
    color: colors.black,
    fontWeight: '400',
    fontSize: widthToDp(fontDimensPer.medium),
    fontFamily: 'Poppins-Regular'
  },

})


export  const screenLoaderComponent = () =>  {


  const renderNeedHelpView = () => {
    const { NEED_HELP } = strings.ERROR_SCREEN

    return (
      <TouchableOpacity style = {styles.clickabkeText} onPress = {() => {
        //
      }}>
        <CustomText textStyle={{...styles.clickableText, ...styles.termsAndPolicy }}>
          {NEED_HELP}
        </CustomText>
      </TouchableOpacity >
    )
  }

  const renderTopContainer = () => {
    const { LOADING, ALMOST_THERE }  = strings.LOADING_SCREEN
    return (
      <View style = {{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CustomText textStyle={{ ...styles.heading, paddingBottom: 5 }}>{LOADING}</CustomText>
      <View style = {styles.iconContainer}>
        <ActivityIndicator
          animating = {true}
          color = {colors.lightBlue}
          size = {'large'}
        />
        </View>
        <CustomText textStyle={{ ...styles.subHeading, paddingBottom: 10 }}>{ALMOST_THERE}</CustomText>

        {renderNeedHelpView()}
      </View>
    )
  }

  const renderFunFactsContainer = () => {
    const { FUN_FACTS, FUN_FACTS_MSG }  = strings.ERROR_SCREEN

    return (
      <View style = {styles.funFactsContainer}>
        <CustomText textStyle={styles.ffLabel}>{FUN_FACTS}</CustomText>
        <CustomText textStyle={styles.ffDesc}>{FUN_FACTS_MSG}</CustomText>
      </View>
    )
  }


  return (
    <View style = {styles.mainContainer}>
      {renderTopContainer()}
      {renderFunFactsContainer()}
    </View>
  )
}

export {
  screenLoaderComponent as ScreenLoaderComponent
}
