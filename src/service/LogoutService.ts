import axios from 'axios'
import { Alert } from 'react-native'
import { LOGOUT_SUCCESS } from '../common'
import { API_END_POINTS, API_IDS } from '../common/ApiConfiguration'
import { BASE_URL } from '../common/constant'
import { log } from '../config'
import { STACK_NAMES } from '../navigator'
import { showAndroidToastMessage } from '../utils/app-utils'
import { getRefreshToken, handleSignOut } from '../utils/auth-utils'
import { navigateSimple, setInititalStackName } from './NavigationService'

export const hitLogoutUserApi = async (refreshToken) => {
  const response = await axios.post(`${BASE_URL}/${API_END_POINTS.LOGOUT_USER}`, {
    token: refreshToken
  })
  log('responseresponseresponseresponse', response)
}

export const logoutHandler = async () => {
  setInititalStackName(STACK_NAMES.LOGIN_STACK)
  // navigateSimple(undefined, 'LoginScreen', {}, STACK_NAMES.LOGIN_STACK)
  const refreshToken = await getRefreshToken()
  showAndroidToastMessage(LOGOUT_SUCCESS)
  hitLogoutUserApi(refreshToken)
  handleSignOut()
}

export const logoutTransitionPopup = () =>  {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout ?',
    [
      { text: 'Cancel' },
      { text: 'Yes', onPress: () => logoutHandler() }
    ],
    { cancelable: false }
  )
}

