import { StyleSheet } from 'react-native'
import { colors, fontDimensPer } from './config'
import { widthToDp } from './Resposive'

const styles = StyleSheet.create({
  yellowBottomBorder: {
    paddingLeft: '5%',
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderColor: colors.primaryButton,
    height: 'auto'
  },
  rowWithVerticalCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowWithHorizontalCenter: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  columnWithHorizontalCenter: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  fullBlackContainer: {
    flex: 1,
    backgroundColor: colors.black
  },
  verticalCenter: {
    flex: 1,
    justifyContent: 'center'
  },
  verticalEquallySpaced: {
    flex: 1,
    justifyContent: 'space-between'
  },
  textHorizontalCenter: {
    textAlign: 'center'
  },
  errorMessage: {
    paddingVertical: 0,
    paddingBottom: 0
  },
  flexStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rowWithEqualSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flexColumnWithStretch: {
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%'
    // justifyContent: 'space-between'
  },
  textLeftAlign: {
    textAlign: 'left'
  },
  textRightAlign: {
    textAlign: 'right'
  },
  flexContainer: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'row',
  },
  roundedBorderTenRadius: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.black
  }

})


const segoeFontTextStyles = StyleSheet.create({
  twentyEightNormalGreyish: {
    color: colors.lightGreyish,
    fontSize: widthToDp(fontDimensPer.twentyEightFont),
    fontWeight: '400',
    textAlign: 'center',
    left:  0,
    fontFamily: 'Segoe-UI'
  },
  twentyFourNormalGreyish: {
    color: colors.lightGreyish,
    fontSize: widthToDp(fontDimensPer.twentyFourFont),
    fontWeight: '400',
    fontFamily: 'Segoe-UI',
    left:  0,
  },
  twentyTwoNormalGreyish: {
    color: colors.lightGreyish,
    fontSize: widthToDp(fontDimensPer.twentyTwoFont),
    fontWeight: '400',
    fontFamily: 'Segoe-UI',
    left:  0,
  },
  twentyNormalGreyish: {
    color: colors.lightGreyish,
    fontSize: widthToDp(fontDimensPer.twentyFont),
    fontWeight: '400',
    textAlign: 'center',
    left:  0,
    fontFamily: 'Segoe-UI'
  },
  twentyNormalBlack: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.twentyFont),
    fontWeight: '400',
    textAlign: 'center',
    left:  0,
    fontFamily: 'Segoe-UI'
  },
  eighteenNormalGreyish: {
    color: colors.lightGreyish,
    fontSize: widthToDp(fontDimensPer.eighteenFont),
    fontWeight: '400',
    textAlign: 'center',
    left:  0,
    fontFamily: 'Segoe-UI'
  },
  eighteenNormalBlack: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.eighteenFont),
    fontWeight: '400',
    textAlign: 'center',
    left:  0,
    fontFamily: 'Segoe-UI'
  },
  sixteenNormalGreyish: {
    color: colors.lightGreyish,
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    fontWeight: '400',
    textAlign: 'center',
    left:  0,
    fontFamily: 'Segoe-UI'
  },
  sixteenNormalBlack: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    fontWeight: '400',
    textAlign: 'center',
    left:  0,
    fontFamily: 'Segoe-UI'
  },
  extraLargeHeadingWithNormalWeight: {
    color: colors.lightGreyish,
    fontSize: widthToDp(fontDimensPer.twentyFont),
    fontWeight: '400',
    textAlign: 'left',
    left:  0,
    fontFamily: 'Segoe-UI'
  },
  extraLargeHeadingWithBoldWeight: {
    color: colors.white,
    fontSize: widthToDp(fontDimensPer.twentyFont),
    fontWeight: '700',
    textAlign: 'left',
    left:  0,
    fontFamily: 'SegoeUI-Bold'
  },
  extraLargeHeadingWithBlackNormalWeight: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.twentyFont),
    fontWeight: '400',
    fontFamily: 'Segoe-UI'
  },
  largeWithNormalWeight: {
    color: colors.lightGreyish,
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    fontWeight: '400',
    fontFamily: 'Segoe-UI'
  },
  largeWithBlackNormalWeight: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    fontWeight: '400',
    fontFamily: 'Segoe-UI'
  },
  eighteenBlackBoldWeight: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.eighteenFont),
    fontWeight: '800',
    fontFamily: 'SegoeUI-Bold'
  },
  mediumWithNormalWeight: {
    color: colors.lightGreyish,
    fontSize: widthToDp(fontDimensPer.fourteenFont),
    fontWeight: '400',
    fontFamily: 'Segoe-UI'
  },
})

const popinsTextStyle = StyleSheet.create({
  sixteenSemiBoldBlack: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    fontWeight: '700',
    fontFamily: 'Poppins-SemiBold'
  },
  fourteenNormalBlack: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.fourteenFont),
    fontWeight: '500',
    fontFamily: 'Poppins-Regular'
  },
  eighteenNormalBlack: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.eighteenFont),
    fontWeight: '500',
    fontFamily: 'Poppins-Regular'
  },
  eighteenSemiBoldBlack: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.eighteenFont),
    fontWeight: '700',
    fontFamily: 'Poppins-Regular'
  },
  twentyNormalBlack: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.twentyFont),
    fontWeight: '500',
    fontFamily: 'Poppins-Regular'
  },
  eitheenNormalWhite: {
    color: colors.white,
    fontSize: widthToDp(fontDimensPer.eighteenFont),
    fontWeight: '500',
    fontFamily: 'Poppins-Regular'
  },
  eighteenBoldBlack: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.eighteenFont),
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold'
  },
  tenWithDarkGrey: {
    color: colors.darkGrey,
    fontSize: widthToDp(fontDimensPer.tenFont),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular'
  },
  thirtyBoldBlack: {
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.thirtyFont),
    fontWeight: '700',
    fontFamily: 'Poppins-SemiBold'
  }
})



export {
  styles as commonStyles,
  segoeFontTextStyles,
  popinsTextStyle
}