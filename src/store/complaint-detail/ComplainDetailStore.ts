import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { get } from 'lodash'
import { strings } from '../../common'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { action, makeObservable, observable } from 'mobx'
import { userDataStore } from '..'
import { IComplainData } from '../../common/Interfaces'
import { COMPLAINT_TYPE_LIST, GET_DATA_BY_COMPLAINT_STATUS } from '../../common/constant'
import { getComplaintUserDisplayName } from '../../service/ComplaintService'

const DEFAULT_SETTINGS = {
  isFetchingData: false,
  complainDetailData: {},
  userMsg: ''
}

export class ComplainDetailStore implements RESPONSE_CALLBACKS {

    @observable isFetchingData
    @observable complainDetailData: IComplainData
    @observable userMsg

    constructor() {
      this.init()
      makeObservable(this)
    }

  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }

  @action
  updateFetchingStatus = (value) => {
    this.isFetchingData = value
  }

  @action
  updateUserMsg = (value) => {
    log('updateUserMsgupdateUserMsg', value, this.userMsg)
    this.userMsg = value
  }

  @action
  clearUserMsg = () => {
    this.userMsg = ''
  }

  @action
  setComplaintDetailData = (complaintDetail) => {
    this.complainDetailData = complaintDetail
  }

  getComplaintDetails = async (complaintId) => {
    const registerUserRequest = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.GET_COMPLAIN_DETAILS,
      apiId: API_IDS.GET_COMPLAIN_DETAILS,
      prefetch: true,
      reqParams: {
        societyId: userDataStore.getSocietyId(),
        userId: userDataStore.getUserId(),
        complaintId
      }
    })
    await registerUserRequest.setRequestHeaders()
    await registerUserRequest.hitPostApi()
  }

  onComplaintDetailApiResp = (complaintDetail) => {
    const { status, complaintType = '', complaintNumber = 1 } = complaintDetail || {}
    log('complaintLabelcomplaintLabel', complaintDetail)

    const complainTypeData = COMPLAINT_TYPE_LIST.find((type) => type.id === complaintType)
    log('complaintLabelcomplaintLabel' , complainTypeData)

    const { complaintLabel, displayStatus, backgroundColor } = GET_DATA_BY_COMPLAINT_STATUS.get(status) || {}
    log('complaintLabelcomplaintLabel' , complainTypeData)

    const formattedData: IComplainData =  {
      ...complaintDetail,
      statusDisplayData: {
        value: displayStatus,
        backgroundColor
      },
      complaintUserData: {
        displayLabel: complaintLabel,
        displayValue: getComplaintUserDisplayName(complaintDetail)
      },
      vendorData: {
        displayLabel: 'Vendor',
        displayValue: 'No data'
      },
      complaintId: complaintNumber,
      displayComplaintType: get(complainTypeData, 'displayLabel', '')
    }
    log('formattedDataformattedData', formattedData)
    this.setComplaintDetailData(formattedData)
  }

  async onSuccess(apiId: string, response: any) {
    const responseData = get(response, 'data', [])
    switch (apiId) {
      case API_IDS.GET_COMPLAIN_DETAILS:
        this.onComplaintDetailApiResp(get(response, 'complaint', {}))
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    const responseData = get(error, 'data', {})

    switch (apiId) {
      case API_IDS.GET_COMPLAIN_DETAILS:
        showAndroidToastMessage(get(responseData, 'message', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        this.updateFetchingStatus(false)
        break
      default:
        break
    }
  }

}