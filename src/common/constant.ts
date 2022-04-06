import { icons } from './icons'
export const REMOVE_LOG = false

export const FORM_KEYS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  NAME: 'name'
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

export const BASE_URL = 'http://192.168.1.203:4567'
// export const BASE_URL = 'http://sdlms.deepthought.education'


export const DAYS_NAME = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export const CARD_HEIGHT = 180
export const EVENT_CARD_HEIGHT = 140
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
  DELETE: 'DELETE'
}


export const LABELS = {
  EDIT: 'Edit',
  SHARE: 'Share',
  SAVE: 'Save',
  REPORT: 'Report',
  DELETE: 'Delete'
}

export const OPTIONS_DATA_FOR_SELF_POST = [
  {
    key: POST_KEYS.EDIT,
    icon: icons.ADD_DISCUSSSION,
    heading: LABELS.EDIT
  },
  {
    key: POST_KEYS.SHARE,
    icon: icons.ADD_DISCUSSSION,
    heading: LABELS.SHARE
  },
  {
    key: POST_KEYS.SAVE,
    icon: icons.ADD_DISCUSSSION,
    heading: LABELS.SAVE
  },
  {
    key: POST_KEYS.REPORT,
    icon: icons.ADD_DISCUSSSION,
    heading: LABELS.REPORT
  },
  {
    key: POST_KEYS.DELETE,
    icon: icons.ADD_DISCUSSSION,
    heading: LABELS.DELETE
  }

]

export const OPTIONS_DATA_FOR_OTHER_POST = [
  {
    key: POST_KEYS.SHARE,
    icon: icons.ADD_DISCUSSSION,
    heading: LABELS.SHARE
  },
  {
    key: POST_KEYS.SAVE,
    icon: icons.ADD_DISCUSSSION,
    heading: LABELS.SAVE
  },
  {
    key: POST_KEYS.REPORT,
    icon: icons.ADD_DISCUSSSION,
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
  PREEVIOUS_SELECTED_FILTER_VALUES: 'previousSelectedValues',
  FILTER_TYPE: 'filterType',
  LIST_ITEMS: 'listItems',
  FILTER_ID: 'filterId',
  CHECKBOX_TYPE: 'checkBoxType',
  RADIO_BUTTON_TYPE: 'radioButton'
}

export interface IFilterItems {
  id: string
  isSelected: string
  displayLabel: string
}
export interface IFilterListItem{
  filterLabel: string
  currentSelectedFilterValues: IFilterItems[]
  previousSelectedValues: IFilterItems[]
  listItems: IFilterItems[]
  filterType: 'checkboxSelection' | 'radio'
  filterId: string
}
