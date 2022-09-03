export const REMOVE_LOG = false
export const BASE_URL = ''

export const HEADER_TOP = -50

export const OPTIONS_KEY = {
  NEW_VISITOR: 'NEW_VISITOR',
  NEW_VENDOR: 'NEW_VENDOR',
  STAFF: 'STAFF',
  RESIDENT_ENTRY: 'RESIDENT_ENTRY',
  APPROVALS: 'APPROVALS',
  IN_OUT_REGISTER: 'IN_OUT_REGISTER'
}
export const OPTIONS_LIST = [
  {
    label: 'New Visitor',
    icon: '',
    key: OPTIONS_KEY.NEW_VISITOR
  },
  {
    label: 'New Vendor',
    icon: '',
    key: OPTIONS_KEY.NEW_VENDOR
  },
  {
    label: 'Staff',
    icon: '',
    key: OPTIONS_KEY.STAFF
  },
  {
    label: 'Resident Entry',
    icon: '',
    key: OPTIONS_KEY.RESIDENT_ENTRY
  },
  {
    label: 'Approvals',
    icon: '',
    key: OPTIONS_KEY.APPROVALS
  },
  {
    label: 'In-Out Register',
    icon: '',
    key: OPTIONS_KEY.IN_OUT_REGISTER
  }
]

export const VISITORS_TYPE_KEY = {
  RESIDENTS: 'Resident',
  VISITOR: 'Visitor',
  VENDOR: 'Vendor',
  STAFF: 'Staff'
}

export const IN_OUT_REGISTER_TAB = [
  {
    label: 'All',
    isSelected: true,
    key: ''
  },
  {
    label: 'Residents',
    isSelected: false,
    key: VISITORS_TYPE_KEY.RESIDENTS
  },
  {
    label: 'Visitors',
    isSelected: false,
    key: VISITORS_TYPE_KEY.VISITOR
  },
  {
    label: 'Vendors',
    isSelected: false,
    key: VISITORS_TYPE_KEY.VENDOR
  },
  {
    label: 'Staff',
    isSelected: false,
    key: VISITORS_TYPE_KEY.STAFF
  }
]


export const GET_DATA_BY_VISITOR_TYPE: Map<string, any> = new Map([
  [
    VISITORS_TYPE_KEY.RESIDENTS, {
      displayLabel: 'Resident',
      bgColor: '#86B7FF'
    }
  ],
  [
    VISITORS_TYPE_KEY.VISITOR, {
      displayLabel: 'Visitor',
      bgColor: '#D065D6'
    }
  ],
  [
    VISITORS_TYPE_KEY.VENDOR, {
      displayLabel: 'Vendor',
      bgColor: '#FF6565'
    }
  ],
  [
    VISITORS_TYPE_KEY.STAFF, {
      displayLabel: 'Staff',
      bgColor: '#D065D6'
    }
  ]
])

export const FILTERED_BY_STATUS_KEY = {
  ENTERED: 'Entered',
  EXITED: 'Exited'
}

export const FILTERED_BY_STATUS = [
  {
    isSelected: true,
    displayLabel: 'Entered',
    key: FILTERED_BY_STATUS_KEY.ENTERED
  },
  {
    isSelected: false,
    displayLabel: 'Exited',
    key: FILTERED_BY_STATUS_KEY.EXITED
  }]


export enum YES_NO_KEYS {
  YES = 'YES',
  NO = 'NO'
}

export const ACTIONS_ALLOWED = [
  {
    id: YES_NO_KEYS.YES,
    displayLabel: 'Yes'
  },
  {
    id: YES_NO_KEYS.NO,
    displayLabel: 'No'
  }]


export const DAYS_NAME = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export enum BACK_ICON_TYPES {
  DEFAULT = 'default',
  CARET = 'caret'
}