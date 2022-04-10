export const API_END_POINTS = {
  LOGIN: '/login',
  GET_CONFIG: '/api/config',
  GET_USER_INFO: '/api/v3/app/user',
  REGISTER_USER: '/register',
  SEND_OTP_EMAIL: '/api/v3/app/reset',
  VERIFY_OTP: '/api/v3/app/verify',
  SET_NEW_PASSWORD: '/api/v3/app/verify',
  GET_EVENTS_LIST: 'api/v3/app/events',
  GET_DISCUSSION_ROOM_LIST: '/api/v3/app/discussion_room',
  GET_NUDGES_LIST: '/api/v3/app/nudge',
  GET_ALL_POSTS: '/api/v3/app/posts',
  GET_USER_PREFERENCES: '/api/v3/app/preferences',
  GET_CATEGORY_LIST: '/api/v3/app/category',
  REGISTER_EVENT: '/api/v3/app/events/register/:id',
  UNREGISTER_EVENT: '/api/v3/app/events/unregister/:id',
  SAVE_ITEM: '/api/v3/app/save/event/:item_name'
}

export const API_IDS = {
  LOGIN: 'LOGIN',
  GET_CONFIG: 'GET_CONFIG',
  GET_USER_INFO: 'GET_USER_INFO',
  REGISTER_USER: 'REGISTER_USER',
  SEND_OTP_EMAIL: 'SEND_OTP_EMAIL',
  VERIFY_OTP: 'VERIFY_OTP',
  SET_NEW_PASSWORD: 'SET_NEW_PASSWORD',
  GET_EVENTS_LIST: 'GET_EVENTS_LIST',
  GET_DISCUSSION_ROOM_LIST: 'GET_DISCUSSION_ROOM_LIST',
  GET_NUDGES_LIST: 'GET_NUDGES_LIST',
  GET_ALL_POSTS: 'GET_ALL_POSTS',
  GET_USER_PREFERENCES: 'GET_USER_PREFERENCES',
  GET_CATEGORY_LIST: 'GET_CATEGORY_LIST',
  REGISTER_EVENT: 'REGISTER_EVENT',
  UNREGISTER_EVENT: 'UNREGISTER_EVENT',
  SAVE_ITEM: 'SAVE_ITEM'
}