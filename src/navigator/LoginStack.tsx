import { createStackNavigator } from '@react-navigation/stack'
import React  from 'react'
import { MainScreen } from '../screens'

const Stack = createStackNavigator()

const loginStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name = {'MainScreen'} component = {MainScreen}/>
    </Stack.Navigator>
  )
}

export {
  loginStack
}