import React, { lazy } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DiscussionRoomListScreen } from '../../screens/discussions/DiscussionRoomListScreen'
import { EventsListScreen } from '../../screens/events/EventsListScreen'
import { HomeScreen } from '../../screens/home/HomeScreen'
import { NudgesScreen } from '../../screens/nudges/NudgesScreen'
import { PreferencesScreen } from '../../screens/preferences/PreferencesScreen'
import { TAB_KEYS } from './TabConstant'
import { BottomTabBarComponent } from '../../components'
import { EventListingFinal } from '../../screens/event-listing/EventListingFinal'


const bottomTabBarStack = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        lazy: true
      }}
      tabBar={props => <BottomTabBarComponent {...props} />}
    >
      <Tab.Screen name={TAB_KEYS.HOME_TAB} component = {HomeScreen} options = {{
        unmountOnBlur: true
      }} />
      <Tab.Screen name={TAB_KEYS.EVENTS_TAB} component = {EventsListScreen} options = {{
        unmountOnBlur: true
      }} />
      <Tab.Screen name={TAB_KEYS.NUDGES_TAB} component = {NudgesScreen} options = {{
        unmountOnBlur: true
      }}  />
      <Tab.Screen name={TAB_KEYS.DISCUSSION_TAB} component = {DiscussionRoomListScreen} options = {{
        unmountOnBlur: true
      }}  />
      {/* <Tab.Screen name={TAB_KEYS.PREFERENCES_TAB} component = {PreferencesScreen} /> */}
      <Tab.Screen name={TAB_KEYS.PREFERENCES_TAB} component = {PreferencesScreen} />

    </Tab.Navigator>
  )
}

export {
  bottomTabBarStack
}
