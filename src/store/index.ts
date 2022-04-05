import { PostListStore } from './posts-list-store/PostListStore';
import { NudgesListStore } from './nudges-list-store/NudgesListStore';
import { DiscussionRoomListStore } from './discussion-room-list/DiscussionRoomListStore';
import { EventsListStore } from './events-list/EventsListStore';
import { SetPasswordDataStore } from './set-password/SetPasswordDataStore';
import { ResetPasswordDataStore } from './reset-password/ResetPasswordDataStore';
import { SignupDataStore } from './signup/SignupDataStore';
import { LoginDataStore } from './login/LoginDataStore';
import { LoaderDataStore } from './LoaderDataStore'
import { NavigationDataStore } from './navigation';

const loaderDataStore = new LoaderDataStore()
const navigationDataStore = new NavigationDataStore()
const loginDataStore = new LoginDataStore()
const signupDataStore = new SignupDataStore()
const resetPasswordDataStore = new ResetPasswordDataStore()
const setPasswordDataStore = new SetPasswordDataStore()
const eventsListStore = new EventsListStore()
const discussionRoomListStore = new DiscussionRoomListStore()
const nudgesListDataStore = new NudgesListStore()
const postListStore = new PostListStore()

export * from './LoaderDataStore'
export * from './login'
export * from './signup'
export * from './reset-password'
export * from './navigation'
export * from './set-password'
export * from './events-list'
export * from './discussion-room-list'
export * from './nudges-list-store'
export * from './posts-list-store'

export {
  loaderDataStore,
  navigationDataStore,
  loginDataStore,
  signupDataStore,
  resetPasswordDataStore,
  setPasswordDataStore,
  eventsListStore,
  discussionRoomListStore,
  nudgesListDataStore,
  postListStore
}

export default {
  loaderDataStore,
  navigationDataStore,
  loginDataStore,
  signupDataStore,
  resetPasswordDataStore,
  setPasswordDataStore,
  eventsListStore,
  discussionRoomListStore,
  nudgesListDataStore,
  postListStore
}