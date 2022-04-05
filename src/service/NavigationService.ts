import { BackHandler } from 'react-native'

import { get } from 'lodash'
import { navigationDataStore } from '../store'
import { CommonActions, StackActions } from '@react-navigation/native'
import { log } from '../config'

let _navigator
let doubleBackToExitPressedOnce = false

const pushMainNavigator = (routeName, params, parentStackName = '') => {
  if (_navigator) {
    log('inside push main navigator', routeName, _navigator)
    if (parentStackName) {
      _navigator.dispatch(
        CommonActions.navigate(
          parentStackName,
          {
            screen: routeName,
            params
          }
        )
      )
    } else {
      _navigator.dispatch(
        CommonActions.navigate({
          name: routeName,
          params
        }
        )
      )
    }

  }
}

export function navigateSimple(navigation, routeName: string,   params: any = {} , parentStackName: string = '') {
  const prevRouteDataToBe = navigationDataStore.getCurrentRouteData()
  // log('WWW set previous root from navigateSimple' , prevRouteDataToBe)
  navigationDataStore.setPreviousRouteData(prevRouteDataToBe)
  const stackName = parentStackName?.length > 0 ? parentStackName : navigationDataStore.activeBottomTabName
  log('stackNamestackNamestackNamestackName', stackName)
  if (navigation) {
    if (stackName) {
      navigation.navigate(stackName, { screen: routeName, params })
    } else {
      navigation.navigate(routeName, params, parentStackName)
    }
  } else {
    pushMainNavigator(routeName, params, stackName)
  }
}

export function pushNavigation(navigation, routeName: string, params: any = {}) {
  log('pushNavigation pushNavigation called', navigation)
  // if (navigation) {
  //   navigation.push(routeName, params)
  // } else {
  //   pushMainNavigator(routeName, params)
  // }
}

export const exitApp = (removeWillBlurHandlersFunc = null) => {
  log('Press back from first page to exit!!', doubleBackToExitPressedOnce)
  if (doubleBackToExitPressedOnce) {
    if (removeWillBlurHandlersFunc) {
      removeWillBlurHandlersFunc()
    }
    BackHandler.exitApp()
    return false
  } else {
    // showSnackbar('Press back again to exit!')
    // showToastMessage('Press back again to exit!')
    doubleBackToExitPressedOnce = true
    setTimeout(() => {
      doubleBackToExitPressedOnce = false
    }, 2500)
    return true
  }
}

const dispatchBackAction = () => {
  log('dispatchBackActiondispatchBackAction', _navigator)
  if (_navigator) {
    _navigator.dispatch(CommonActions.goBack())
  }
}

export function goBack(navigation) {

  if (get(navigation, 'goBack')) {
    navigation.goBack(null)
  } else {
    dispatchBackAction()
  }
}

export function getNavigationItem() {
  // return this.navigationItem
  // if (_navigator) {
  //   return _navigator
  // }

  // return null
}

export function getCurrentRouteName() {
  // const currentRouteData = navigationDataStore.getCurrentRouteData()
  // const currentRouteName = get(currentRouteData, 'routeName', null)
  // return currentRouteName
}

export function getPreviousRouteName() {
  // const prevRouteData = navigationDataStore.getPreviousRouteData()
  // const prevRouteName = get(prevRouteData, 'routeName', null)
  // return prevRouteName
}

export function resetCurrentStack(navigation, routeName, params = {}) {
  // const resetAction = CommonActions.reset({
  //   index: 0,
  //   routes: [
  //     // { name: routeName },
  //     {
  //       name: routeName,
  //       params
  //     }
  //   ]
  // })
  // navigation.dispatch(resetAction)
}

export function getNavigationStack() {
  return null
}

export function setInitialRoute() {
  return null
}

const getActiveRouteName = (navigationState, prevRouteInp = null) => {
  if (!navigationState) {
    return null
  }

  let prevRoute = prevRouteInp || {}

  if (navigationState.routes && (navigationState.routes.length === 1)) { /* */ }

  const currentRoute = navigationState.routes[navigationState.index]

  if (currentRoute.state && currentRoute.state.routes) {
    if (currentRoute.state.routes.length === 1) {
      if ((navigationState.index - 1) >= 0) {
        prevRoute = navigationState.routes[navigationState.index - 1]
      }
    }

    return getActiveRouteName(get(currentRoute, 'state', {}), prevRoute)
  }
  if ((navigationState.index - 1) >= 0) {
    prevRoute = navigationState.routes[navigationState.index - 1]
  }

  return {
    currentRoute: {
      routeName: get(currentRoute, 'name', null)
    },
    prevRoute: {
      routeName: get(prevRoute, 'name', null)
    }
  }
}

export const handleNavigationStateChange = (navigationState) => {
  const {
    currentRoute = {},
    prevRoute = {}
  } = getActiveRouteName(navigationState) || {}
  // log('WWW set previous root from handleNavigationStateChange' , prevRoute)
  navigationDataStore.setPreviousRouteData(prevRoute)
  navigationDataStore.setCurrentRouteData(currentRoute)
}

const setTopLevelNavigator = (navigatorRef, callback = null) => {
  log('setTopLevelNavigatorsetTopLevelNavigator', navigatorRef)
  _navigator = navigatorRef
  if (callback) {
    callback()
  }
}

export const stackPopToTop = () => {
  _navigator.dispatch(
    StackActions.popToTop()
  )
}

export const setInititalStackName = (stackName) => {
  log('setInititalStackName', stackName )
  navigationDataStore.setCurrentStackName(stackName)
}

// add other navigation functions that you need and export them

export default {
  pushMainNavigator,
  stackPopToTop,
  setTopLevelNavigator
}
