import { action, makeObservable, observable } from 'mobx'
import { get, forEach } from 'lodash'
import { FILED_TYPE, SIGN_UP_USER_TYPE_MAP, TEXT_FIELD_KEYS, USER_DETAILS_KEYS } from '../../common/constant'
import { log } from '../../config'
import { capitalizeWords } from '../../utils/app-utils'

const DEFAULT_SETTING = {
  userInfoData: {},
  userProfileDisplayData: {}
}

export class UserDataStore {
  @observable userInfoData: any
  @observable userProfileDisplayData

  constructor() {
    this.init()
    makeObservable(this)
  }

  @action
  init() {
    Object.keys(DEFAULT_SETTING).forEach((key) => (this[key] = DEFAULT_SETTING[key]))
  }

  @action
  setUserProfileData = (userProfileData) => {
    this.userProfileDisplayData = { ...userProfileData}
  }

  constructUserProfileData = () => {
    const userFlatData = this.getUserFlatData()
    const { name: flatName = '' } = userFlatData || {}
    const userDetails = {
      [USER_DETAILS_KEYS.USER_NAME]: {
        [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.USER_NAME,
        [TEXT_FIELD_KEYS.LABEL]: 'Username',
        [TEXT_FIELD_KEYS.INPUT_VALUE]: this.getUserName(),
        [TEXT_FIELD_KEYS.IS_EDITABLE]: false,
        [TEXT_FIELD_KEYS.FILED_TYPE]: FILED_TYPE.STRING
      },
      [USER_DETAILS_KEYS.EMAIL]: {
        [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.EMAIL,
        [TEXT_FIELD_KEYS.INPUT_VALUE]: this.getUserEmailId(),
        [TEXT_FIELD_KEYS.LABEL]: 'Email Id',
        [TEXT_FIELD_KEYS.IS_EDITABLE]: false
      },
      [USER_DETAILS_KEYS.ROLE]: {
        [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.ROLE,
        [TEXT_FIELD_KEYS.INPUT_VALUE]: SIGN_UP_USER_TYPE_MAP.get(this.getUserRole()),
        [TEXT_FIELD_KEYS.LABEL]: 'Role',
        [TEXT_FIELD_KEYS.IS_EDITABLE]: false
      },
      [USER_DETAILS_KEYS.SOCIETY_NAME]: {
        [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.SOCIETY_NAME,
        [TEXT_FIELD_KEYS.INPUT_VALUE]: this.getSocietyName(),
        [TEXT_FIELD_KEYS.LABEL]: 'Society Name',
        [TEXT_FIELD_KEYS.IS_EDITABLE]: false
      },
      [USER_DETAILS_KEYS.SOCIETY_ADDRESS]: {
        [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.SOCIETY_ADDRESS,
        [TEXT_FIELD_KEYS.INPUT_VALUE]: this.getSocietyAddress(),
        [TEXT_FIELD_KEYS.LABEL]: 'Society Address',
        [TEXT_FIELD_KEYS.IS_EDITABLE]: false
      },
      [USER_DETAILS_KEYS.FLAT_NAME]: {
        [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.FLAT_NAME,
        [TEXT_FIELD_KEYS.INPUT_VALUE]: capitalizeWords(flatName),
        [TEXT_FIELD_KEYS.LABEL]: 'Flat Name',
        [TEXT_FIELD_KEYS.IS_EDITABLE]: false
      }
    }
    this.setUserProfileData(userDetails)
    log('userDetailsuserDetails', userDetails, this.userInfoData)
  }

  @action
  setUserInfoData = async (userInfoData) => {
    this.userInfoData = { ...userInfoData }
  }

  getUserId = () => {
    return get(this.userInfoData, '_id', '')
  }

  getFlatId = () => {
    return get(this.userInfoData, 'flat', '')
  }

  getUserRole = () => {
    return get(this.userInfoData, 'role', '')
  }

  getSocietyId = () => {
    return get(this.userInfoData, 'society._id', '')
  }

  getComplainContegories = () => {
    return get(this.userInfoData, 'society.complaintCategories', [])
  }

  getSocietyDetail = () => {
    return get(this.userInfoData, 'society', {})
  }

  getPropertyDetails = () => {
    return get(this.userInfoData, 'society.properties', [])
  }

  getUserName = () => get(this.userInfoData, 'name', '')

  getUserEmailId = () => get(this.userInfoData, 'email', '')

  getSocietyName = () => get(this.userInfoData, 'society.name', '')

  getUserFlatId = () => get(this.userInfoData, 'flat', '')

  getSocietyAddress = () => {
    const societyData = this.getSocietyDetail()
    return `${capitalizeWords(get(societyData, 'city', ''))}, ${capitalizeWords(get(societyData, 'state', ''))}, ${capitalizeWords(get(societyData, 'country', ''))}`.trim()
  }

  getUserFlatData = () => {
    const societyData = this.getSocietyDetail()
    const flatId = this.getUserFlatId()
    let userFlatData
    const { properties = [] } = societyData || {}
    forEach(properties, (property) => {
      const { floors = [] } = property || {}
      forEach(floors, (floor) => {
        const { flats = [] } = floor || {}
        forEach(flats, (flat) => {
          const { _id } = flat || {}
          if (_id === flatId) {
            userFlatData = { ...flat}
          }
        })
      })
    })
    return userFlatData
  }


}