import { GenericDrawerStore } from './generic-drawer-store/GenericDrawerStore';
import { EventRoomDetailStore } from './event-detail-store/EventDetailStore';
import { DiscussionRoomDetailStore } from './discussion-detail-store/DiscussionRoomDetailStore';
import { UserDataStore } from './user-data-store/UserDataStore';
import { PreferencesDataStore } from './preferences/PreferencesDataStore';
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
import { AddJokeDataStore } from './add-joke-data-store';

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
const preferencesDataStore = new PreferencesDataStore()
const userDataStore = new UserDataStore()
const discussionRoomDetailStore = new DiscussionRoomDetailStore()
const eventDetailStore = new EventRoomDetailStore()
const genericDrawerStore = new GenericDrawerStore()
const addJokeDataStore = new AddJokeDataStore()

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
export * from './preferences'
export * from './user-data-store'
export * from './discussion-detail-store'
export * from './event-detail-store'
export * from './generic-drawer-store'
export * from './add-joke-data-store'

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
  postListStore,
  preferencesDataStore,
  userDataStore,
  discussionRoomDetailStore,
  eventDetailStore,
  genericDrawerStore,
  addJokeDataStore
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
  postListStore,
  preferencesDataStore,
  userDataStore,
  discussionRoomDetailStore,
  eventDetailStore,
  genericDrawerStore,
  addJokeDataStore
}