import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { commonStyles } from '../../common'
import { UserProfileComponent } from '../../components'
import { CustomText } from '../../components/CustomText'
import { userDataStore } from '../../store'

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

