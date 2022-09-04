import Reactotron from 'reactotron-react-native'

import { REMOVE_LOG } from '../common'

export function log(...logData) {
  if (!REMOVE_LOG) {
    Reactotron.log(logData)
    console.log(logData)
  }
}