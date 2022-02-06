import { navigationDataStore } from '../store'

export const setInitialStackName = (currentStackName) => {
  navigationDataStore.setCurrentStackName(currentStackName)
}