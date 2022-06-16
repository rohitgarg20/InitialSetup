import { capitalizeFirstLetterOnly } from './../../utils/app-utils';
import { observable, makeObservable, action } from 'mobx'
import { get } from 'lodash'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { FORM_KEYS, TEXT_FIELD_KEYS } from '../../common/constant'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { emailIdValidator, validateOtp } from '../../utils/validator'
import { navigateSimple } from '../../service'
import { IJokeItem } from '../interfaces';

const DEFAULT_SETTINGS = {
  formData: {
    [FORM_KEYS.EMAIL]: {
      [TEXT_FIELD_KEYS.KEY]: FORM_KEYS.EMAIL,
      [TEXT_FIELD_KEYS.LABEL]: strings.INPUT_TEXT_PLACEHOLDERS.EMAIL,
      [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
      [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
    }
  },
  showOtpView: false,
  jokesList: []
}

export class ResetPasswordDataStore implements RESPONSE_CALLBACKS {

  @observable formData
  @observable showOtpView
  @observable jokesList: IJokeItem[]


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

  onSendOtpButtonPressed = () => {
    const emailId = this.getEmailId()
    const isEmailIdValid = emailIdValidator(emailId)
    if (isEmailIdValid) {
      this.sendOtpOnEmail()
    } else {
      const tempFormData = { ...this.formData}
      tempFormData[FORM_KEYS.EMAIL] = {
        ...tempFormData[FORM_KEYS.EMAIL],
        [TEXT_FIELD_KEYS.ERROR_MESSAGE]: strings.ERROR_MESSAGES.VALID_EMAIL_ID
      }
      this.updateFormData(tempFormData)
    }
  }

  getEmailId = () => {
    return (this.formData[FORM_KEYS.EMAIL][TEXT_FIELD_KEYS.INPUT_VALUE] || '').trim()
  }

  sendOtpOnEmail = async () => {
    const body = {
      'email': this.getEmailId()
    }
    log('registerUserregisterUserregisterUserregisterUser', body)
    const registerUserRequest = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.SEND_OTP_EMAIL,
      apiId: API_IDS.SEND_OTP_EMAIL,
      reqParams: body
    })
    await registerUserRequest.setRequestHeaders()
    await registerUserRequest.hitPostApi()
  }

  verifyOtpEmail = async(otp) => {
    const body = {
      'password': this.getEmailId(),
      'otp': otp
    }
    log('registerUserregisterUserregisterUserregisterUser', body)
    const registerUserRequest = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.VERIFY_OTP,
      apiId: API_IDS.VERIFY_OTP,
      reqParams: body
    })
    await registerUserRequest.setRequestHeaders()
    await registerUserRequest.hitPostApi()
  }

  getJokesList = async () => {
    const registerUserRequest = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.ADD_JOKE,
      apiId: API_IDS.ADD_JOKE,
      prefetch: true
    })
    await registerUserRequest.setRequestHeaders()
    await registerUserRequest.hitGetApi()
  }

  onSubmitOtpButtonPressed = (otpValue) => {
    const isOtpValid = validateOtp(otpValue)
    log('onSubmitOtpButtonPressedonSubmitOtpButtonPressed', otpValue)
    if (isOtpValid) {
      this.verifyOtpEmail(otpValue)
    } else {
      showAndroidToastMessage(strings.ERROR_MESSAGES.ERR_MSG_INVALID_OTP)
    }
  }

  @action
  updateOtpViewState = (value) => {
    this.showOtpView = value
  }

  @action
  setJokesList = (jokesList) => {
    this.jokesList = [ ...jokesList]
  }

  constructJokesList = (jokesList) => {
    const formattedList: IJokeItem[] = jokesList.map((jokeItem) => {
      const { content = '', author_name = '', _id, tid } = jokeItem || {}
      return {
        authorName: capitalizeFirstLetterOnly(author_name),
        content: capitalizeFirstLetterOnly(content),
        jokeId: tid,
        id: _id
      }
    })
    return formattedList
  }

  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response,  get(response, 'response.code'))
    switch (apiId) {
      case API_IDS.SEND_OTP_EMAIL:
        this.updateOtpViewState(true)
        break
      case API_IDS.VERIFY_OTP:
        navigateSimple(undefined, 'SetPasswordScreen', {
          code: get(response, 'response.code')
        })
        break
      case API_IDS.ADD_JOKE:
        const list = this.constructJokesList(get(response, 'response.data'))
        this.setJokesList(list)
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.SEND_OTP_EMAIL:
      case API_IDS.VERIFY_OTP:
        showAndroidToastMessage(get(error, 'data.status.message', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        break
      default:
        break
    }
  }
}