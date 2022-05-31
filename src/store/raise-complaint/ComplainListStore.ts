import { userDataStore } from '..'
import { get, map } from 'lodash'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { log } from '../../config'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { IComplainData } from '../../common/Interfaces'
import { COMPLAINT_STATUS, COMPLAINT_TYPE_LIST, GET_DATA_BY_COMPLAINT_STATUS } from '../../common/constant'
import { action, makeObservable, observable } from 'mobx'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { strings } from '../../common'

const DEFAULT_SETTINGS = {
  complaintList: [],
  totalCount: 0,
  currentCount: 1,
  isFetchingListData: false
}

export class ComplainListStore implements RESPONSE_CALLBACKS {

  @observable complaintList
  @observable isFetchingListData
  @observable totalCount
  currentCount

  constructor() {
    this.init()
    makeObservable(this)
  }

  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }

  getComplaintList = async () => {
    const registerUserRequest = new BaseRequest(this, {
      methodType: 'POST',
      apiEndPoint: API_END_POINTS.GET_COMPLAINTS,
      apiId: API_IDS.GET_COMPLAINTS,
      prefetch: false,
      reqParams: {
        societyId: userDataStore.getSocietyId(),
        filter: 'all',
        pageNumber: this.currentCount
      }
    })
    await registerUserRequest.setRequestHeaders()
    await registerUserRequest.hitPostApi()
  }

  getComplaintUserDisplayName = (complaintData) => {
    const { status } = complaintData || {}
    switch (status) {
      case COMPLAINT_STATUS.UNASSIGNED:
        return get(complaintData, 'complainer.name', '')
      default:
        return 'No name'
    }

  }

  @action
  resetComplaintScreenData = () => {
    this.totalCount = 0
    this.currentCount = DEFAULT_SETTINGS.currentCount
    this.complaintList = []
    this.updateFetchingListStatus(true)
    this.getComplaintList()
  }

  @action
  setComplaintList = (complaintList) => {
    this.complaintList = [
      ...this.complaintList,
      ...complaintList
    ]
    log('setComplaintListsetComplaintList', this.complaintList)
  }

  updateCurrentPageNumber = () => {
    this.currentCount = this.currentCount + 1
  }

  @action
  setTotalListCount = (totalCount) => {
    log('setTotalListCountsetTotalListCount', totalCount)
    this.totalCount = totalCount
  }

  onLoadMoreData = () => {
    if (this.currentCount <= this.totalCount) {
      this.updateCurrentPageNumber()
      this.getComplaintList()
    }
  }

  onComplaintListSuccess = (complaints) => {
    const formattedData: IComplainData[] = map(complaints, (complainItem, index) => {
      const { status, complaintType = '' } = complainItem || {}
      const complainTypeData = COMPLAINT_TYPE_LIST.find((type) => type.id === complaintType)
      const { complaintLabel, displayStatus, backgroundColor } = GET_DATA_BY_COMPLAINT_STATUS.get(status)
      return {
        ...complainItem,
        statusDisplayData: {
          value: displayStatus,
          backgroundColor
        },
        complaintUserData: {
          displayLabel: complaintLabel,
          displayValue: this.getComplaintUserDisplayName(complainItem)
        },
        vendorData: {
          displayLabel: 'Vendor',
          displayValue: 'No data'
        },
        complaintId: `Comp ${index + 1}`,
        displayComplaintType: get(complainTypeData, 'displayLabel', '')
      }
    })
    this.setComplaintList(formattedData)
  }

  @action
  updateFetchingListStatus = (status) => {
    this.isFetchingListData = status
  }


  async onSuccess(apiId: string, response: any) {
    const responseData = get(response, 'data', [])
    switch (apiId) {
      case API_IDS.GET_COMPLAINTS:
        this.onComplaintListSuccess(get(responseData, 'complaints', []))
        log('responseDataresponseData', responseData)
        this.setTotalListCount(get(responseData, 'count', 0))
        this.updateFetchingListStatus(false)
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    const responseData = get(error, 'data', {})

    switch (apiId) {
      case API_IDS.GET_COMPLAINTS:
        showAndroidToastMessage(get(responseData, 'message', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
        this.updateFetchingListStatus(false)
        break
      default:
        break
    }
  }

}