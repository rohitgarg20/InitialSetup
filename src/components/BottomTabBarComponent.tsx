import React, { useCallback, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { get, map } from 'lodash'
import { CustomText } from './CustomText'
import { IconButtonWrapper } from './IconButtonWrapper'
import { navigationDataStore } from '../store'
import { MAIN_STACK_KEYS, TAB_KEYS } from '../common/constant'
import { colors, fontDimensPer } from '../common'
import { icons } from '../common/icons'
import { log } from '../config'
import { widthToDp } from '../common/Responsive'

const styles = StyleSheet.create({
  mainContainer: {
    // paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.lightBlack,
    borderTopWidth: 1,
    borderTopColor: colors.black,
    alignItems: 'center'
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
})

const TAB_BAR_KEY: Map<string, any> = new Map([
  [TAB_KEYS.HOME_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.HOME_STACK,
    NORMAL_ICON: icons.HOME_TAB,
    DISPLAY_NAME: 'Home',
    activeTintColor: colors.primaryButton
  }],
  [TAB_KEYS.ACTIVITY_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.ACTIVITY_STACK,
    NORMAL_ICON: icons.ACTIVITY_TAB,
    DISPLAY_NAME: 'Activity',
    activeTintColor: colors.primaryButton
  }],
  [TAB_KEYS.ADD_MORE_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.ADD_MORE_STACK,
    NORMAL_ICON: icons.ADD_MORE_TAB,
    DISPLAY_NAME: '',
    iconConfig: {
      iconHeight: 40,
      iconWidth: 40
    }
  }],
  [TAB_KEYS.STAFF_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.STAFF_STACK,
    NORMAL_ICON: icons.STAFF_TAB,
    DISPLAY_NAME: 'Staff',
    activeTintColor: colors.primaryButton
  }],
  [TAB_KEYS.CHAT_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.CHAT_STACK,
    NORMAL_ICON: icons.CHAT_TAB,
    // DISPLAY_NAME: 'Chat',
    DISPLAY_NAME: 'Profile',
    activeTintColor: colors.primaryButton
  }]
])

const bottomTabBarComponent = ({ state, descriptors, navigation, insets }) => {

  const onPressTabItem = (stackName, tabName) => {
      navigationDataStore.setActiveTabName(stackName)
      navigation.navigate(tabName)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    navigationDataStore.setActiveTabName(MAIN_STACK_KEYS.HOME_STACK)
  }, [])

  useEffect(() => {
    const { index, routeNames = [] } = state || {}
    const activeTabName = get(routeNames, `${index}`, 0)
    const { STACK_NAME } = TAB_BAR_KEY.get(activeTabName)
    navigationDataStore.setActiveTabName(STACK_NAME)
  }, [state])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getActiveTabIndex = useCallback(() => {
    return state.index
  }, [state.index])

  const renderTabItem = (routeName, index) => {

    const { STACK_NAME, NORMAL_ICON, DISPLAY_NAME, iconConfig = {}, activeTintColor } = TAB_BAR_KEY.get(routeName)
    const { iconHeight = 20, iconWidth = 20 } = iconConfig
    log('getActiveTabIndexgetActiveTabIndex', getActiveTabIndex())
    const isTabActive = getActiveTabIndex() === index
    let activeIconStyle = {
      // tintColor: colors.white
    }
    let textStyle = {
      color: colors.white,
      paddingVertical: 5,
      fontWeight: '500',
      fontFamily: 'Poppins-Medium'
    }
    if (isTabActive && activeTintColor) {
      activeIconStyle = {
        tintColor: activeTintColor
      }
      textStyle = {
        color: colors.primaryButton,
        paddingVertical: 5,
        fontWeight: '500',
        fontFamily: 'Poppins-Medium'
      }
    }

    return (
      <TouchableOpacity onPress={() => onPressTabItem(STACK_NAME, routeName)} style = {{
        width: '20%',
        // justifyContent: 'center',
        alignItems: 'center'
      }}>
        <IconButtonWrapper
          iconImage={NORMAL_ICON}
          iconHeight={iconHeight}
          iconWidth={iconWidth}
          styling={activeIconStyle}
        />
        <CustomText textStyle={{...textStyle, fontSize: widthToDp(fontDimensPer.twelveFont) }}>
          {DISPLAY_NAME}
        </CustomText>
      </TouchableOpacity>
    )
  }

  const renderBottomTabBar = () => {
    const routeNames = get(state, 'routes', [])
    return <View style={styles.tabBarContainer}>
      {map(routeNames, (routeItem, index) => {
        const { name, key } = routeItem
        return renderTabItem(name, index)
      })}
    </View>

  }

  return (
    <View style={styles.mainContainer}>
      {renderBottomTabBar()}
    </View>
  )
}

export {
  bottomTabBarComponent as BottomTabBarComponent
}
