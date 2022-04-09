import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../common'


const style = StyleSheet.create({
  outerCircle: {
    height: 20 ,
    width: 20 ,
    borderRadius: 10 ,
    borderColor: colors.grey,
    borderWidth: 1 ,
    justifyContent: 'center' ,
    alignItems: 'center'
  } ,
  innerCircle: {
    height: 14 ,
    width: 14 ,
    borderRadius: 7 ,
    backgroundColor: colors.white
  }
})

const INNER_VIEW_TEST_ID = 'RADIO_BUTTON_INNER_VIEW'
interface Props {
  outerCircleStyle?: any
  innerCircleStyle?: any
  innerViewTestId?: string
}
// tslint:disable-next-line: variable-name
const RadioButtons: React.SFC<Props> = (props) => {
  return(
    <View style ={[style.outerCircle , props.outerCircleStyle]}>
      <View style ={[style.innerCircle , props.innerCircleStyle]} testID = {props.innerViewTestId || INNER_VIEW_TEST_ID} />
    </View>)
}

export {RadioButtons}