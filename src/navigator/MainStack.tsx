import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MAIN_STACK_KEYS } from '../common/constant'
import { bottomTabBarStack } from './bottom-tab/BottomTabStack'

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator()

const mainStack = () => {
  return (
    <Stack.Navigator initialRouteName={MAIN_STACK_KEYS.TAB_BAR_STACK}
      screenOptions={{
        headerShown: false
      }}
    // defaultScreenOptions={{
    // }}
    >
      <Stack.Screen name= {MAIN_STACK_KEYS.TAB_BAR_STACK} component={bottomTabBarStack} />
      {/* <Stack.Screen name= {MAIN_STACK_KEYS.HOME_STACK} component={homeStack} />
      <Stack.Screen name= {MAIN_STACK_KEYS.COMMUNITY_STACK} component={communityStack} />
      <Stack.Screen name= {MAIN_STACK_KEYS.NOTIFICATION_STACK} component={notificationStack} />
      <Stack.Screen name= {MAIN_STACK_KEYS.MORE_STACK} component={moreStack} /> */}
    </Stack.Navigator>
  )
}

export {
  mainStack,
  MAIN_STACK_KEYS
}