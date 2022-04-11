import { ATLEAST_ONE_UPAR_CASE_REGEX, ATLEAST_ONE_SPECIAL_CHAR_REGEX, MIN_LENGTH } from './../../common/validator';
import { action, computed, makeObservable, observable } from 'mobx'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { FORM_KEYS, TEXT_FIELD_KEYS } from '../../common/constant'
import { get } from 'lodash'
import { log } from '../../config'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { validateRegex } from '../../utils/validator'
import { ATLEAST_ONE_NUMBER_REGEX } from '../../common/validator'
import { navigateSimple } from '../../service';

const DEFAULT_SETTINGS = {
  formData: {
    [FORM_KEYS.PASSWORD]: {
      [TEXT_FIELD_KEYS.KEY]: FORM_KEYS.PASSWORD,
      [TEXT_FIELD_KEYS.LABEL]: strings.INPUT_TEXT_PLACEHOLDERS.NEW_PASSWORD,
      [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
      [TEXT_FIELD_KEYS.IS_PASSWORD_FIELD]: true,
      [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
    },
    [FORM_KEYS.CONFIRM_PASSWORD]: {
      [TEXT_FIELD_KEYS.KEY]: FORM_KEYS.CONFIRM_PASSWORD,
      [TEXT_FIELD_KEYS.LABEL]: strings.INPUT_TEXT_PLACEHOLDERS.CONFIRM_NEW_PASSWORD,
      [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
      [TEXT_FIELD_KEYS.IS_PASSWORD_FIELD]: true,
      [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
    }
  }
}


export class SetPasswordDataStore implements RESPONSE_CALLBACKS {
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
      case FORM_KEYS.PASSWORD:
      case FORM_KEYS.CONFIRM_PASSWORD:
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

  @computed
  get isSubmitButtonDisabled() {
    const newPassword = this.formData[FORM_KEYS.PASSWORD][TEXT_FIELD_KEYS.INPUT_VALUE]
    const confirmPassword = this.formData[FORM_KEYS.CONFIRM_PASSWORD][TEXT_FIELD_KEYS.INPUT_VALUE]
    let isButtonDisabled = true
    if (newPassword === confirmPassword && newPassword?.length > 0 ) {
      const isPasswordValid = validateRegex(newPassword, ATLEAST_ONE_NUMBER_REGEX) && validateRegex(newPassword, ATLEAST_ONE_UPAR_CASE_REGEX)
          && validateRegex(newPassword, ATLEAST_ONE_SPECIAL_CHAR_REGEX) && validateRegex(newPassword, MIN_LENGTH)
      isButtonDisabled = !isPasswordValid
    }
    return isButtonDisabled
  }

  setNewPassword = async (code) => {
    const body = {
      'password': this.formData[FORM_KEYS.PASSWORD][TEXT_FIELD_KEYS.INPUT_VALUE] || '',
      'code': code
    }
    const registerUserRequest = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.SET_NEW_PASSWORD,
      apiId: API_IDS.SET_NEW_PASSWORD,
      reqParams: body,
    })
    await registerUserRequest.setRequestHeaders()
    await registerUserRequest.hitPostApi()
  }

  onSuccess(apiId: string, response: any) {
    switch (apiId) {
      case API_IDS.SET_NEW_PASSWORD:
        navigateSimple(undefined, 'SignIn')
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.SET_NEW_PASSWORD:
        showAndroidToastMessage(get(error, 'data', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        break
      default:
        break
    }
  }

}