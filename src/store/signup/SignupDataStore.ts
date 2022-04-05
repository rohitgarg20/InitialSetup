import { action, makeObservable, observable } from 'mobx'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { FORM_KEYS, TEXT_FIELD_KEYS } from '../../common/constant'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { get } from 'lodash'
import { navigateSimple } from '../../service'

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
    },
    [FORM_KEYS.PASSWORD]: {
      [TEXT_FIELD_KEYS.KEY]: FORM_KEYS.PASSWORD,
      [TEXT_FIELD_KEYS.LABEL]: strings.INPUT_TEXT_PLACEHOLDERS.CREATE_PASSWORD,
      [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
      [TEXT_FIELD_KEYS.IS_PASSWORD_FIELD]: true,
      [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
    },
    [FORM_KEYS.CONFIRM_PASSWORD]: {
      [TEXT_FIELD_KEYS.KEY]: FORM_KEYS.CONFIRM_PASSWORD,
      [TEXT_FIELD_KEYS.LABEL]: strings.INPUT_TEXT_PLACEHOLDERS.CONFIRRM_PASSWORD,
      [TEXT_FIELD_KEYS.INPUT_VALUE]: '',
      [TEXT_FIELD_KEYS.IS_PASSWORD_FIELD]: true,
      [TEXT_FIELD_KEYS.ERROR_MESSAGE]: ''
    }
  },
  reviews: [{
    heading: 'A peak into the DT Universe',
    content: '"I took up the curated learning challenges and was trying to master the art of execution along with Avantika. It enables me to add value to my child’s learning”.',
    userName: 'Sudhir Menon',
    userType: 'Young Researcher',
    grade: 'Grade VI',
    profileImage: '/assets/uploads/files/profile/18-profileavatar.png'
  },
  {
    heading: 'A peak into the DT Universe',
    content: '"I took up the curated learning challenges and was trying to master the art of execution along with Avantika. It enables me to add value to my child’s learning”.',
    userName: 'Sudhir Menon',
    userType: 'Young Researcher',
    grade: 'Grade VI',
    profileImage: '/assets/uploads/files/profile/18-profileavatar.png'
  },
  {
    heading: 'A peak into the DT Universe',
    content: '"I took up the curated learning challenges and was trying to master the art of execution along with Avantika. It enables me to add value to my child’s learning”.',
    userName: 'Sudhir Menon',
    userType: 'Young Researcher',
    grade: 'Grade VI',
    profileImage: '/assets/uploads/files/profile/18-profileavatar.png'
  },
  {
    heading: 'A peak into the DT Universe',
    content: '"I took up the curated learning challenges and was trying to master the art of execution along with Avantika. It enables me to add value to my child’s learning”.',
    userName: 'Sudhir Menon',
    userType: 'Young Researcher',
    grade: 'Grade VI',
    profileImage: '/assets/uploads/files/profile/18-profileavatar.png'
  },
  {
    heading: 'A peak into the DT Universe',
    content: '"I took up the curated learning challenges and was trying to master the art of execution along with Avantika. It enables me to add value to my child’s learning”.',
    userName: 'Sudhir Menon',
    userType: 'Young Researcher',
    grade: 'Grade VI',
    profileImage: '/assets/uploads/files/profile/18-profileavatar.png'
  }]
}

export class SignupDataStore implements RESPONSE_CALLBACKS {
  @observable formData
  @observable reviews

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
      case FORM_KEYS.NAME:
      case FORM_KEYS.PASSWORD:
      case FORM_KEYS.EMAIL:
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

  registerUser = async () => {
    const body = {
      'email': (this.formData[FORM_KEYS.EMAIL][TEXT_FIELD_KEYS.INPUT_VALUE] || '').trim(),
      'username': (this.formData[FORM_KEYS.NAME][TEXT_FIELD_KEYS.INPUT_VALUE] || '').trim(),
      'password': this.formData[FORM_KEYS.PASSWORD][TEXT_FIELD_KEYS.INPUT_VALUE] || '',
      'password-confirm': this.formData[FORM_KEYS.CONFIRM_PASSWORD][TEXT_FIELD_KEYS.INPUT_VALUE] || '',
    }
    const registerUserRequest = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.REGISTER_USER,
      apiId: API_IDS.REGISTER_USER,
      reqParams: body,
    })
    await registerUserRequest.setRequestHeaders()
    await registerUserRequest.hitPostApi()
  }

  onSuccess(apiId: string, response: any) {
    switch (apiId) {
      case API_IDS.REGISTER_USER:
        navigateSimple(undefined, 'SignIn')
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.REGISTER_USER:
        showAndroidToastMessage(get(error, 'data', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        break
      default:
        break
    }
  }

}