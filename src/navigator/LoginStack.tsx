import { createStackNavigator } from '@react-navigation/stack'
import React  from 'react'
import { EnterOtpScreen, LoginScreen, MainScreen, RegisterUserScreen, ResetPasswordScreen, SetPasswordScreen } from '../screens'

const Stack = createStackNavigator()

const loginStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}
    initialRouteName = {'SignIn'}
    >
      <Stack.Screen name = {'MainScreen'} component = {MainScreen}/>
      <Stack.Screen name = {'SignIn'} component = {LoginScreen}/>
      <Stack.Screen name = {'Register'} component = {RegisterUserScreen} />
      <Stack.Screen name = {'ResetPassword'} component = {ResetPasswordScreen} />
      <Stack.Screen name = {'EnterOtpScreen'} component = {EnterOtpScreen} />
      <Stack.Screen name = {'SetPasswordScreen'} component = {SetPasswordScreen} />
    </Stack.Navigator>
  )
}

export {
  loginStack
}