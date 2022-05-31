import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SearchSocietyScreen } from '../../screens/search-society'
import { RegisterUserDetailScreen } from '../../screens/register-user/RegisterUserDetailScreen'

const Stack = createStackNavigator()


const societyDetailStack = () => {
  return (
    <>
      <Stack.Screen name = {'SearchSocietyScreen'} component = {SearchSocietyScreen}/>
      <Stack.Screen name = {'RegisterUserDetailScreen'} component = {RegisterUserDetailScreen}/>
    </>
  )
}

export {
  societyDetailStack
}