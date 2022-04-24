import { navigateSimple } from '../service'
import { icons } from './icons'
export const REMOVE_LOG = false

export const FORM_KEYS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  NAME: 'name',
  JOKE: 'joke'
}

export const TEXT_FIELD_KEYS = {
  KEY: 'key',
  INPUT_VALUE: 'inputValue',
  LABEL: 'label',
  IS_PASSWORD_FIELD: 'isPasswordField',
  ERROR_MESSAGE: 'errorMessage'
}

export const MAIN_STACK_KEYS = {
  HOME_STACK: 'homeStack',
  EVENTS_STACK: 'eventsStack',
  NUDGES_STACK: 'nudgesStack',
  PREFERNCES_STACK: 'preferencesStack',
  DISCUSSION_STACK: 'discussionStack',
  TAB_BAR_STACK: 'tabBarStack'
}

// export const BASE_URL = 'http://192.168.1.21:4567'
export const BASE_URL = 'https://www.sdlms.deepthought.education'

export const DAYS_NAME = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export const CARD_HEIGHT = 180
export const EVENT_CARD_HEIGHT = 160
export const FETCHING_ARR = ['', '', '', '', '', '', '', '', '', '']

export const FOOTER_KEYS = {
  DISCUSSION: 'DISCUSSION',
  REFLECTION: 'REFLECTION',
  THOUGHT_PROCESS: 'THOUGHT_PROCESS',
  COMMENT: 'COMMENT'
}
export const FOOTER_LIST_ITEMS = [
  {
    key:  FOOTER_KEYS.DISCUSSION,
    name: 'Discussions',
    icon: icons.ADD_DISCUSSSION
  },
  {
    key:  FOOTER_KEYS.REFLECTION,
    name: 'Reflection',
    icon: icons.REFLECTION
  },
  {
    key:  FOOTER_KEYS.THOUGHT_PROCESS,
    name: 'Thought Process',
    icon: icons.THOUGHT_PROCESS
  },
  {
    key:  FOOTER_KEYS.COMMENT,
    name: 'Comment',
    icon: icons.COMMENT
  }]

export const POST_TYPES = {
  DISCUSSION_ROOM: 'discuss_room',
  ARTICLE: 'article'
}

export const ACTION_TYPE = {
  SKIP: 'Skip',
  NEXT: 'Next'
}

export const POST_KEYS = {
  EDIT: 'EDIT',
  SHARE: 'SHARE',
  SAVE: 'SAVE',
  REPORT: 'REPORT',
  DELETE: 'DELETE',
  REPOST: 'REPOST'

}

export const LABELS = {
  EDIT: 'Edit',
  SHARE: 'Share',
  SAVE: 'Save',
  REPORT: 'Report',
  DELETE: 'Delete',
  REPOST: 'REPOST'
}

export const USER_LABELS = {
  VIEW_PROFILE: 'View Profile',
  SETTINGS: 'Settings',
  MY_EVENTS: 'My events',
  SAVED: 'Saved',
  SUPPORT: 'Support',
  SIGN_OUT: 'Sign out'
}

export const USER_KEYS = {
  VIEW_PROFILE: 'VIEW_PROFILE',
  SETTINGS: 'SETTINGS',
  MY_EVENTS: 'MY_EVENTS',
  SAVED: 'SAVED',
  SUPPORT: 'SUPPORT',
  SIGN_OUT: 'SIGN_OUT'
}

export const OPTIONS_DATA_FOR_SELF_POST = [
  {
    key: POST_KEYS.EDIT,
    icon: icons.EDIT_ICON,
    heading: LABELS.EDIT
  },
  {
    key: POST_KEYS.SHARE,
    icon: icons.SHARE_ICON,
    heading: LABELS.SHARE
  },
  {
    key: POST_KEYS.SAVE,
    icon: icons.SAVE_ICON,
    heading: LABELS.SAVE
  },
  {
    key: POST_KEYS.REPOST,
    icon: icons.REPOST_ICON,
    heading: LABELS.REPOST
  },
  {
    key: POST_KEYS.DELETE,
    icon: icons.DELETE_ICON,
    heading: LABELS.DELETE
  }

]

export const OPTIONS_DATA_FOR_OTHER_POST = [
  {
    key: POST_KEYS.SHARE,
    icon: icons.SHARE_ICON,
    heading: LABELS.SHARE
  },
  {
    key: POST_KEYS.SAVE,
    icon: icons.SAVE_ICON,
    heading: LABELS.SAVE
  },
  {
    key: POST_KEYS.REPORT,
    icon: icons.REPORT_ICON,
    heading: LABELS.REPORT
  }

]

export const USER_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline'
}

export const FILTER_KEYS = {
  CATEGORY: 'category',
  SORTING: 'sorting'
}

export const FILTER_ITEM_KEYS = {
  FILTER_LABEL: 'filterLabel',
  CURRENT_SELECTED_FILTER_VALUES: 'currentSelectedFilterValues',
  PREVIOUS_SELECTED_FILTER_VALUES: 'previousSelectedValues',
  FILTER_TYPE: 'filterType',
  LIST_ITEMS: 'listItems',
  FILTER_ID: 'filterId',
  CHECKBOX_TYPE: 'checkBoxType',
  RADIO_BUTTON_TYPE: 'radioButton'
}

export const SORTING_DATA = [
  {
    name: 'Popular',
    id: 'popular'
  },
  {
    name: 'Latest',
    id: 'latest'
  },
  {
    name: 'Rigor Rank',
    id: 'rigor_rank'
  }
]

export const USER_OPTIONS_LIST = [
  {
    key: USER_KEYS.VIEW_PROFILE,
    icon: icons.USER_ICON,
    heading: USER_LABELS.VIEW_PROFILE
  },
  {
    key: USER_KEYS.SETTINGS,
    icon: icons.SETTING_ICON,
    heading: USER_LABELS.SETTINGS
  },
  {
    key: USER_KEYS.MY_EVENTS,
    icon: icons.EVENTS,
    heading: USER_LABELS.MY_EVENTS
  },
  {
    key: USER_KEYS.SAVED,
    icon: icons.SAVE_ICON,
    heading: USER_LABELS.SAVED
  },
  {
    key: USER_KEYS.SUPPORT,
    icon: icons.SUPPORT_ICON,
    heading: USER_LABELS.SUPPORT
  },
  {
    key: USER_KEYS.SIGN_OUT,
    icon: icons.SIGN_OUT_ICON,
    heading: USER_LABELS.SIGN_OUT
  }

]

export interface IFilterItems {
  id: string
  isSelected: boolean
  displayLabel: string
}
export interface IFilterListItem{
  filterLabel: string
  currentSelectedFilterValues: IFilterItems[]
  previousSelectedValues: IFilterItems[]
  listItems: IFilterItems[]
  filterType: 'checkBoxType' | 'radioButton'
  filterId: string
}

export const HEADER_HEIGHT = 50

export const TERMS_OF_USE_KEY = 'TERMS_OF_USE'
export const PRIVACY_POLICY_KEY = 'PRIVACY_POLICY'


export const navigateToWebView = ({ navigation = undefined, pageUrl }) => {
  navigateSimple(navigation, 'WebViewPage', {
    pageUrl
  })
}

export const WAITING_TIME = 1000
export const MINIMUM_TEXT_TO_SEARCH = 3
