import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, fontDimensPer, segoeFontTextStyles, strings, textStyles } from '../../common'
import { widthToDp } from '../../common/Responsive'
import { ButtonComponent, LogoComponent } from '../../components'
import { CustomText } from '../../components/CustomText'
import { STACK_NAMES } from '../../navigator'
import { navigateSimple, setInititalStackName } from '../../service'
import { setCompleteWalkThroughPage } from '../../utils/auth-utils'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 100,
    backgroundColor: colors.black
  },
  infoContainer: {
    paddingTop: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoPadding: {
    paddingTop: 40,
    paddingBottom: 70,
  }
})

export const WalkthroughScreen = ({ navigation }) => {

  const renderHeadingComponent = () => {
    const { HEADING, LABEL, BUTTON_NAME } = strings.WALKTROUGH_SCREENS
    return (
      <View style = {styles.infoContainer}>
        <CustomText textStyle={segoeFontTextStyles.twentyTwoNormalGreyish}>{LABEL}</CustomText>
        <CustomText textStyle={{...segoeFontTextStyles.twentyNormalGreyish, ...styles.infoPadding }}>{HEADING}</CustomText>
        <ButtonComponent
          buttonLabel={BUTTON_NAME} onPressButton={() => {
            setCompleteWalkThroughPage()
            setInititalStackName(STACK_NAMES.LOGIN_STACK)
            // navigateSimple(navigation, 'LoginScreen')
          }}        />
      </View>
    )
  }

  return (
    <View style = {styles.mainContainer}>
      <LogoComponent/>
      {renderHeadingComponent()}
    </View>
  )
}
