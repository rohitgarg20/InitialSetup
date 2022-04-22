import { Platform, ToastAndroid } from "react-native"
import { log } from "../config"

export const showAndroidToastMessage = (msg, duration = ToastAndroid.SHORT) => {
  log('showAndroidToastMessage showAndroidToastMessage message called', msg)
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, duration)
  } else {
    // showSnackbar(msg)
  }
}