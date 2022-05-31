import { showLoader } from './../../service/LoaderDataService'
import { API_IDS, API_END_POINTS } from './../../common/ApiConfiguration'
import { RESPONSE_CALLBACKS } from './../../http-layer/BaseResponse'
import { action, makeObservable, observable } from 'mobx'
import { get, reduce } from 'lodash'
import { getInValidEmailErrorMsg, getPasswordEmptyErrorMsg, strings } from '../../common'
import { FORM_KEYS, TEXT_FIELD_KEYS } from '../../common/constant'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CODE } from '../../http-layer'
import axios from 'axios'
import { setAuthToken, setRefreshToken } from '../../utils/auth-utils'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { setInititalStackName } from '../../service'
import { getScreenNameToNavigateToOnLogin } from '../../service/UserNavigationService'
import { Keyboard } from 'react-native'
// import { getScreenNameToNavigateToOnLogin } from '../../service/UserNavigationService';
// tslint:disable-next-line: no-var-requires
// import * as https from 'https'


const DEFAULT_SETTINGS = {
  formData: {
    [FORM_KEYS.EMAIL]: {
      [TEXT_FIELD_KEYS.KEY]: FORM_KEYS.EMAIL,
      [TEXT_FIELD_KEYS.LABEL]: strings.INPUT_TEXT_PLACEHOLDERS.EMAIL,
      [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
      [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
    },
    [FORM_KEYS.PASSWORD]: {
      [TEXT_FIELD_KEYS.KEY]: FORM_KEYS.PASSWORD,
      [TEXT_FIELD_KEYS.LABEL]: strings.INPUT_TEXT_PLACEHOLDERS.PASSWORD,
      [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
      [TEXT_FIELD_KEYS.IS_PASSWORD_FIELD]: true,
      [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
    }
  }
}

export class LoginDataStore implements RESPONSE_CALLBACKS{
  @observable formData

  constructor() {
    this.init()
    makeObservable(this)
  }

  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }

  @action
  updateFormData = (formData) => {
    this.formData = { ...formData}
  }

  @action
  onChangeText = (key, value) => {
    const tempFormData = { ...this.formData}

    switch (key) {
      case FORM_KEYS.EMAIL:
      case FORM_KEYS.PASSWORD:
        tempFormData[key] = {
          ...tempFormData[key],
          [TEXT_FIELD_KEYS.INPUT_VALUE]: value,
          [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
        }
        break
      default:
        break
    }
    this.updateFormData(tempFormData)
  }

  getInputValueByKey = (key) => this.formData?.[key]?.[TEXT_FIELD_KEYS.INPUT_VALUE] || ''


  loginUser = async () => {
    Keyboard.dismiss()
    if (this.isUserDetailsValid()) {
      const body = {
        'email': this.getInputValueByKey(FORM_KEYS.EMAIL).trim(),
        'password': this.getInputValueByKey(FORM_KEYS.PASSWORD)
      }
      const registerUserRequest = new BaseRequest(this, {
        methodType: 'POST',
        apiEndPoint: API_END_POINTS.LOGIN,
        apiId: API_IDS.LOGIN,
        reqParams: body,
        prefetch: true
      })
      await registerUserRequest.setRequestHeaders()
      await registerUserRequest.hitPostApi()
    }
  }

  isUserDetailsValid = () => {
    const userDetailsKeys = Object.keys(this.formData)
    const { EMAIL, PASSWORD } = FORM_KEYS
    const { INPUT_VALUE, ERROR_MESSAGE} = TEXT_FIELD_KEYS
    let isFormValid = true
    const formattedData = reduce(userDetailsKeys, (userDetailsObj, userKey) => {
      const { inputValue } = this.formData[userKey]
      const updatedObj = { ...this.formData[userKey] }
      if (userKey === EMAIL) {
        updatedObj[ERROR_MESSAGE] = getInValidEmailErrorMsg(inputValue)
      }
      if (userKey === PASSWORD) {
        updatedObj[ERROR_MESSAGE] = getPasswordEmptyErrorMsg(inputValue)
      }

      if (isFormValid && updatedObj[ERROR_MESSAGE]?.length > 0) {
        isFormValid = false
      }
      userDetailsObj[userKey] = updatedObj
      return userDetailsObj
    }, {})
    this.updateFormData(formattedData)
    return isFormValid
  }

  //   getLoggedInUserInfo = async () => {
  //     const loginUser = new BaseRequest(this, {
  //       methodType: 'GET',
  //       apiEndPoint: API_END_POINTS.GET_USER_INFO,
  //       apiId: API_IDS.GET_USER_INFO
  //     })
  //     await loginUser.setRequestHeaders()
  //     await loginUser.hitGetApi()
  //   }

  async onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response)
    switch (apiId) {
      case API_IDS.LOGIN:
        showLoader()
        setRefreshToken(get(response, 'tokens.refresh.token'))
        setTimeout(async () => {
          const initialRoute =  await getScreenNameToNavigateToOnLogin()
          log('initialRouteinitialRoute', initialRoute)
          setInititalStackName(initialRoute)
        }, 0)
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    const responseData = get(error, 'data', {})
    switch (apiId) {
      case API_IDS.LOGIN:
        showAndroidToastMessage(get(responseData, 'message', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        break
      default:
        break
    }
  }

}