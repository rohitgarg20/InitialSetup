import { createStackNavigator } from '@react-navigation/stack'
import React  from 'react'
import { WebViewPage } from '../../screens'
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
      <Stack.Screen name = {'WebViewPage'} component = {WebViewPage} />

    </Stack.Navigator>
  )
}

export {
  eventStack
}