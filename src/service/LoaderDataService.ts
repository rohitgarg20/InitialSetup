import { loaderDataStore } from "../store"

export const showLoader = () => {
  loaderDataStore.updateLoaderStatus(true)
}

export const hideLoader = () => {
  loaderDataStore.updateLoaderStatus(false)
}
