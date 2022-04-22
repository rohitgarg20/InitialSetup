import { createStackNavigator } from '@react-navigation/stack'
import React  from 'react'
import { CharacterListScreen, CharacterDetailScreen, EpisodeDetailScreen } from '../screens'

const Stack = createStackNavigator()

const mainStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name = {'MainScreen'} component = {CharacterListScreen}/>
        <Stack.Screen name = {'CharacterDetailScreen'} component = {CharacterDetailScreen}/>
        <Stack.Screen name = {'EpisodeDetailScreen'} component = {EpisodeDetailScreen}/>
    </Stack.Navigator>
  )
}

export {
  mainStack
}