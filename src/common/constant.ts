import { colors } from './config'
import { icons } from './icons'

export const REMOVE_LOG = false
export const BASE_URL = 'http://65.2.81.12:8000/api'


export const DAYS_NAME = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']


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
  ERROR_MESSAGE: 'errorMessage',
  IS_REQUIRED: 'isReqired',
  IS_EDITABLE: 'isEditable',
  FILED_TYPE: 'fieldType',
  ADDITIONAL_DATA: 'additionalData'
}

export enum COMPLAIN_TYPE_KEYS {
  PERSONAL_COMPLAINT = 'personal',
  COMMON_AREA_COMPLAIN = 'commonArea'
}

export const COMPLAINT_TYPE_LIST = [
  {
    id: COMPLAIN_TYPE_KEYS.PERSONAL_COMPLAINT,
    displayLabel: 'Personal'
  },
  {
    id: COMPLAIN_TYPE_KEYS.COMMON_AREA_COMPLAIN,
    displayLabel: 'Common Area'
  }]

export const MAIN_STACK_KEYS = {
  HOME_STACK: 'homeStack',
  ACTIVITY_STACK: 'activityStack',
  ADD_MORE_STACK: 'addMoreStack',
  STAFF_STACK: 'staffStack',
  CHAT_STACK: 'chatStack',
  TAB_BAR_STACK: 'tabBarStack'
}

export const TAB_KEYS = {
  HOME_TAB: 'Home',
  ACTIVITY_TAB: 'Activity',
  ADD_MORE_TAB: 'AddMore',
  STAFF_TAB: 'StaffTab',
  CHAT_TAB: 'ChatTab'
}

export const HEADER_TOP = -50
export const CARD_SEPERATOR = 20

export const CATEGRIES_KEYS = {
  COMPLAINT: 'Complaints',
  NOTICE_BOARD: 'Notice Board',
  PRE_ENTRY: 'Pre-Approved Entry'
}

export const CATEGORIES_LIST = [{
  displayLabel: 'Complaints',
  key: CATEGRIES_KEYS.COMPLAINT,
  icon: icons.COMPLAIN
},
{
  displayLabel: 'Notice Board',
  key: CATEGRIES_KEYS.NOTICE_BOARD,
  icon: icons.NOTICE_BOARD
},
{
  displayLabel: 'Pre-Approved Entry',
  key: CATEGRIES_KEYS.PRE_ENTRY,
  icon: icons.PRE_APPROVED_ENTRY
}]

export enum COMPLAIN_FORM_KEYS {
  SELECTED_COMPLAIN_TYPE = 'selectedComplainType',
  COMPLAINT_TITLE = 'complainTitle',
  COMPLAIN_DESCRIPTION = 'complainDescription',
  COMPLAINT_ADDRESS = 'complaintAddress'
}

export const USER_ROLE = 'User'

export const COMPLAINT_STATUS = {
  ASSIGNED: 'assigned',
  UNASSIGNED: 'unassigned',
  CLOSED: 'closed',
  RESOLVED: 'resolved',
  REOPENED: 'reopen'
}

export const GET_DATA_BY_COMPLAINT_STATUS: Map<string, any> = new Map([
  [COMPLAINT_STATUS.UNASSIGNED, {
    complaintLabel: 'Complaint By',
    displayStatus: 'Unassigned',
    backgroundColor: colors.primaryButton
  }],
  [COMPLAINT_STATUS.ASSIGNED, {
    complaintLabel: 'Assigned by',
    displayStatus: 'Assigned',
    backgroundColor: colors.darkBlue
  }],
  [COMPLAINT_STATUS.CLOSED, {
    complaintLabel: 'Closed By',
    displayStatus: 'Closed',
    backgroundColor: colors.darkGrey
  }],
  [COMPLAINT_STATUS.RESOLVED, {
    complaintLabel: 'Resolved By',
    displayStatus: 'Resolved',
    backgroundColor: colors.green
  }],
  [COMPLAINT_STATUS.REOPENED, {
    complaintLabel: 'Reopened By',
    displayStatus: 'Reopen',
    backgroundColor: colors.green
  }]
])

export enum BACK_ICON_TYPES {
  DEFAULT = 'default',
  CARET = 'caret'
}

export enum SIGN_UP_USERS_TYPE {
  OWNER = 'owner',
  TENANT = 'tenant'
}

export const USER_DETAILS_KEYS = {
  SOCIETY_ID: 'societyId',
  USER_NAME: 'name',
  EMP_ID: 'empId',
  DOB: 'DOB',
  IMAGE: 'image',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  EMAIL: 'email',
  ROLE: 'role',
  SOCIETY_NAME: 'societyName',
  SOCIETY_ADDRESS: 'societyAddress',
  FLAT_NAME: 'flatName'
}

export enum FILED_TYPE {
  STRING = 'string',
  DATE = 'date',
  NUMBER = 'number'
}

export const SIGN_UP_USER_TYPE_MAP: Map<string, string> = new Map([
  [SIGN_UP_USERS_TYPE.OWNER, 'Owner'],
  [SIGN_UP_USERS_TYPE.TENANT, 'Tenant']
])

export const OWNERSHIP_TYPE_LIST = [{
  key: 'owner',
  displayValue: 'Owner',
  isSelected: false
},
{
  key: 'rent',
  displayValue: 'Rent',
  isSelected: false
}]

export enum ACTION_TAKEN_ROLES {
  SYSTEM_AUTOMATED = 'System automated',
  ADMIN = 'Admin',
  USER = 'User'
}

export const USER_ACTIONS_KEYS = {
  NOTIFY_ADMIN: 'NotifyAdmin',
  MARKASRESOLVED: 'MarkAsResolved'
}

export const USER_ACTIONS_ON_COMPLAINT = [
  {
    label: 'Notify Admin',
    key: USER_ACTIONS_KEYS.NOTIFY_ADMIN
  },
  {
    label: 'Mark As Resolved',
    key: USER_ACTIONS_KEYS.MARKASRESOLVED
  }
]

export const COMPLAINT_LIFE_CYCLE: Map<string, string> = new Map([
  [COMPLAINT_STATUS.REOPENED, 'Reopen Complaint'],
  [COMPLAINT_STATUS.RESOLVED, 'Mark as resolved'],
  [COMPLAINT_STATUS.CLOSED,  'Close Complaint']
])
