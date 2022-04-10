import React, { useCallback, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { get, map } from 'lodash'
import { CustomText } from './CustomText'
import { IconButtonWrapper } from './IconButtonWrapper'
import { genericDrawerStore, navigationDataStore } from '../store'
import { MAIN_STACK_KEYS } from '../common/constant'
import { colors } from '../common'
import { TAB_KEYS } from '../navigator/bottom-tab/TabConstant'
import { icons } from '../common/icons'
import { log } from '../config'
import { DrawerActions } from '@react-navigation/native'
import { PreferencesScreen } from '../screens/preferences/PreferencesScreen'

const styles = StyleSheet.create({
  mainContainer: {
    // paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grey,
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
    NORMAL_ICON: icons.HOME
  }],
  [TAB_KEYS.EVENTS_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.EVENTS_STACK,
    NORMAL_ICON: icons.EVENTS
  }],
  [TAB_KEYS.NUDGES_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.NUDGES_STACK,
    NORMAL_ICON: icons.NUDGES
  }],
  [TAB_KEYS.PREFERENCES_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.PREFERNCES_STACK,
    NORMAL_ICON: icons.PREFERNCES
  }],
  [TAB_KEYS.DISCUSSION_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.DISCUSSION_STACK,
    NORMAL_ICON: icons.DISCUSSION
  }]
])

const bottomTabBarComponent = ({ state, descriptors, navigation, insets }) => {

  const onPressTabItem = (stackName, tabName) => {
    if (tabName === TAB_KEYS.PREFERENCES_TAB) {
      genericDrawerStore.enableDrawer()
      genericDrawerStore.setRenderingComponent(<PreferencesScreen navigation={navigation}/>)
    } else {
      navigationDataStore.setActiveTabName(stackName)
      navigation.navigate(tabName)
    }

  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    navigationDataStore.setActiveTabName(MAIN_STACK_KEYS.HOME_STACK)
  }, [])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getActiveTabIndex = useCallback(() => {
    return state.index
  }, [state.index])

  const renderTabItem = (routeName, index) => {

    const { STACK_NAME, NORMAL_ICON } = TAB_BAR_KEY.get(routeName)
    log('getActiveTabIndexgetActiveTabIndex', getActiveTabIndex())
    const isTabActive = getActiveTabIndex() === index
    let activeIconStyle = {
      tintColor: colors.black
    }
    let textStyle = {
      color: colors.black,
      paddingVertical: 5
    }
    if (isTabActive) {
      activeIconStyle = {
        tintColor: colors.lightBlue
      }
      textStyle = {
        color: colors.lightBlue,
        paddingVertical: 5
      }
    }

    return (
      <TouchableOpacity onPress={() => onPressTabItem(STACK_NAME, routeName)} style = {{
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <IconButtonWrapper
          iconImage={NORMAL_ICON}
          iconHeight={24}
          iconWidth={24}
          styling={activeIconStyle}
        />
        <CustomText textStyle={{...textStyle, fontSize: 10 }}>
          {routeName}
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
