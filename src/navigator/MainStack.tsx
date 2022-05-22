import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MAIN_STACK_KEYS } from '../common/constant'
import { bottomTabBarStack } from './bottom-tab/BottomTabStack'
import { homeStack } from './home-stack/HomeStack'
import { eventStack } from './events-stack/EventStack'
import { discussionStack } from './discussion-stack/DiscusssionStack'
import { nudgesStack } from './nudges-stack/NudgesStack'

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
      <Stack.Screen name= {MAIN_STACK_KEYS.HOME_STACK} component={homeStack} />

      <Stack.Screen name= {MAIN_STACK_KEYS.EVENTS_STACK} component={eventStack} />
      <Stack.Screen name= {MAIN_STACK_KEYS.NUDGES_STACK} component={nudgesStack} />

      <Stack.Screen name= {MAIN_STACK_KEYS.DISCUSSION_STACK} component={discussionStack} />
    </Stack.Navigator>
  )
}

export {
  mainStack,
  MAIN_STACK_KEYS
}