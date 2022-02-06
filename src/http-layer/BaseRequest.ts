import Reactotron  from 'reactotron-react-native';
import axios from 'axios'
import { get } from 'lodash'
import { log } from '../config'
const  RESPONSE_CODE = {
  SUCCESS: 200
}
interface REQUEST_CONFIG {
  baseUrl?: string
  reqHeaders?: any
  timeOut?: number
  methodType: string
  apiId: string
  urlParams: any
  apiEndPoint: string
}

const DEFAULT_SETTING = {
  baseUrl: 'http://www.omdbapi.com',
  reqHeaders: '',
  timeOut: 1000,
  methodType: '',
  apiId: '',
  urlParams: {},
  context: undefined,
  apiEndPoint: ''
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

  constructor(context, reqConfig: REQUEST_CONFIG){
    Object.keys(DEFAULT_SETTING).forEach((key) => this[key] = DEFAULT_SETTING[key])
    Object.keys(reqConfig).forEach((reqKey) => this[reqKey] = reqConfig[reqKey])
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeOut,
      headers: this.reqHeaders
    })
    this.context = context
  }

  setApiSuccessResponse = (response) => {
    log('setApiSuccessResponse', response)
    const status = get(response, 'status')
    const responseData = get(response, 'data', {})
    const isAnyResponse = get(responseData, 'Response', false)
    log('isAnyResponseisAnyResponse', isAnyResponse)
    if(status === RESPONSE_CODE.SUCCESS && isAnyResponse !== 'False') {
      this.context.onSuccess(this.apiId, responseData)
    } else {
      this.context.onFailure(this.apiId, get(responseData, 'Error', ''))
    }

  }

  hitGetApi = async () => {
    try {
      const formattedGetParams = Object.keys(this.urlParams).map((key) => `${key}=${this.urlParams[key]}`).join('&')
      const response = await this.axiosInstance.get(`${this.apiEndPoint}?${formattedGetParams}`)
      this.setApiSuccessResponse(response)
    } catch(err) {
      Reactotron.log('error is', err)
    }

  }


}