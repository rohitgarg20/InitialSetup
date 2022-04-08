import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { isEmpty } from 'lodash'
import { setInititalStackName } from '../service'
import NavigationService, { handleNavigationStateChange } from '../service/NavigationService'
import { getScreenNameToNavigateToOnLogin } from '../service/UserNavigationService'
import { navigationDataStore } from '../store'
import { getUserInfoData } from '../utils/auth-utils'
import { loginStack } from './LoginStack'
import { mainStack } from './MainStack'

export const STACK_NAMES = {
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

const routerGenerator = async (cb) => {
  const userDetails = getUserInfoData()
  if (!isEmpty(userDetails)) {
    const initialRoute =  await getScreenNameToNavigateToOnLogin()
    setInititalStackName(STACK_NAMES.BOTTOM_TAB_BAR)
  } else {
    setInititalStackName(STACK_NAMES.LOGIN_STACK)
  }
  cb(rootStack)
}

export const setRouterHandler = () => {
  routerGenerator((router) => navigationDataStore.updateState(router))
}
