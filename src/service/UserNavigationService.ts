import { API_END_POINTS, API_IDS } from '../common/ApiConfiguration'
import { BaseRequest } from '../http-layer'
import { hideLoader, showLoader } from './LoaderDataService'
import { get } from 'lodash'
import { log } from '../config'
import { STACK_NAMES } from '../navigator'
import { storeUserInfoData } from '../utils/auth-utils'
import { userDataStore } from '../store'

const getUserProfileDetails = async () => {

  const loginUser = new BaseRequest(this, {
    methodType: 'GET',
    apiEndPoint: API_END_POINTS.GET_USER_DETAIL,
    apiId: API_IDS.GET_USER_DETAIL,
    promisify: true
  })
  await loginUser.setRequestHeaders()
  return await loginUser.hitGetApi()
}

export const getScreenNameToNavigateToOnLogin = async () => {
  return new Promise(async (resolve, reject) => {
    showLoader()
    getUserProfileDetails().then(async (userInfoResponse) => {
      log('getUserProfileDetailsgetUserProfileDetails', userInfoResponse)
      const userDataResponse = get(userInfoResponse, 'data.response', null)
      log('getUserProfileDetails', userDataStore)
      storeUserInfoData(userDataResponse)
      await userDataStore.setUserInfoData(userDataResponse)
      // await userDataStore.getUserData()
      resolve(STACK_NAMES.BOTTOM_TAB_BAR)
    }).catch(_err => {
      log('getScreenNameToNavigateToOnLogin', _err)
      resolve(STACK_NAMES.LOGIN_STACK)
    }).finally(() => {
      hideLoader()
    })
  })
}