import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
})

interface IProps {
  innerContent: () => React.ReactElement<any>
}

export const centerModalPopup = (props: IProps ) => {
  const { innerContent } = props
  return (
    <View style = {styles.mainContainer}>
        {innerContent()}
    </View>
  )
}

export {
  centerModalPopup as CenterModalPopup
}