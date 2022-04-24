import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
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
  }

})


export  const apiErrorComponent = ({ onTryAgain}) =>  {

  const renderNeedHelpView = () => {
    const { BUTTON_TEXT } = strings.ERROR_SCREEN
    return (
      <View style = {styles.buttonView}>
        <TouchableOpacity style = {styles.signInButton} onPress = {onTryAgain}>
          <CustomText textStyle={styles.bottomButtonLabel}>{BUTTON_TEXT}</CustomText>
        </TouchableOpacity>
      </View>
    )
  }

  const renderTermsOfUse = () => {
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
    const { MESSAGE, HEADING }  = strings.ERROR_SCREEN
    return (
      <View style = {{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CustomText textStyle={{ ...styles.heading, paddingBottom: 5 }}>{HEADING}</CustomText>
        <CustomText textStyle={styles.heading}>{MESSAGE}</CustomText>
      <View style = {styles.iconContainer}>
        <IconButtonWrapper
          iconImage={icons.UH_OH_ICON}
          iconHeight={20}
          iconWidth={20}
        />
        </View>
        {renderNeedHelpView()}
        {renderTermsOfUse()}
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
            <TouchableOpacity style={styles.backBtn}
          // onPress = {() => goBack(navigation)}
          >
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
        
      {renderTopContainer()}
      {renderFunFactsContainer()}
    </View>
  )
}

export {
  apiErrorComponent as ApiErrorComponent
}
