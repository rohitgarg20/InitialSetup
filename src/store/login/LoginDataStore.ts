import { API_IDS, API_END_POINTS } from './../../common/ApiConfiguration';
import { RESPONSE_CALLBACKS } from './../../http-layer/BaseResponse';
import { action, makeObservable, observable } from 'mobx'
import { get } from 'lodash'
import { strings } from '../../common'
import { FORM_KEYS, TEXT_FIELD_KEYS } from '../../common/constant'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CODE } from '../../http-layer'
import axios from 'axios'
import { setAuthToken } from '../../utils/auth-utils';
import { showAndroidToastMessage } from '../../utils/app-utils';
import { setInititalStackName } from '../../service';
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
          [TEXT_FIELD_KEYS.INPUT_VALUE]: value
        }
        break
      default:
        break
    }
    this.updateFormData(tempFormData)
  }

  getConfigData = async () => {
    const getConfigRequest = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.GET_CONFIG,
      apiId: API_IDS.GET_CONFIG,
      promisify: true
    })
    return await getConfigRequest.hitGetApi()

  }

  registerUser = async () => {
    const configData = await this.getConfigData()
    const { data = {}, status  } = configData || {}
    if (status === RESPONSE_CODE.SUCCESS) {
      const { csrf_token }  = data
      setAuthToken(csrf_token)
      const body = {
        'username': this.formData[FORM_KEYS.EMAIL][TEXT_FIELD_KEYS.INPUT_VALUE] || '',
        'password': this.formData[FORM_KEYS.PASSWORD][TEXT_FIELD_KEYS.INPUT_VALUE] || '',
        '_csrf': csrf_token
      }
      log('registerUserregisterUserregisterUserregisterUser', body)
      const registerUserRequest = new BaseRequest(this, {
        methodType: 'POST',
        apiEndPoint: API_END_POINTS.LOGIN,
        apiId: API_IDS.LOGIN,
        reqParams: body,
        reqHeaders: {
          'x-csrf-token': csrf_token
        }
      })
      await registerUserRequest.setRequestHeaders()
      await registerUserRequest.hitPostApi()
    }
  }

  getLoggedInUserInfo = async () => {
    const loginUser = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.GET_USER_INFO,
      apiId: API_IDS.GET_USER_INFO
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitGetApi()
  }

  onSuccess(apiId: string, response: any) {
    switch (apiId) {
      case API_IDS.LOGIN:
        setInititalStackName('bottomTabBar')
        this.getLoggedInUserInfo()
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.LOGIN:
        showAndroidToastMessage(get(error, 'data', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        break
      default:
        break
    }
  }

}