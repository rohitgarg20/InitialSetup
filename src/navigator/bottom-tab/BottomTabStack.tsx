import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DiscussionRoomListScreen } from '../../screens/discussions/DiscussionRoomListScreen'
import { EventsListScreen } from '../../screens/events/EventsListScreen'
import { HomeScreen } from '../../screens/home/HomeScreen'
import { NudgesScreen } from '../../screens/nudges/NudgesScreen'
import { PreferencesScreen } from '../../screens/preferences/PreferencesScreen'
import { TAB_KEYS } from './TabConstant'
import { BottomTabBarComponent } from '../../components'


const bottomTabBarStack = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false
      }}

      tabBar={props => <BottomTabBarComponent {...props} />}
    >
      <Tab.Screen name={TAB_KEYS.HOME_TAB} component = {HomeScreen} />
      <Tab.Screen name={TAB_KEYS.EVENTS_TAB} component = {EventsListScreen} />
      <Tab.Screen name={TAB_KEYS.NUDGES_TAB} component = {NudgesScreen} />
      <Tab.Screen name={TAB_KEYS.DISCUSSION_TAB} component = {DiscussionRoomListScreen} />
      <Tab.Screen name={TAB_KEYS.PREFERENCES_TAB} component = {PreferencesScreen} />
    </Tab.Navigator>
  )
}

export {
  bottomTabBarStack
}
