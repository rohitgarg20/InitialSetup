import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { get, reduce, isEmpty } from 'lodash'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { log } from '../../config'
import { capitalizeWords, getKeyByValue, jsonParseData, showAndroidToastMessage, stringifyData } from '../../utils/app-utils'
import { getCreatePasswordErrorMsg, getInValidUserNameErrorMsg, isUserNameValid, strings } from '../../common'
import { action, makeObservable, observable } from 'mobx'
import { FILED_TYPE, SIGN_UP_USERS_TYPE, SIGN_UP_USER_TYPE_MAP, TEXT_FIELD_KEYS, USER_DETAILS_KEYS } from '../../common/constant'
import { navigateSimple, setInititalStackName } from '../../service'
import { STACK_NAMES } from '../../navigator'

const USER_DETAILS = {
  [USER_DETAILS_KEYS.USER_NAME]: {
    [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.USER_NAME,
    [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
    [TEXT_FIELD_KEYS.LABEL]: 'Username *',
    [TEXT_FIELD_KEYS.ERROR_MESSAGE]: '',
    [TEXT_FIELD_KEYS.IS_REQUIRED]: true,
    [TEXT_FIELD_KEYS.IS_EDITABLE]: true,
    [TEXT_FIELD_KEYS.FILED_TYPE]: FILED_TYPE.STRING
  },
  [USER_DETAILS_KEYS.PASSWORD]: {
    [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.PASSWORD,
    [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
    [TEXT_FIELD_KEYS.LABEL]: 'Password *',
    [TEXT_FIELD_KEYS.ERROR_MESSAGE]: '',
    [TEXT_FIELD_KEYS.IS_REQUIRED]: true,
    [TEXT_FIELD_KEYS.IS_EDITABLE]: true,
    [TEXT_FIELD_KEYS.FILED_TYPE]: FILED_TYPE.STRING,
    [TEXT_FIELD_KEYS.IS_PASSWORD_FIELD]: true
  },
  [USER_DETAILS_KEYS.CONFIRM_PASSWORD]: {
    [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.CONFIRM_PASSWORD,
    [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
    [TEXT_FIELD_KEYS.LABEL]: 'Confirm Password *',
    [TEXT_FIELD_KEYS.ERROR_MESSAGE]: '',
    [TEXT_FIELD_KEYS.IS_REQUIRED]: true,
    [TEXT_FIELD_KEYS.IS_EDITABLE]: true,
    [TEXT_FIELD_KEYS.FILED_TYPE]: FILED_TYPE.STRING,
    [TEXT_FIELD_KEYS.IS_PASSWORD_FIELD]: true
  },
  [USER_DETAILS_KEYS.EMAIL]: {
    [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.EMAIL,
    [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
    [TEXT_FIELD_KEYS.LABEL]: 'Email Id *',
    [TEXT_FIELD_KEYS.ERROR_MESSAGE]: '',
    [TEXT_FIELD_KEYS.IS_REQUIRED]: true,
    [TEXT_FIELD_KEYS.IS_EDITABLE]: false,
    [TEXT_FIELD_KEYS.FILED_TYPE]: FILED_TYPE.STRING
  },
  [USER_DETAILS_KEYS.DOB]: {
    [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.DOB,
    [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
    [TEXT_FIELD_KEYS.LABEL]: 'Date of Birth',
    [TEXT_FIELD_KEYS.ERROR_MESSAGE]: '',
    [TEXT_FIELD_KEYS.IS_REQUIRED]: false,
    [TEXT_FIELD_KEYS.IS_EDITABLE]: true,
    [TEXT_FIELD_KEYS.FILED_TYPE]: FILED_TYPE.DATE
  },
  [USER_DETAILS_KEYS.EMP_ID]: {
    [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.EMP_ID,
    [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
    [TEXT_FIELD_KEYS.LABEL]: 'Employee Id',
    [TEXT_FIELD_KEYS.ERROR_MESSAGE]: '',
    [TEXT_FIELD_KEYS.IS_REQUIRED]: false,
    [TEXT_FIELD_KEYS.IS_EDITABLE]: true,
    [TEXT_FIELD_KEYS.FILED_TYPE]: FILED_TYPE.STRING
  },
  [USER_DETAILS_KEYS.ROLE]: {
    [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.ROLE,
    [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
    [TEXT_FIELD_KEYS.LABEL]: 'Role *',
    [TEXT_FIELD_KEYS.ERROR_MESSAGE]: '',
    [TEXT_FIELD_KEYS.IS_REQUIRED]: true,
    [TEXT_FIELD_KEYS.IS_EDITABLE]: false,
    [TEXT_FIELD_KEYS.FILED_TYPE]: FILED_TYPE.STRING
  },
  [USER_DETAILS_KEYS.SOCIETY_NAME]: {
    [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.SOCIETY_NAME,
    [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
    [TEXT_FIELD_KEYS.LABEL]: 'Society Name',
    [TEXT_FIELD_KEYS.ERROR_MESSAGE]: '',
    [TEXT_FIELD_KEYS.IS_REQUIRED]: true,
    [TEXT_FIELD_KEYS.IS_EDITABLE]: false,
    [TEXT_FIELD_KEYS.FILED_TYPE]: FILED_TYPE.STRING
  },
  [USER_DETAILS_KEYS.SOCIETY_ADDRESS]: {
    [TEXT_FIELD_KEYS.KEY]: USER_DETAILS_KEYS.SOCIETY_ADDRESS,
    [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
    [TEXT_FIELD_KEYS.LABEL]: 'Society Address',
    [TEXT_FIELD_KEYS.ERROR_MESSAGE]: '',
    [TEXT_FIELD_KEYS.IS_REQUIRED]: true,
    [TEXT_FIELD_KEYS.IS_EDITABLE]: false,
    [TEXT_FIELD_KEYS.FILED_TYPE]: FILED_TYPE.STRING
  }
}

const DEFAULT_SETTINGS = {
  userRegisterType: '',
  emailId: '',
  userDetails: { ...USER_DETAILS},
}

export class RegisterUserDataStore implements RESPONSE_CALLBACKS {

  @observable userDetails
  userRegisterType
  emailId

  constructor() {
    this.init()
    makeObservable(this)
  }

  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }

  setUserRegisterType = (value: SIGN_UP_USERS_TYPE) => {
    this.userRegisterType = value
  }

  setEmailId = (emailId) => {
    this.emailId = emailId
  }

  @action
  updateUserDetails = ( tempUserDetails) => {
    this.userDetails = { ...tempUserDetails}
    log('this.userDetailsthis.userDetails', this.userDetails)
  }

  @action
  resetUserDetails = () => {
    this.userDetails = { ...USER_DETAILS}
  }

  @action
  updateUserDetailsByKey = (keyToUpdate, updatedObj) => {
    const tempUserDetails = { ...this.userDetails}
    tempUserDetails[keyToUpdate] = { ...updatedObj }
    this.updateUserDetails(tempUserDetails)
  }

  onChangeUserDetails = (filedToUpdate, value, fieldType) => {
    const { PASSWORD, CONFIRM_PASSWORD } = USER_DETAILS_KEYS

    const updatedDataObj = {
      ...get(this.userDetails, `${filedToUpdate}`, {}),
      [TEXT_FIELD_KEYS.INPUT_VALUE]: value,
      [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
    }
    this.updateUserDetailsByKey(filedToUpdate, updatedDataObj)
    if (filedToUpdate === PASSWORD) {
      this.updateUserDetailsByKey(CONFIRM_PASSWORD, {
        ...get(this.userDetails, `${CONFIRM_PASSWORD}`, {}),
        [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
      })
    }
    if (filedToUpdate === CONFIRM_PASSWORD) {
      this.updateUserDetailsByKey(PASSWORD, {
        ...get(this.userDetails, `${PASSWORD}`, {}),
        [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
      })
    }
  }

  isUserDetailsValid = () => {
    const userDetailsKeys = Object.keys(this.userDetails)
    const { PASSWORD, CONFIRM_PASSWORD } = USER_DETAILS_KEYS
    const { INPUT_VALUE, ERROR_MESSAGE} = TEXT_FIELD_KEYS
    let isFormValid = true
    const formattedData = reduce(userDetailsKeys, (userDetailsObj, userKey) => {
      const { inputValue } = this.userDetails[userKey]
      const updatedObj = { ...this.userDetails[userKey] }
      if (userKey === USER_DETAILS_KEYS.USER_NAME) {
        updatedObj[ERROR_MESSAGE] = getInValidUserNameErrorMsg(inputValue)
      }
      if (userKey === PASSWORD) {
        updatedObj[ERROR_MESSAGE] = getCreatePasswordErrorMsg(inputValue, this.userDetails[CONFIRM_PASSWORD][INPUT_VALUE])
      }

      if (userKey === CONFIRM_PASSWORD) {
        updatedObj[ERROR_MESSAGE] = getCreatePasswordErrorMsg(this.userDetails[PASSWORD][INPUT_VALUE], inputValue )
      }
      if (isFormValid && updatedObj[ERROR_MESSAGE]?.length > 0) {
        isFormValid = false
      }
      userDetailsObj[userKey] = updatedObj
      return userDetailsObj
    }, {})
    this.updateUserDetails(formattedData)
    return isFormValid
  }

  getInputValueByKey = (key) => this.userDetails?.[key]?.[TEXT_FIELD_KEYS.INPUT_VALUE] || ''

  getEmailId = () => this.emailId.trim() || ''

  getUserRegistrationType = () => this.userRegisterType || ''

  setInitialUserDetails = (responseData) => {
    const societyData = get(responseData, 'society[0]', {})
    const societyName = get(societyData, 'name', '').trim()
    const societyAdd = `${capitalizeWords(get(societyData, 'city', ''))}, ${capitalizeWords(get(societyData, 'state', ''))}, ${capitalizeWords(get(societyData, 'country', ''))}`
    const initalDataObj = {
      [USER_DETAILS_KEYS.EMAIL]: {
        [TEXT_FIELD_KEYS.INPUT_VALUE]: this.getEmailId()
      },
      [USER_DETAILS_KEYS.SOCIETY_NAME]: {
        [TEXT_FIELD_KEYS.INPUT_VALUE]: societyName
      },
      [USER_DETAILS_KEYS.SOCIETY_ADDRESS]: {
        [TEXT_FIELD_KEYS.INPUT_VALUE]: societyAdd.trim(),
        [TEXT_FIELD_KEYS.ADDITIONAL_DATA]: {
          societyId: get(societyData, '_id')
        }
      },
      [USER_DETAILS_KEYS.ROLE]: {
        [TEXT_FIELD_KEYS.INPUT_VALUE]: SIGN_UP_USER_TYPE_MAP.get(this.getUserRegistrationType())
      }
    }
    const tempUserDetails = jsonParseData(stringifyData({ ...this.userDetails }))
    for (const key in tempUserDetails) {
      if (initalDataObj.hasOwnProperty(key)) {
        tempUserDetails[key][TEXT_FIELD_KEYS.INPUT_VALUE] = initalDataObj[key][TEXT_FIELD_KEYS.INPUT_VALUE] || ''
        if (!isEmpty(initalDataObj[key][TEXT_FIELD_KEYS.ADDITIONAL_DATA]))
          tempUserDetails[key][TEXT_FIELD_KEYS.ADDITIONAL_DATA] = initalDataObj[key][TEXT_FIELD_KEYS.ADDITIONAL_DATA]
      }
    }
    this.updateUserDetails(tempUserDetails)
  }



  getSocietyId = () => this.userDetails?.[USER_DETAILS_KEYS.SOCIETY_ADDRESS]?.[TEXT_FIELD_KEYS.ADDITIONAL_DATA]?.societyId || ''

  saveUserDetailsAndRegister = async () => {
    const { USER_NAME, EMP_ID, DOB, EMAIL, ROLE, PASSWORD } = USER_DETAILS_KEYS
    log('this.isUserDetailsValid()', this.isUserDetailsValid())
    if (this.isUserDetailsValid()) {
      const body = {
        'societyId': this.getSocietyId(),
        'name': this.getInputValueByKey(USER_NAME),
        'empId': this.getInputValueByKey(EMP_ID),
        'DOB': this.getInputValueByKey(DOB),
        // 'image': Joi.string().optional(),
        'password': this.getInputValueByKey(PASSWORD),
        'email': this.getInputValueByKey(EMAIL),
        'role': getKeyByValue(SIGN_UP_USER_TYPE_MAP, this.getInputValueByKey(ROLE))
      }
      const addPersonalDetails = new BaseRequest(this, {
        methodType: 'POST',
        apiEndPoint: API_END_POINTS.ADD_PERSONAL_DETAILS,
        apiId: API_IDS.ADD_PERSONAL_DETAILS,
        reqParams: body,
        prefetch: true
      })

      await addPersonalDetails.setRequestHeaders()
      await addPersonalDetails.hitPostApi()
    }
  }

  registerUserByEmail = async (emailId) => {
    this.setEmailId(emailId)
    const body = {
      'email': emailId.trim()
    }
    const registerUserRequest = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.REGISTER_USER_BY_MAIL,
      apiId: API_IDS.REGISTER_USER_BY_MAIL,
      reqParams: body,
      prefetch: true
    })

    await registerUserRequest.setRequestHeaders()
    await registerUserRequest.hitPostApi()
  }

  getDetailsBySocietyId = async (societyId) => {
    const body = {
      'societyId': societyId.trim()
    }
    const registerUserRequest = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.SEARCH_SOCIET_BY_ID,
      apiId: API_IDS.SEARCH_SOCIET_BY_ID,
      reqParams: body,
      prefetch: true
    })

    await registerUserRequest.setRequestHeaders()
    await registerUserRequest.hitPostApi()
  }

  verifyEmailOtp = async (otp) => {
    const body = {
      'otp': otp
    }
    const registerUserRequest = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.VERIFY_EMAIL_OTP,
      apiId: API_IDS.VERIFY_EMAIL_OTP,
      reqParams: body,
      prefetch: true
    })

    await registerUserRequest.setRequestHeaders()
    await registerUserRequest.hitPostApi()
  }

  async onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response)
    switch (apiId) {
      case API_IDS.REGISTER_USER_BY_MAIL:
        navigateSimple(undefined, 'OtpVerificationScreen', {
          emailId: this.emailId,
          onResendOtp: () => this.registerUserByEmail(this.emailId),
          onVerifyOtp: (otp) => this.verifyEmailOtp(otp)
        })
        // setInititalStackName(STACK_NAMES.SOCIETY_DETAIL)
        break

      case API_IDS.VERIFY_EMAIL_OTP:
        navigateSimple(undefined, 'SearchSocietyScreen')
        break
      case API_IDS.SEARCH_SOCIET_BY_ID:
        navigateSimple(undefined, 'RegisterUserDetailScreen')
        this.setInitialUserDetails(response)
        break
      case API_IDS.ADD_PERSONAL_DETAILS:
        navigateSimple(undefined, 'LoginScreen')
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    const responseData = get(error, 'data', {})
    switch (apiId) {
      case API_IDS.REGISTER_USER_BY_MAIL:
      case API_IDS.SEARCH_SOCIET_BY_ID:
      case API_IDS.ADD_PERSONAL_DETAILS:
      // case API_IDS.VERIFY_EMAIL_OTP:
        showAndroidToastMessage(get(responseData, 'message', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        break
      case API_IDS.VERIFY_EMAIL_OTP:
        showAndroidToastMessage(get(responseData, 'message', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        // navigateSimple(undefined, 'SearchSocietyScreen')
        break

      default:
        break
    }
  }
}