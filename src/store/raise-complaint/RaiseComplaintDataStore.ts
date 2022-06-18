import { jsonParseData, showAndroidToastMessage, stringifyData } from '../../utils/app-utils'
import { get, map, find } from 'lodash'
import { log } from '../../config'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { strings } from '../../common'
import { action, computed, makeObservable, observable } from 'mobx'
import { ICategoryList, IComplainData, ISelectedCategoryData } from '../../common/Interfaces'
import { COMPLAINT_TYPE_LIST, COMPLAIN_FORM_KEYS, COMPLAIN_TYPE_KEYS, USER_ROLE } from '../../common/constant'
import { complaintListStore, userDataStore } from '..'
import { navigateSimple } from '../../service'



const COMPLAIN_FORM_DATA = {
  [COMPLAIN_FORM_KEYS.SELECTED_COMPLAIN_TYPE]: COMPLAIN_TYPE_KEYS.PERSONAL_COMPLAINT,
  [COMPLAIN_FORM_KEYS.COMPLAINT_TITLE]: '',
  [COMPLAIN_FORM_KEYS.COMPLAIN_DESCRIPTION]: '',
  [COMPLAIN_FORM_KEYS.COMPLAINT_ADDRESS]: '',

}

const DEFAULT_SETTINGS = {
  categoryList: [],
  selectedCategoryData: {},
  selectedCategoryId: '',
  complaintTypeData: [ ...COMPLAINT_TYPE_LIST],
  complainFormData: { ...COMPLAIN_FORM_DATA},
  onlyViewComplaintDescription: false

}

export class RaiseComplaintDataStore implements RESPONSE_CALLBACKS {

    @observable categoryList: ICategoryList[]
    @observable selectedCategoryData: ISelectedCategoryData
    @observable selectedCategoryId
    @observable complainFormData
    onlyViewComplaintDescription

    constructor() {
      this.init()
      makeObservable(this)
    }
    init = () => {
      Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
    }

    resetComplaintFormData = () => {
      this.complainFormData = { ...COMPLAIN_FORM_DATA}
      this.onlyViewComplaintDescription = DEFAULT_SETTINGS.onlyViewComplaintDescription
    }

    @action
    setSelectedCategoryId = (selectedCategoryId) => {
      this.selectedCategoryId = selectedCategoryId
    }

    @computed
    get subCategoryListByCategoryId() {
      const selectedCategoryData =  find(this.categoryList, (category) => get(category, 'categoryId') === this.selectedCategoryId)
      return get(selectedCategoryData, 'subCategoriesList', [])
    }

    constructCategoryListData = () => {
      const formattedData: ICategoryList[] = map(userDataStore.getComplainContegories(), (categoryItem) => {
        const { _id: categoryId, categoryName,  subcategories = [] }  = categoryItem || {}
        return {
          categoryId,
          categoryName,
          subCategoriesList: map(subcategories, (subCategoryItem) => {
            const { subcategoryName, _id  } = subCategoryItem || {}
            return {
              subCategoryId: _id,
              subCategoryName: subcategoryName
            }
          })
        }
      })
      return formattedData
    }

    @action
    setCategoryList = () => {
      log('setCategoryListsetCategoryListsetCategoryListsetCategoryListsetCategoryList')
      const categoryList = this.constructCategoryListData()
      log('categoryListcategoryListcategoryList', categoryList)
      this.categoryList = [ ...categoryList]
      log('categoryListcategoryListcategoryList', this.categoryList)

    }

    @action
    setSelectedCategoryData = (selectedData) => {
      this.selectedCategoryData = { ...selectedData}
    }

    @action
    updateComplainFormData = (keyToUpdate, updatedValue) => {
      let tempData = jsonParseData(stringifyData({ ...this.complainFormData }))
      tempData = {
        ...tempData,
        [keyToUpdate] : updatedValue
      }
      this.complainFormData = { ...tempData }
    }

    updateSelectedComplaintType = (id) => {
      this.updateComplainFormData(COMPLAIN_FORM_KEYS.SELECTED_COMPLAIN_TYPE, id)
      if (id === COMPLAIN_TYPE_KEYS.COMMON_AREA_COMPLAIN) {
        this.updateComplainFormData(COMPLAIN_FORM_KEYS.COMPLAINT_ADDRESS, '')
      }

    }

    updateComplaintTitle = (complaintTitle) => {
      this.updateComplainFormData(COMPLAIN_FORM_KEYS.COMPLAINT_TITLE, complaintTitle)
    }

    updateComplainDescription = (description) => {
      this.updateComplainFormData(COMPLAIN_FORM_KEYS.COMPLAIN_DESCRIPTION, description)
    }

    updateComplaintAddress = (complainAddress) => {
      this.updateComplainFormData(COMPLAIN_FORM_KEYS.COMPLAINT_ADDRESS, complainAddress)
    }

    @computed
    get selectedComplainType() {
      return this.complainFormData[COMPLAIN_FORM_KEYS.SELECTED_COMPLAIN_TYPE]
    }

    @computed
    get complainTitle() {
      return this.complainFormData[COMPLAIN_FORM_KEYS.COMPLAINT_TITLE]
    }

    @computed
    get complainDescription() {
      return this.complainFormData[COMPLAIN_FORM_KEYS.COMPLAIN_DESCRIPTION]
    }

    @computed
    get complainAddress() {
      return this.complainFormData[COMPLAIN_FORM_KEYS.COMPLAINT_ADDRESS]
    }

    @action
    setInitialComplaintData = (complaintData) => {
      const { complaintType, complaintTitle, description, complaintAddress, category, subcomplaintCategory  } = complaintData as IComplainData || {}
      const { categoryName = '', _id: categoryId = '' } = category || {}
      const { subcategoryName = '', _id: subCategoryId  = '' } = subcomplaintCategory || {}
      this.onlyViewComplaintDescription = true
      const complaintFormData = {
        [COMPLAIN_FORM_KEYS.SELECTED_COMPLAIN_TYPE]: complaintType,
        [COMPLAIN_FORM_KEYS.COMPLAINT_TITLE]: complaintTitle,
        [COMPLAIN_FORM_KEYS.COMPLAIN_DESCRIPTION]: description,
        [COMPLAIN_FORM_KEYS.COMPLAINT_ADDRESS]: complaintAddress,
      }
      this.complainFormData = { ...complaintFormData }
      this.setSelectedCategoryData({
        categoryName: categoryName,
        categoryId,
        subCategoryName: subcategoryName,
        subCategoryId
      })
      navigateSimple(undefined, 'RaiseComplaintScreen')
    }

    submitComplaint = async () => {
      const {  categoryId, subCategoryId } = this.selectedCategoryData
      const registerUserRequest = new BaseRequest(this, {
        methodType: 'POST',
        apiEndPoint: API_END_POINTS.SUBMIT_COMPLAINT,
        apiId: API_IDS.SUBMIT_COMPLAINT,
        prefetch: true,
        reqParams: {
          complaintTitle: this.complainTitle,
          flatId: userDataStore.getFlatId(),
          complainerId: userDataStore.getUserId(),
          complainCreaterId: userDataStore.getUserId(),
          categoryId,
          description: this.complainDescription,
          societyId: userDataStore.getSocietyId(),
          subcomplaintCategoryId: subCategoryId,
          complaintType: this.selectedComplainType,
          complaintAddress: this.complainAddress || 'No address',
          complainerRole: USER_ROLE,
        }
      })
      await registerUserRequest.setRequestHeaders()
      await registerUserRequest.hitPostApi()
    }

    async onSuccess(apiId: string, response: any) {
      switch (apiId) {
        case API_IDS.SUBMIT_COMPLAINT:
          complaintListStore.resetComplaintScreenData()
          navigateSimple(undefined, 'ComplainListScreen')
          break
        default:
          break
      }
    }
    onFailure(apiId: string, error: any) {
      log('onFailureonFailureonFailure', error)
      const responseData = get(error, 'data', {})

      switch (apiId) {
        case API_IDS.SUBMIT_COMPLAINT:
          showAndroidToastMessage(get(responseData, 'message', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))

          break
        default:
          break
      }
    }
}