import { createStackNavigator } from '@react-navigation/stack'
import React  from 'react'
import { CategoryListScreen, SubCategoryListScreen, RaiseComplaintScreen } from '../../screens/raise-complaint'
import { ComplainListScreen } from '../../screens/raise-complaint/ComplainListScreen'

const Stack = createStackNavigator()

const homeStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen name = {'CategoryListScreen'} component = {CategoryListScreen}/>
      <Stack.Screen name = {'SubCategoryListScreen'} component = {SubCategoryListScreen}/>
      <Stack.Screen name = {'RaiseComplaintScreen'} component = {RaiseComplaintScreen}/>
      <Stack.Screen name = {'ComplainListScreen'} component = {ComplainListScreen}/>

    </Stack.Navigator>
  )
}

export {
  homeStack
}