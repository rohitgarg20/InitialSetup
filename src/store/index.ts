import { NavigationDataStore } from './NavigationDataStore'
import { LoaderDataStore } from './LoaderDataStore'

const loaderDataStore = new LoaderDataStore()
const navigationDataStore = new NavigationDataStore()

export * from './LoaderDataStore'
export * from './NavigationDataStore'

export {
  loaderDataStore,
  navigationDataStore
}

export default {
  loaderDataStore,
  navigationDataStore
}