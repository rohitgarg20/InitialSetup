import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../common';
import { TextInputComponent } from '../components';

const mainScreen = () => {
  return (
    <View style = {{
      backgroundColor: colors.white
    }}>
      <Text>
        Main screen is called
      </Text>
      <View style = {{
        paddingHorizontal: 20,
        paddingVertical: 20
      }}>
       <TextInputComponent/>
      </View>
    </View>
  )
}

export {
  mainScreen as MainScreen
}
