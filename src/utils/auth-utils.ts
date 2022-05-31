import AsyncStorage from '@react-native-community/async-storage'
import { log } from '../config'

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY'
export const PROFILE_KEY = 'PROFILE_KEY'
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_KEY'
export const IS_WALKTHROUGH_VISITED = 'IS_WALKTHROUGH_VISITED'

const INFO_KEYS = [
  AUTH_TOKEN_KEY,
  PROFILE_KEY,
  REFRESH_TOKEN_KEY
]

export const getAuthToken = async () => {
  const value = await AsyncStorage.getItem(AUTH_TOKEN_KEY)
  return value
}

export const setAuthToken = async (authToken) => {
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, authToken)
}

export const getRefreshToken = async () => {
  const value = await AsyncStorage.getItem(REFRESH_TOKEN_KEY)
  return value
}

export const setRefreshToken = async (authToken) => {
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, authToken)
}

export const handleSignOut = async () => {
  log('handleSignOuthandleSignOuthandleSignOut')
  INFO_KEYS.forEach(key => AsyncStorage.removeItem(key))
}

export const storeUserInfoData = async (obj) => {
  return AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(obj))
}

export const getUserInfoData = async () => {
  const userInfo = JSON.parse(await AsyncStorage.getItem(PROFILE_KEY)) || {}
  log('getUserInfoDatagetUserInfoData', userInfo)
  return userInfo
}

export const hasCompleteWalkThroughPage = async () => {
  const value = await AsyncStorage.getItem(IS_WALKTHROUGH_VISITED)
  return JSON.parse(value) || false
}

export const setCompleteWalkThroughPage = () => {
  AsyncStorage.setItem(IS_WALKTHROUGH_VISITED, 'true')
}