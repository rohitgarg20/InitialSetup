import { API_END_POINTS, API_IDS } from '../common/ApiConfiguration'
import { BaseRequest } from '../http-layer'
import { hideLoader, showLoader } from './LoaderDataService'
import { get } from 'lodash'
import { log } from '../config'
// import { STACK_NAMES } from '../navigator'
import { getRefreshToken, storeUserInfoData } from '../utils/auth-utils'
import {  userDataStore } from '../store'
import { STACK_NAMES } from '../navigator'

const getUserProfileDetails = async () => {
  const refreshToken = await getRefreshToken()
  const loginUser = new BaseRequest(this, {
    methodType: 'GET',
    apiEndPoint: API_END_POINTS.GET_USER_INFO,
    apiId: API_IDS.GET_USER_INFO,
    promisify: true,
    urlParams: {
      token: refreshToken
    }
  })
  await loginUser.setRequestHeaders()
  return await loginUser.hitGetApi()
}

export const getScreenNameToNavigateToOnLogin = async () => {
  return new Promise(async (resolve, reject) => {
    showLoader()
    getUserProfileDetails().then(async (userInfoResponse) => {
      log('userInfoResponseuserInfoResponse', userInfoResponse)
      const userDataResponse = get(userInfoResponse, 'data.user', null)
      const isUserApproved = get(userDataResponse, 'isApproved', false)
      const isApprovalRequestPending = get(userDataResponse, 'approvalRequest.status', '') === 'pending'
      log('isUserApprovedisUserApproved', isUserApproved, isApprovalRequestPending)
      storeUserInfoData(userDataResponse)
      if (isUserApproved === true) {
        resolve(STACK_NAMES.BOTTOM_TAB_BAR)
      } else if (isApprovalRequestPending) {
        resolve(STACK_NAMES.APPROVAL_PENDING_STACK)
      } else {
        resolve(STACK_NAMES.HOUSE_DETAIL_STACK)
      }
      await userDataStore.setUserInfoData(userDataResponse)
      log('after await storeUserInfoDatastoreUserInfoData')
      // await userDataStore.getUserData()
    }).catch(_err => {
      log('getScreenNameToNavigateToOnLogin', _err)
      resolve(STACK_NAMES.LOGIN_STACK)
    }).finally(() => {
      hideLoader()
    })
  })
}