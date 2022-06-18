import { widthToDp } from "./Responsive"

const colors = {
  loader: 'grey',
  black: '#0C0C0C',
  primaryButton: '#FBD63D',
  lightGreyish: '#EFEFEF',
  labelColor: '#989898',
  white: '#FFFFFF',
  grey: '#ececec',
  red: '#FB1010',
  placeholder: '#FBD63D',
  dardBlack: '#000000',
  lightBlack: '#232323',
  darkBlue: '#4D64FA',
  darkGrey: '#707070',
  lightGrey: '#595959',
  drawerBackGroundGray: 'rgba(52, 52, 52, 0.6)',
  green: '#149D52',
  blue: '#0024FF',
  peach: '#F2383A',
  lightBlue: '#0029FF',
}

const fontDimensPer = {
  tenFont: '2.75%',
  twelveFont: '3%',
  fourteenFont: '3.5%',
  fifteenFont: '3.75%',
  sixteenFont: '4%',
  eighteenFont: '4.5%',
  twentyFont: '5%',
  twentyTwoFont: '5.5%',
  twentyFourFont: '6%',
  twentyEightFont: '7%'

}
// 28px means 7%
// 24px means 6%
// 20px means 5%
// 18px means 4.5%
// 16px means 4%
// 14 px means 3.5%
// 12 px means 3%

const textStyles = {
  heading: {
    fontSize: widthToDp(fontDimensPer.twentyFourFont),
    color: colors.lightGreyish,
  },
  infoContainer: {
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    color: colors.lightGreyish,
    textAlign: 'center'
  },
  boldHeading: {
    fontSize: widthToDp(fontDimensPer.twentyFourFont),
    color: colors.black,
    fontWeight: '700'
  },
  boldHeadingWithPopins: {
    fontSize: widthToDp(fontDimensPer.twentyFont),
    color: colors.black,
    fontWeight: '600',
    fontFamily: 'poppins'
  }
}


export {
  colors,
  fontDimensPer,
  textStyles
}