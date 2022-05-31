import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, fontDimensPer, icons, segoeFontTextStyles, strings } from '../../common'
import { CARD_SEPERATOR, CATEGORIES_LIST, CATEGRIES_KEYS } from '../../common/constant'
import { IHomeCategoryData } from '../../common/Interfaces'
import { widthToDp } from '../../common/Responsive'
import { ContainerDataComponent, HeaderComponent, IconButtonWrapper, RoundedBorderContainerComponent } from '../../components'
import { CustomText } from '../../components/CustomText'
import { navigateSimple } from '../../service'
import { logoutHandler, logoutTransitionPopup } from '../../service/LogoutService'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryButton
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  heading: {
    width: '70%',
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    color: colors.black,
    paddingLeft: 20
  },
  widthContainer: {
    width: '30%'
  },
  withEqualSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardContainer: {
    paddingTop: CARD_SEPERATOR
  },
  categoryLabel: {
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    color: colors.lightGreyish,
    paddingBottom: 10
  },
  logoutIconContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    height: '100%'
  }
})
const { HEADING, CATEGORIES_LABEL, SOCIETY_DETAIL } = strings.HOME_SCREEN

const homeScreen = ({ navigation }) => {

  const renderLogoutView = () => {
    return  (
      <View style = {styles.logoutIconContainer}>
        <IconButtonWrapper
          iconImage={icons.LOGOUT}
          iconHeight = {40}
          iconWidth = {40}
          imageResizeMode = {'contain'}
          submitFunction = {logoutTransitionPopup}
          styling = {{
            // tintColor: colors.lightGrey
          }}
        />
    </View>
    )
  }

  const renderHeaderSection = () => {
    return (

      <HeaderComponent
        headerLabel={SOCIETY_DETAIL}
        hideBackButton = {true}
        customizedView = {renderLogoutView}
        customHeadingStyle = {{
          left: 0
        }}
      />
    )
  }

  const renderFixedHeaderComponent = () => {
    return (
      <RoundedBorderContainerComponent>
        <View style = {styles.rowContainer}>
          <View style = {styles.widthContainer}>
            <IconButtonWrapper
              iconImage={icons.HOME_DUMMY_ICON}
              iconHeight = {120}
              iconWidth = {'100%'}
              imageResizeMode = {'contain'}
            />
          </View>
          <CustomText textStyle= {styles.heading}>{HEADING}</CustomText>
        </View>
      </RoundedBorderContainerComponent>
    )
  }

  const onPressCard = (cardId) => {
    switch (cardId) {
      case CATEGRIES_KEYS.COMPLAINT:
        navigateSimple(navigation, 'ComplainListScreen')
        break
      default:
    }
  }

  const renderCategoriesContainer = () => {
    return (
      <View style = {styles.cardContainer}>
        <CustomText textStyle={styles.categoryLabel}>{CATEGORIES_LABEL}</CustomText>
        <RoundedBorderContainerComponent>
          <View style = {styles.withEqualSpace}>
            {
              CATEGORIES_LIST.map((category) => {
                const {  key, displayLabel, icon } = category as IHomeCategoryData
                return (
                  <TouchableOpacity onPress={() => onPressCard(key)}>
                    <IconButtonWrapper iconImage={icon}
                      iconHeight = {40}
                      iconWidth = {40}/>
                    <CustomText textStyle={{ ...segoeFontTextStyles.sixteenNormalBlack }}>{displayLabel}</CustomText>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </RoundedBorderContainerComponent>
      </View>
    )
  }

  const renderMainContainer = () => {
    return (
      <ScrollView>
        {renderCategoriesContainer()}
      </ScrollView>
    )
  }

  return (
    <View style = {styles.container}>
      {renderHeaderSection()}
      <ContainerDataComponent
        fixedHeaderComponent={renderFixedHeaderComponent}
        renderContainerComponent = {renderMainContainer}
      />
    </View>
  )
}

export {
  homeScreen as HomeScreen
}
