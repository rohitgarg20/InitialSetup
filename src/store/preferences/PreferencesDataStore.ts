import { IFilterItems } from './../../common/constant';
import { makeObservable, observable } from 'mobx'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { get } from 'lodash'
import { log } from '../../config'
import { FILTER_ITEM_KEYS, FILTER_KEYS } from '../../common/constant'

const DEFAULT_SETTINGS = {
  preferencesData: {}
}

export class PreferencesDataStore implements RESPONSE_CALLBACKS {

  @observable preferencesData

  constructor() {
    this.init()
    makeObservable(this)
  }


  init = () => {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => (this[key] = DEFAULT_SETTINGS[key]))
  }

  getUserPreferencesData = async () => {

    const loginUser = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.GET_USER_PREFERENCES,
      apiId: API_IDS.GET_USER_PREFERENCES,
      urlParams: {
        // limit: PAGE_SIZE,
        // page: get(this.postsData, 'current_page', 0) + 1
      }
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitGetApi()
  }

  constructPreferencesData = (responseData) => {
    const { CATEGORY, SORTING } = FILTER_KEYS
    let filterListData = {}
    responseData.map((filterObj) => {
      const filterType = Object.keys(filterObj)?.[0] || ''
      if (filterType === CATEGORY) {
        const categoryObj = filterObj[filterType]
        const categories = Object.keys(categoryObj)
        const filteredCategory = categories.filter((category) => category !== 'uid')
        filteredCategory.forEach((categoryType) => {
          const categoryData = get(categoryObj, `${categoryType}`, {})
          const filterLabel = get(categoryData, 'name')
          const cid =  get(categoryData, 'cid')
          const subCategory = get(categoryData, 'sub_categories', [])
          const formattedValues: IFilterItems[] = subCategory.map((item) => {
            return {
              id: get(item, 'cid', ''),
              isSelected: false,
              displayLabel: get(item, 'name', '')
            }
          })
          filterListData[categoryType] = {
            [FILTER_ITEM_KEYS.FILTER_LABEL]: filterLabel,
            [FILTER_ITEM_KEYS.CURRENT_SELECTED_FILTER_VALUES]: [],
            [FILTER_ITEM_KEYS.PREEVIOUS_SELECTED_FILTER_VALUES]: [],
            [FILTER_ITEM_KEYS.FILTER_ID]: cid,
            [FILTER_ITEM_KEYS.LIST_ITEMS]: [ ...formattedValues],
            [FILTER_ITEM_KEYS.FILTER_TYPE]:  FILTER_ITEM_KEYS.CHECKBOX_TYPE
          }
        })
      } else if (filterType === SORTING) {
        const formattedValues: IFilterItems[] = get(filterObj, `${filterType}.sorting`, []).map((item) => {
          return {
            id: item,
            isSelected: false,
            displayLabel: item
          }
        })
        filterListData[SORTING] = {
          [FILTER_ITEM_KEYS.FILTER_LABEL]: filterType,
          [FILTER_ITEM_KEYS.CURRENT_SELECTED_FILTER_VALUES]: [],
          [FILTER_ITEM_KEYS.PREEVIOUS_SELECTED_FILTER_VALUES]: [],
          [FILTER_ITEM_KEYS.FILTER_ID]: get(filterObj, `${filterType}.uid`),
          [FILTER_ITEM_KEYS.LIST_ITEMS]: [ ...formattedValues],
          [FILTER_ITEM_KEYS.FILTER_TYPE]:  FILTER_ITEM_KEYS.RADIO_BUTTON_TYPE
        }
      }
    })
    log('filterTypefilterType', filterListData)

  }

  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response)
    switch (apiId) {
      case API_IDS.GET_USER_PREFERENCES:
        this.constructPreferencesData(get(response, 'response', []))
        break
      default:
        break
    }
  }
  onFailure(apiId: string, error: any) {
    log('onFailureonFailureonFailure', error)
    switch (apiId) {
      case API_IDS.GET_USER_PREFERENCES:
        showAndroidToastMessage(get(error, 'data', strings.ERROR_MESSAGES.SOME_ERROR_OCCURED))

        break
      default:
        break
    }
  }
}