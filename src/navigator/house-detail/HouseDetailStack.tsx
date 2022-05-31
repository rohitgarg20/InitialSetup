import { createStackNavigator } from '@react-navigation/stack'
import React  from 'react'
import { EnterPropertyDetailScreen } from '../../screens/property-detail'


const Stack = createStackNavigator()

const houseDetailStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}
    initialRouteName = {'EnterPropertyDetailScreen'}
    >
      {/* <Stack.Screen name = {'MainScreen'} component = {MainScreen}/> */}
      <Stack.Screen name = {'EnterPropertyDetailScreen'} component = {EnterPropertyDetailScreen}/>

    </Stack.Navigator>
  )
}

export {
    houseDetailStack
}