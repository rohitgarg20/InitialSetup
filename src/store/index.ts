import { NavigationDataStore } from './NavigationDataStore'
import { LoaderDataStore } from './LoaderDataStore'
import { GenericDrawerStore } from './drawer-store'

const loaderDataStore = new LoaderDataStore()
const navigationDataStore = new NavigationDataStore()
const genericDrawerStore = new GenericDrawerStore()

export * from './LoaderDataStore'
export * from './NavigationDataStore'
export * from './drawer-store'

export {
  loaderDataStore,
  navigationDataStore,
  genericDrawerStore
}

export default {
  loaderDataStore,
  navigationDataStore,
  genericDrawerStore
}