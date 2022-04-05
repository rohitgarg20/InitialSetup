import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { setInititalStackName } from '../service'
import NavigationService, { handleNavigationStateChange } from '../service/NavigationService'
import { navigationDataStore } from '../store'
import { loginStack } from './LoginStack'
import { mainStack } from './MainStack'

const STACK_NAMES = {
  LOGIN_STACK: 'loginStack',
  BOTTOM_TAB_BAR: 'bottomTabBar'
}

const Stack = createStackNavigator()
const rootStack = () => {
  const { currentStackName } = navigationDataStore
  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef, () => {
        //
        })
      }}
      onStateChange={handleNavigationStateChange}

    >
      <Stack.Navigator  screenOptions={{
        headerShown: false
      }}>
        {currentStackName === STACK_NAMES.LOGIN_STACK && <Stack.Screen name ={'LoginStack'} component = {loginStack}/>}
        {currentStackName === STACK_NAMES.BOTTOM_TAB_BAR && <Stack.Screen name ={'BottomStack'} component = {mainStack}/>}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const routerGenerator = (cb) => {
  setInititalStackName(STACK_NAMES.BOTTOM_TAB_BAR)
  cb(rootStack)
}

export const setRouterHandler = () => {
  routerGenerator((router) => navigationDataStore.updateState(router))
}
