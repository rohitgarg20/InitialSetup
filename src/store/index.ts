import { NavigationDataStore } from './NavigationDataStore'
import { LoaderDataStore } from './LoaderDataStore'
import { LoginDataStore } from './login-store'
import { ComplainListStore, RaiseComplaintDataStore } from './raise-complaint'
import { UserDataStore } from './user-store'
import { RegisterUserDataStore } from './register-store'
import { GenericDrawerStore } from './drawer-store'
import { PropertDetailStore } from './property-detail'
import { ComplainDetailStore } from './complaint-detail'

const loaderDataStore = new LoaderDataStore()
const navigationDataStore = new NavigationDataStore()
const loginDataStore = new LoginDataStore()
const raiseComplaintDataStore = new RaiseComplaintDataStore()
const userDataStore = new UserDataStore()
const complaintListStore = new ComplainListStore()
const registerUserDataStore = new RegisterUserDataStore()
const genericDrawerStore = new GenericDrawerStore()
const propetyDetailStore = new PropertDetailStore()
const complaintDetailStore = new ComplainDetailStore()

export * from './LoaderDataStore'
export * from './NavigationDataStore'
export * from './LoaderDataStore'
export * from './raise-complaint'
export * from './user-store'
export * from './register-store'
export * from './drawer-store'
export * from './property-detail'
export * from './complaint-detail'

export {
  loaderDataStore,
  navigationDataStore,
  loginDataStore,
  raiseComplaintDataStore,
  userDataStore,
  complaintListStore,
  registerUserDataStore,
  genericDrawerStore,
  propetyDetailStore,
  complaintDetailStore,
}

export default {
  loaderDataStore,
  navigationDataStore,
  loginDataStore,
  raiseComplaintDataStore,
  userDataStore,
  complaintListStore,
  registerUserDataStore,
  genericDrawerStore,
  propetyDetailStore,
  complaintDetailStore,
}