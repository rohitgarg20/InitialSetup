import { IFilterItems, SORTING_DATA } from './../../common/constant'
import { action, makeObservable, observable } from 'mobx'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { get } from 'lodash'
import { log } from '../../config'
import { FILTER_ITEM_KEYS, FILTER_KEYS } from '../../common/constant'

const DEFAULT_SETTINGS = {
  preferencesListData: []
}

export class PreferencesDataStore implements RESPONSE_CALLBACKS {

  @observable preferencesListData

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
      promisify: true,
      urlParams: {
        // limit: PAGE_SIZE,
        // page: get(this.postsData, 'current_page', 0) + 1
      }
    })
    await loginUser.setRequestHeaders()
    return await loginUser.hitGetApi()
  }

  getCategoryListData = async () => {

    const loginUser = new BaseRequest(this, {
      methodType: 'GET',
      apiEndPoint: API_END_POINTS.GET_CATEGORY_LIST,
      apiId: API_IDS.GET_CATEGORY_LIST,
      promisify: true,
      urlParams: {
        // limit: PAGE_SIZE,
        // page: get(this.postsData, 'current_page', 0) + 1
      }
    })
    await loginUser.setRequestHeaders()
    return await loginUser.hitGetApi()
  }

  @action
  setPreferencesListData = (preferencesList) => {
    this.preferencesListData = [ ...preferencesList]
  }

  getUserPreferencesAndCategoryData = () => {
    const promisesArr = [
      this.getUserPreferencesData(),
      this.getCategoryListData()
    ]
    let formattedListData = []
    Promise.all(promisesArr).then((response) => {
      const userPreferencesList = get(response, '[0].data.response', [])
      const userCategoryList = userPreferencesList.find((item) => {
        return Object.keys(item).find((itemType) => itemType === 'category')
      })
      const categoryData = get(userCategoryList, 'category', {})
      const categoryListData =  get(response, '[1].data.response', [])
      formattedListData = categoryListData.map((category) => {
        const { name = '', cid = '', sub_categories = [] } = category || {}
        const selectedCategoryUserData = get(categoryData, `${name}`)
        const selectedSubCatList = get(selectedCategoryUserData, 'cid') === cid ?  get(selectedCategoryUserData, 'sub_categories', []) : []
        let selectedCid = []
        const formatedSubCategory: IFilterItems[] = sub_categories.map((item) => {
          const itemCid = get(item, 'cid', '')
          const isUserSelected = selectedSubCatList.findIndex((subCat) => get(subCat, 'cid') === itemCid)
          if (isUserSelected !== -1) {
            selectedCid = [
              ...selectedCid,
              {
                id: itemCid
              }
            ]
          }
          return {
            id: itemCid,
            isSelected: isUserSelected !== -1 ? true : false,
            displayLabel: get(item, 'name', '')
          }
        })
        return {
          [FILTER_ITEM_KEYS.FILTER_LABEL]: name,
          [FILTER_ITEM_KEYS.CURRENT_SELECTED_FILTER_VALUES]: [...selectedCid],
          [FILTER_ITEM_KEYS.PREVIOUS_SELECTED_FILTER_VALUES]: [ ...selectedCid],
          [FILTER_ITEM_KEYS.FILTER_ID]: cid,
          [FILTER_ITEM_KEYS.LIST_ITEMS]: [ ...formatedSubCategory],
          [FILTER_ITEM_KEYS.FILTER_TYPE]:  FILTER_ITEM_KEYS.CHECKBOX_TYPE
        }
      })

      let sortingFormattedValues = []
      const sortingCategoryList = userPreferencesList.find((item) => {
        return Object.keys(item).find((itemType) => itemType === 'sorting')
      })

      const selectedSortingFilter = get(sortingCategoryList, 'sorting.sorting', [])
      let selectedSortingFilters = []
      SORTING_DATA.forEach((item) => {
        const sortingKey = get(item, 'id', '')
        const isUserSelected = selectedSortingFilter.findIndex((selSort) => selSort === sortingKey)
        if (isUserSelected !== -1) {
          selectedSortingFilters = [
            ...selectedSortingFilters,
            {
              id: sortingKey
            }
          ]
        }
        sortingFormattedValues.push({
          id: sortingKey,
          isSelected: isUserSelected !== -1 ? true : false,
          displayLabel: get(item, 'name', '')
        })
      })
      formattedListData = [
        ...formattedListData,
        {
          [FILTER_ITEM_KEYS.FILTER_LABEL]: 'Sort By',
          [FILTER_ITEM_KEYS.CURRENT_SELECTED_FILTER_VALUES]: [ ...selectedSortingFilters],
          [FILTER_ITEM_KEYS.PREVIOUS_SELECTED_FILTER_VALUES]: [ ...selectedSortingFilters],
          [FILTER_ITEM_KEYS.FILTER_ID]: 'sortBy',
          [FILTER_ITEM_KEYS.LIST_ITEMS]: [ ...sortingFormattedValues],
          [FILTER_ITEM_KEYS.FILTER_TYPE]:  FILTER_ITEM_KEYS.RADIO_BUTTON_TYPE
        }
      ]
      this.setPreferencesListData(formattedListData)
    }).catch(err => {
      log('error while calling', err)
    })
  }


  onSuccess(apiId: string, response: any) {
    log('onSuccessonSuccess', response)
    switch (apiId) {
      case API_IDS.GET_USER_PREFERENCES:
        // this.constructPreferencesData(get(response, 'response', []))
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