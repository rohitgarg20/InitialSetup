import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { isEmpty } from 'lodash'
import { log } from '../config'
import { handleNavigationStateChange, setInititalStackName } from '../service'
import NavigationService from '../service/NavigationService'
import { getScreenNameToNavigateToOnLogin } from '../service/UserNavigationService'
import { navigationDataStore } from '../store'
import { getUserInfoData, hasCompleteWalkThroughPage } from '../utils/auth-utils'
import { loginStack } from './LoginStack'
import { mainStack } from './MainStack'
import { societyDetailStack } from './society-details'
import { houseDetailStack } from './house-detail'
import { ApprovalRequestPendingScreen } from '../screens/approval-request-pending'
import { WalkthroughScreen } from '../screens'

export const STACK_NAMES = {
  LOGIN_STACK: 'loginStack',
  BOTTOM_TAB_BAR: 'bottomTabBar',
  HOUSE_DETAIL_STACK: 'houseDetailStack',
  APPROVAL_PENDING_STACK: 'approvalRequestPendingStack',
  WALKTHROUGH_STACK: 'walkthroughStack'
}

const Stack = createStackNavigator()
const rootStack = () => {
  const { currentStackName } = navigationDataStore
  log('currentStackNamecurrentStackName', currentStackName)
  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef, () => {
          //
        })
      }}
      onStateChange={handleNavigationStateChange}
    >
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}
      >
        {currentStackName === STACK_NAMES.LOGIN_STACK && <Stack.Screen name ={'LoginStack'} component = {loginStack}/>}
        {currentStackName === STACK_NAMES.BOTTOM_TAB_BAR && <Stack.Screen name ={'BottomStack'} component = {mainStack}/>}
        {currentStackName === STACK_NAMES.HOUSE_DETAIL_STACK && <Stack.Screen name ={'HouseDetailStack'} component = {houseDetailStack}/>}
        {currentStackName === STACK_NAMES.APPROVAL_PENDING_STACK && (<Stack.Screen name ={'ApprovalRequestPending'} component = {ApprovalRequestPendingScreen}/>)}
        {currentStackName === STACK_NAMES.WALKTHROUGH_STACK && (<Stack.Screen name ={'WalkthroughStack'} component = {WalkthroughScreen}/>)}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const routerGenerator = async (cb) => {
  const userDetails = await getUserInfoData()
  log('userDetailsuserDetails', userDetails)
  if (!isEmpty(userDetails)) {
    const initialRoute =  await getScreenNameToNavigateToOnLogin()
    setInititalStackName(initialRoute)
  } else {
    const isWalkthroughVisited = await hasCompleteWalkThroughPage()
    if (isWalkthroughVisited) {
      setInititalStackName(STACK_NAMES.LOGIN_STACK)
    } else {
      setInititalStackName(STACK_NAMES.WALKTHROUGH_STACK)
    }
  }
  cb(rootStack)
}

export const setRouterHandler = () => {
  routerGenerator((router) => navigationDataStore.updateState(router))
}

