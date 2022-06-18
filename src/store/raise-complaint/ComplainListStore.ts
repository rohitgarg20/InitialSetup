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
import { getComplaintFormattedData, getComplaintUserDisplayName } from '../../service/ComplaintService'

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
        complainerId: userDataStore.getUserId(),
        filter: 'all',
        pageNumber: this.currentCount
      }
    })
    await registerUserRequest.setRequestHeaders()
    await registerUserRequest.hitPostApi()
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
    const formattedData: IComplainData[] = map(complaints, (complainItem) => {
      return {
        ...getComplaintFormattedData(complainItem)
      }
    })
    log('formattedDataformattedDataformattedData', formattedData)
    this.setComplaintList(formattedData)
  }

  @action
  updateFetchingListStatus = (status) => {
    this.isFetchingListData = status
  }

  @action
  updateComplaintDataById = (updatedComplaintData) => {
    const tempComplaintList = this.complaintList.map((complaint) => {
      if (get(complaint, 'complaintId') === get(updatedComplaintData, 'complaintId')) {
        return updatedComplaintData
      }
      return complaint
    })
    this.complaintList = [
      ...tempComplaintList
    ]
  }


  async onSuccess(apiId: string, response: any) {
    const responseData = get(response, 'data', [])
    log('onSuccessonSuccessonSuccess', apiId)
    switch (apiId) {
      case API_IDS.GET_COMPLAINTS:
        log('responseDataresponseData', responseData)
        this.onComplaintListSuccess(get(responseData, 'complaints', []))
        log('onComplaintListSuccessonComplaintListSuccess')
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