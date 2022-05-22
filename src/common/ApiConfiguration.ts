export const API_END_POINTS = {
  LOGIN: '/login',
  GET_CONFIG: '/api/config',
  GET_USER_INFO: '/api/v3/app/user',
  REGISTER_USER: '/register',
  SEND_OTP_EMAIL: '/api/v3/app/reset',
  VERIFY_OTP: '/api/v3/app/verify',
  SET_NEW_PASSWORD: '/api/v3/app/resetpassword',
  GET_EVENTS_LIST: 'api/v3/app/getevents',
  GET_DISCUSSION_ROOM_LIST: '/api/v3/app/getdiscussion_room',
  GET_NUDGES_LIST: '/api/v3/app/getnudge',
  GET_ALL_POSTS: '/api/v3/app/getposts',
  GET_USER_PREFERENCES: '/api/v3/app/preferences',
  GET_CATEGORY_LIST: '/api/v3/app/category',
  REGISTER_EVENT: '/api/v3/app/events/register/:id',
  UNREGISTER_EVENT: '/api/v3/app/events/unregister/:id',
  SAVE_ITEM: '/api/v3/app/save/:item_name',
  SAVE_USER_PREFERENCES: '/api/v3/app/preferences',
  ADD_JOKE: '/api/v3/app/joke',
  POST_DATA_BY_TID: '/api/v3/app/posts/:tid'
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
  SAVE_ITEM: 'SAVE_ITEM',
  SAVE_USER_PREFERENCES: 'SAVE_USER_PREFERENCES',
  ADD_JOKE: 'ADD_JOKE',
  DELETE_POST: 'DELETE_POST'
}