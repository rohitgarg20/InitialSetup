import { createStackNavigator } from '@react-navigation/stack'
import React  from 'react'
import { WalkthroughScreen, WebViewPage } from '../screens'
import { EmailVerificationScreen } from '../screens/email-verification'
import { LoginScreen } from '../screens/login'
import { OtpVerificationScreen } from '../screens/otp-verification'
import { RegisterUserTypeScreen } from '../screens/register-user'
import { societyDetailStack } from './society-details'

const Stack = createStackNavigator()

const loginStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}
    initialRouteName = {'LoginScreen'}
    >
      {/* <Stack.Screen name = {'MainScreen'} component = {MainScreen}/> */}
      {/* <Stack.Screen name = {'WalkthroughScreen'} component = {WalkthroughScreen}/> */}
      <Stack.Screen name = {'LoginScreen'} component = {LoginScreen}/>
      <Stack.Screen name = {'RegisterUserTypeScreen'} component = {RegisterUserTypeScreen}/>
      <Stack.Screen name = {'EmailVerificationScreen'} component = {EmailVerificationScreen}/>
      <Stack.Screen name = {'OtpVerificationScreen'} component = {OtpVerificationScreen}/>
      <Stack.Screen name = {'WebViewPage'} component = {WebViewPage}/>
      {societyDetailStack()}
    </Stack.Navigator>
  )
}

export {
  loginStack
}