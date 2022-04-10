import { createStackNavigator } from '@react-navigation/stack'
import React  from 'react'
import { DiscussionRoomDetailScreen } from '../../screens/discussions/DiscussionRoomDetailScreen'
import { EventDetailScreen } from '../../screens/event-detail'

const Stack = createStackNavigator()

const eventStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}
    initialRouteName = {'SignIn'}
    >
      <Stack.Screen name = {'EventDetailScreen'} component = {EventDetailScreen}/>

    </Stack.Navigator>
  )
}

export {
  eventStack
}