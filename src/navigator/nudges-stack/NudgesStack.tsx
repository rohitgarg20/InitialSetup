import { createStackNavigator } from '@react-navigation/stack'
import React  from 'react'
import { WebViewPage } from '../../screens'

const Stack = createStackNavigator()

const nudgesStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}
    initialRouteName = {'WebViewPage'}
    >
      <Stack.Screen name = {'WebViewPage'} component = {WebViewPage} />

    </Stack.Navigator>
  )
}

export {
    nudgesStack
}