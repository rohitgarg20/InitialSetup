import AsyncStorage from '@react-native-community/async-storage'
import { log } from '../config'

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY'
export const PROFILE_KEY = 'PROFILE_KEY'


const INFO_KEYS = [
  AUTH_TOKEN_KEY,
  PROFILE_KEY
]

export const getAuthToken = async () => {
  const value = await AsyncStorage.getItem(AUTH_TOKEN_KEY)
  return value
}

export const setAuthToken = async (authToken) => {
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, authToken)
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