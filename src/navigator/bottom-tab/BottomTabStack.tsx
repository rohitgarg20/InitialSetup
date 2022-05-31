import React, { lazy } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TAB_KEYS } from '../../common/constant'
import { HomeScreen } from '../../screens/home'
import { ActivityScreen } from '../../screens/activity'
import { AddMoreScreen } from '../../screens/add-more'
import { ChatScreen } from '../../screens/chat'
import { StaffScreen } from '../../screens/staff'
import { BottomTabBarComponent } from '../../components'


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
        // unmountOnBlur: true
      }} />
      <Tab.Screen name={TAB_KEYS.ACTIVITY_TAB} component = {ActivityScreen} options = {{
        // unmountOnBlur: true
      }} />
      <Tab.Screen name={TAB_KEYS.ADD_MORE_TAB} component = {AddMoreScreen} options = {{
        // unmountOnBlur: true
      }}  />
      <Tab.Screen name={TAB_KEYS.STAFF_TAB} component = {StaffScreen} options = {{
        // unmountOnBlur: true
      }}  />
      <Tab.Screen name={TAB_KEYS.CHAT_TAB} component = {ChatScreen} />

    </Tab.Navigator>
  )
}

export {
  bottomTabBarStack
}
