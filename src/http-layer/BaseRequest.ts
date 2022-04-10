import { BASE_URL } from './../common/constant';
import { getAuthToken } from './../utils/auth-utils';
import Reactotron  from 'reactotron-react-native'
import axios from 'axios'
import { get } from 'lodash'
import { log } from '../config'
import { hideLoader, showLoader } from '../service/LoaderDataService'
export const  RESPONSE_CODE = {
  SUCCESS: 200
}
interface REQUEST_CONFIG {
  baseUrl?: string
  reqHeaders?: any
  timeOut?: number
  methodType: string
  apiId: string
  urlParams?: any
  apiEndPoint: string
  reqParams?: any
  promisify?: boolean
  params?: any
}

const DEFAULT_SETTING = {
  baseUrl: BASE_URL,
  reqHeaders: '',
  timeOut: 1000,
  methodType: '',
  apiId: '',
  urlParams: {},
  context: undefined,
  apiEndPoint: '',
  reqParams: {},
  promisify: false,
  params: {}
}

export class BaseRequest {
  baseUrl
  methodType
  timeOut
  reqHeaders
  axiosInstance
  apiId
  urlParams
  context
  apiEndPoint
  reqParams
  promisify
  params

  constructor(context, reqConfig: REQUEST_CONFIG) {
    Object.keys(DEFAULT_SETTING).forEach((key) => this[key] = DEFAULT_SETTING[key])
    Object.keys(reqConfig).forEach((reqKey) => this[reqKey] = reqConfig[reqKey])
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeOut,
      headers: this.reqHeaders,
      withCredentials: true,
      // xsrfCookieName: '_csrf',
      // xsrfHeaderName: 'X-CSRFToken'
    })
    this.context = context
  }

  setApiSuccessResponse = (response) => {
    log('setApiSuccessResponse', response)
    const status = get(response, 'status')
    const responseData = get(response, 'data', {})
    const isAnyResponse = get(responseData, 'Response', false)
    log('isAnyResponseisAnyResponse', isAnyResponse)
    if (status === RESPONSE_CODE.SUCCESS && isAnyResponse !== 'False') {
      this.context.onSuccess(this.apiId, responseData)
    } else {
      this.context.onFailure(this.apiId, get(responseData, 'Error', ''))
    }

  }

  getCompleteUrl = () => {
    log('getCompleteUrlgetCompleteUrlgetCompleteUrl', this.methodType)
    switch (this.methodType) {
      case 'POST':
        return `${this.baseUrl}/${this.apiEndPoint}`
      default:
        return `${this.baseUrl}`
    }
  }

  hitGetApi = async () => {
    try {
      const formattedGetParams = Object.keys(this.urlParams).map((key) => `${key}=${this.urlParams[key]}`).join('&')
      if (this.promisify) {
        return  await this.axiosInstance.get(`${this.apiEndPoint}?${formattedGetParams}`, { headers: this.reqHeaders })
      } else {
        const response = await this.axiosInstance.get(`${this.apiEndPoint}?${formattedGetParams}`, { headers: this.reqHeaders })
        this.setApiSuccessResponse(response)
        hideLoader()
      }
    } catch (err) {
      Reactotron.log('error is', err)
      hideLoader()
      throw new Error('error while making api call')
    }
}

setRequestHeaders = async () => {
  const xsrfToken = await getAuthToken()
  this.reqHeaders = {
    withCredentials: true,
    'Accept': 'application/json',
    ...this.reqHeaders
  }
  log('xsrfTokenxsrfToken', xsrfToken)
  if (xsrfToken) {
    this.reqHeaders = {
      'x-csrf-token' : xsrfToken,
      ...this.reqHeaders
    }
  }

}

hitPostApi = async () => {
  log('reqParamsreqParamsreqParamsreqParams', this.apiEndPoint)
  const paramKeys = JSON.parse(this.params)
  const urlParamKeys = []
  let match
  let index = 0
  const regex = /:\w*/g
  // tslint:disable-next-line:no-conditional-assignment
  while (match = regex.exec(this.apiEndPoint)) {
      urlParamKeys[index++] = match[0]
  }
  urlParamKeys.forEach(key => {
    log('inside foreach loop', key)
    let keyText = key.substring(1, key.length)
    if (paramKeys.hasOwnProperty(keyText)) {
      this.apiEndPoint = this.apiEndPoint.replace(key, paramKeys[keyText])

    } else {
      throw new Error(keyText + ' not found')
    }
  })
  showLoader()

  try {
    const response = await this.axiosInstance.post(this.apiEndPoint, this.reqParams,  { headers: this.reqHeaders })
    this.setApiSuccessResponse(response)
    hideLoader()

  } catch (err: any) {
    hideLoader()
    log('error is', err.response)
    this.context.onFailure(this.apiId, err.response)
  }
}

hitPutApi = async () => {
  log('reqParamsreqParamsreqParamsreqParams', this.apiEndPoint)

  const paramKeys = JSON.parse(this.params)
  const urlParamKeys = []
  let match
  let index = 0
  const regex = /:\w*/g
  // tslint:disable-next-line:no-conditional-assignment
  while (match = regex.exec(this.apiEndPoint)) {
      urlParamKeys[index++] = match[0]
  }
  urlParamKeys.forEach(key => {
    log('inside foreach loop', key)
    let keyText = key.substring(1, key.length)
    if (paramKeys.hasOwnProperty(keyText)) {
      this.apiEndPoint = this.apiEndPoint.replace(key, paramKeys[keyText])

    } else {
      throw new Error(keyText + ' not found')
    }
  })
  showLoader()


  try {
    const response = await this.axiosInstance.put(this.apiEndPoint, this.reqParams,  { headers: this.reqHeaders })
    this.setApiSuccessResponse(response)
    hideLoader()

  } catch (err: any) {
    hideLoader()
    log('error is', err.response)
    this.context.onFailure(this.apiId, err.response)
  }
}

}
