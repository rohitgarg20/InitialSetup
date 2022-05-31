import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { get, map, find, isEmpty } from 'lodash'
import { log } from '../../config'
import { action, computed, makeObservable, observable } from 'mobx'
import { userDataStore } from '..'
import { capitalizeFirstLetterOnly, jsonParseData, showAndroidToastMessage, stringifyData } from '../../utils/app-utils'
import { OWNERSHIP_TYPE_LIST } from '../../common/constant'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { setInititalStackName } from '../../service'
import { STACK_NAMES } from '../../navigator'
import { strings } from '../../common'

const DEFAULT_SETTINGS = {
  propertiesList: [],
  selectedFloorId: '',
  selectedFlatId: '',
  address: '',
  ownershipTypeList: [ ...OWNERSHIP_TYPE_LIST]
}

export class PropertDetailStore implements RESPONSE_CALLBACKS {

    @observable propertiesList
    @observable selectedFloorId
    @observable selectedFlatId
    @observable address
    @observable ownershipTypeList

    constructor() {
      this.init()
      makeObservable(this)
    }

    init = () => {
      Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
    }

    @action
    setPropertyList = (propertyList) => {
      this.propertiesList = [ ...propertyList]
    }

    getInitData = () => {
      const formattedPropertyData = this.constructPropertyListData()
      this.setPropertyList([ ...formattedPropertyData])
    }

    constructPropertyListData = () => {
      log('constructPropertyDetailDataconstructPropertyDetailData', userDataStore.getPropertyDetails())
      const propertyDetails = jsonParseData(stringifyData({ ...userDataStore.getPropertyDetails() }))
      const formattedPropertyData = map(propertyDetails, (propertyItem) => {
        const { _id, name } = propertyItem || {}
        return {
          displayValue: capitalizeFirstLetterOnly(name),
          key: _id,
          isSelected: false
        }
      })
      return formattedPropertyData
    }

    updateSelectedPropertyItem = (selectedPropertyId) => {
      const formattedPropertyData = map(this.propertiesList, (propertyItem) => {
        const { key, displayValue } = propertyItem || {}
        return {
          displayValue,
          key,
          isSelected:  selectedPropertyId ===  key
        }
      })
      this.setPropertyList([ ...formattedPropertyData])
      this.updateSelectedFlatId('')
      this.updateSelectedFloorId('')
    }

    @action
    updateSelectedFloorId = (floorId) => {
      this.selectedFloorId = floorId
    }

    @action
    updateSelectedFlatId = (flatId) => {
      this.selectedFlatId = flatId
    }

    @action
    updateAddress = (value) => {
      this.address = value
    }

    @action
    updateOwnershipStatus = (updatedKey) => {
      const formattedPropertyData = map(this.ownershipTypeList, (ownerShipItem) => {
        const { key, displayValue } = ownerShipItem || {}
        return {
          displayValue,
          key,
          isSelected:  updatedKey ===  key
        }
      })
      this.ownershipTypeList = [ ...formattedPropertyData]
    }


    @computed
    get floorsList() {
      const selectedPropertyId = this.getSelectedPropertyId()
      if (selectedPropertyId.length !== 0) {
        const propertData = { ...userDataStore.getPropertyDetails() }
        const floorListInSelectedProperty = find(propertData, (propertyItem) => propertyItem._id === selectedPropertyId)
        const formattedFloorsList = map(get(floorListInSelectedProperty, 'floors', []), (floor) => {
          const { _id, name } = floor || {}
          return {
            displayValue: capitalizeFirstLetterOnly(name),
            key: _id,
            isSelected: this.selectedFloorId === _id
          }
        })
        return formattedFloorsList
      }
      return []
    }


    @computed
    get flatsList() {
      const selectedPropertyId = this.getSelectedPropertyId()
      if (selectedPropertyId.length !== 0 && this.selectedFloorId.length !== 0) {
        const propertData = { ...userDataStore.getPropertyDetails() }
        const floorListInSelectedProperty = get(find(propertData, (propertyItem) => propertyItem._id === selectedPropertyId), 'floors', [])
        const selectedFloorData = find(floorListInSelectedProperty, (floor) => floor._id === this.selectedFloorId)
        const formattedFlatsList = map(get(selectedFloorData, 'flats', []), (floor) => {
          const { _id, name } = floor || {}
          return {
            displayValue: capitalizeFirstLetterOnly(name),
            key: _id,
            isSelected:  this.selectedFlatId === _id
          }
        })
        return formattedFlatsList
      }
      return []
    }

    getSelectedPropertyId = () => get(find(this.propertiesList, (propertyItem) => get(propertyItem, 'isSelected')), 'key', '')

    getSelectedFloorId = () => this.selectedFloorId

    getSelectedFlatId = () => this.selectedFlatId

    @computed
    get selectedPropertyData() {
      return find(this.propertiesList, (propertyItem) => get(propertyItem, 'isSelected'))
    }

    @computed
    get selectedFloorData() {
      return find(this.floorsList, (floorItem) => get(floorItem, 'isSelected'))
    }

    @computed
    get selectedFlatData() {
      return find(this.flatsList, (flatItem) => get(flatItem, 'isSelected'))
    }

    @computed
    get selectedOwnershipData() {
      return find(this.ownershipTypeList, (item) => get(item, 'isSelected'))
    }

    @computed
    get isSubmitButtonDisabled() {
      return isEmpty(this.selectedPropertyData) || isEmpty(this.selectedFlatData) || isEmpty(this.selectedOwnershipData) || isEmpty(this.selectedFloorData)
    }

    savePropertyDetails = async () => {
      const body = {
        'societyId': userDataStore.getSocietyId(),
        'userId': userDataStore.getUserId(),
        'flatId': get(this.selectedFlatData, 'key'),
        'oldOrPermanentAddress' : this.address.trim(),
        'ownershipOrRentAgreement': get(this.selectedOwnershipData, 'key')
      }
      const registerUserRequest = new BaseRequest(this, {
        methodType: 'POST',
        apiEndPoint: API_END_POINTS.SAVE_USER_PROPERTY_DETAILS,
        apiId: API_IDS.SAVE_USER_PROPERTY_DETAILS,
        reqParams: body,
        prefetch: true
      })
      await registerUserRequest.setRequestHeaders()
      await registerUserRequest.hitPostApi()
    }


    async onSuccess(apiId: string, response: any) {
      log('onSuccessonSuccess', response)
      switch (apiId) {
        case API_IDS.SAVE_USER_PROPERTY_DETAILS:
          setInititalStackName(STACK_NAMES.APPROVAL_PENDING_STACK)
          break
        default:
          break
      }
    }
    onFailure(apiId: string, error: any) {
      log('onFailureonFailureonFailure', error)
      const responseData = get(error, 'data', {})
      switch (apiId) {
        case API_IDS.SAVE_USER_PROPERTY_DETAILS:
          showAndroidToastMessage(get(responseData, 'message', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))
          break
        default:
          break
      }
    }

}