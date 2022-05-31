import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%'
  }
})

interface IProps {
  innerContent: () => React.ReactElement<any>
}

export const bottomModalPopup = (props: IProps ) => {
  const { innerContent } = props
  return (
    <View style = {styles.mainContainer}>
      <View style = {{
        zIndex: 9999
      }}>
        {innerContent()}
      </View>
    </View>
  )
}

export {
  bottomModalPopup as BottomModalPopup
}
