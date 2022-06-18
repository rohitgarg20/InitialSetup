import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, commonStyles } from '../../common'
import { UserProfileComponent } from '../../components'
import { CustomText } from '../../components/CustomText'
import { userDataStore } from '../../store'

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dardBlack
  }
})

const chatScreen = observer(() => {
  const { userProfileDisplayData } = userDataStore
  useEffect(() => {
    userDataStore.constructUserProfileData()
  }, [])


  return (
    <View style = {commonStyles.flexContainer}>
      <UserProfileComponent userDetails={userProfileDisplayData}/>
    </View>
  )
})

export {
    chatScreen as ChatScreen
}

