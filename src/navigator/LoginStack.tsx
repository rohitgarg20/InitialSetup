import { createStackNavigator } from '@react-navigation/stack'
import React  from 'react'
import { AddJokeScreen, EnterOtpScreen, LoginScreen, MainScreen, RegisterUserScreen, ResetPasswordScreen, SetPasswordScreen, WebViewPage } from '../screens'

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
      <Stack.Screen name = {'WebViewPage'} component = {WebViewPage} />
      <Stack.Screen name = {'AddJokeScreen'} component = {AddJokeScreen} />
    </Stack.Navigator>
  )
}

export {
  loginStack
}