import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { GuardHomeScreen, InOutRegisterScreen, ResidentEntryScreen } from '../screens'
import { setInititalStackName } from '../service'
import { navigationDataStore } from '../store'
import { loginStack } from './LoginStack'

const STACK_NAMES = {
  LOGIN_STACK: 'loginStack'
}

const Stack = createStackNavigator()
const rootStack = () => {
  const { currentStackName } = navigationDataStore
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentStackName === STACK_NAMES.LOGIN_STACK && <Stack.Screen name ={'LoginStack'} component = {InOutRegisterScreen}/>}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const routerGenerator = (cb) => {
  setInititalStackName(STACK_NAMES.LOGIN_STACK)
  cb(rootStack)
}

export const setRouterHandler = () => {
  routerGenerator((router) => navigationDataStore.updateState(router))
}


