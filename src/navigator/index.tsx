import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { setInitialStackName } from "../service"
import { navigationDataStore } from "../store"
import { mainStack } from "./MainStack"

const STACK_NAMES = {
  MAIN_STACK: 'MainStack'
}

const Stack = createStackNavigator()
const rootStack = () => {
  const { currentStackName } = navigationDataStore
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        {currentStackName === STACK_NAMES.MAIN_STACK && <Stack.Screen name ={'MainStack'} component = {mainStack}/>}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const routerGenerator = (cb) => {
  setInitialStackName(STACK_NAMES.MAIN_STACK)
  cb(rootStack)
}

export const setRouterHandler = () => {
  routerGenerator((router) => navigationDataStore.updateRouter(router))
}



