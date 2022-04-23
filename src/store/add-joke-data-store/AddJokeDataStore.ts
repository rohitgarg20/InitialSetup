import { action, makeObservable, observable } from 'mobx'
import { get } from 'lodash'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { FORM_KEYS, TEXT_FIELD_KEYS } from '../../common/constant'
import { log } from '../../config'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { emailIdValidator } from '../../utils/validator'
import { goBack } from '../../service'

const DEFAULT_SETTINGS = {
  formData: {
    [FORM_KEYS.NAME]: {
      [TEXT_FIELD_KEYS.KEY]: FORM_KEYS.NAME,
      [TEXT_FIELD_KEYS.LABEL]: strings.INPUT_TEXT_PLACEHOLDERS.FULL_NAME,
      [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
      [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
    },
    [FORM_KEYS.EMAIL]: {
      [TEXT_FIELD_KEYS.KEY]: FORM_KEYS.EMAIL,
      [TEXT_FIELD_KEYS.LABEL]: strings.INPUT_TEXT_PLACEHOLDERS.EMAIL_ID,
      [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
      [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
    }
  },
  joke: {
    [TEXT_FIELD_KEYS.KEY]: FORM_KEYS.JOKE,
    [TEXT_FIELD_KEYS.LABEL]: strings.INPUT_TEXT_PLACEHOLDERS.ENTER_JOKE,
    [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
    [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
  },
}

export class AddJokeDataStore implements RESPONSE_CALLBACKS{
  @observable formData
  @observable joke

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
  updateJokeData = (jokeData) => {
    this.joke = { ...jokeData}
  }

  validateFormFields = () => {
    const emailId = (this.formData[FORM_KEYS.EMAIL][TEXT_FIELD_KEYS.INPUT_VALUE] || '').trim()
    const isEmailValid = emailIdValidator(emailId)
    const username = (this.formData[FORM_KEYS.NAME][TEXT_FIELD_KEYS.INPUT_VALUE] || '').trim()
    const isUserNameValid = username?.length > 2
    const jokeContent = (this.joke[TEXT_FIELD_KEYS.INPUT_VALUE] || '').trim()
    const isContentValid = jokeContent?.length > 5
    if (isEmailValid && isUserNameValid && isContentValid) {
      this.addNewJoke()
    } else {
      const tempFormData = { ...this.formData}
      let tempJoke = { ...this.joke}
      if (!isEmailValid) {
        tempFormData[FORM_KEYS.EMAIL] = {
          ...tempFormData[FORM_KEYS.EMAIL],
          [TEXT_FIELD_KEYS.ERROR_MESSAGE]: strings.ERROR_MESSAGES.VALID_EMAIL_ID
        }
      } if (!isUserNameValid) {
        tempFormData[FORM_KEYS.NAME] = {
          ...tempFormData[FORM_KEYS.NAME],
          [TEXT_FIELD_KEYS.ERROR_MESSAGE]: strings.ERROR_MESSAGES.INVALID_USERNAME
        }
      }
      if (!isContentValid) {
        tempJoke = {
          ...tempJoke,
          [TEXT_FIELD_KEYS.ERROR_MESSAGE]: strings.ERROR_MESSAGES.INVALID_JOKE_CONTENT
        }
      }
      this.updateJokeData(tempJoke)
      this.updateFormData(tempFormData)
    }
  }

  addNewJoke = async () => {
    const body = {
      'author_name': (this.formData[FORM_KEYS.NAME][TEXT_FIELD_KEYS.INPUT_VALUE] || '').trim(),
      'email': (this.formData[FORM_KEYS.EMAIL][TEXT_FIELD_KEYS.INPUT_VALUE] || '').trim(),
      'content': (this.joke[TEXT_FIELD_KEYS.INPUT_VALUE] || '').trim(),
    }
    const registerUserRequest = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.ADD_JOKE,
      apiId: API_IDS.ADD_JOKE,
      reqParams: body,
    })
    await registerUserRequest.setRequestHeaders()
    await registerUserRequest.hitPostApi()
  }

  @action
  onChangeText = (key, value) => {

    switch (key) {
      case FORM_KEYS.NAME:
      case FORM_KEYS.EMAIL:
        const tempFormData = { ...this.formData}
        tempFormData[key] = {
          ...tempFormData[key],
          [TEXT_FIELD_KEYS.INPUT_VALUE]: value,
          [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
        }
        this.updateFormData(tempFormData)
        break
      case FORM_KEYS.JOKE:
        let tempJokeData = { ...this.joke}
        tempJokeData = {
          ...tempJokeData,
          [TEXT_FIELD_KEYS.INPUT_VALUE]: value,
          [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
        }
        this.updateJokeData(tempJokeData)
        break
      default:
        break
    }
  }

  onSuccess(apiId: string, response: any) {
    switch (apiId) {
      case API_IDS.ADD_JOKE:
        goBack(undefined)
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.ADD_JOKE:
        showAndroidToastMessage(get(error, 'data', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        break
      default:
        break
    }
  }

}