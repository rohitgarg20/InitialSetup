import { IFilterItems, IFilterListItem, SORTING_DATA } from './../../common/constant'
import { action, makeObservable, observable } from 'mobx'
import { strings } from '../../common'
import { API_END_POINTS, API_IDS } from '../../common/ApiConfiguration'
import { BaseRequest, RESPONSE_CALLBACKS } from '../../http-layer'
import { jsonParseData, showAndroidToastMessage, stringifyData } from '../../utils/app-utils'
import { get, filter, isEmpty, set } from 'lodash'
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

  getUserPreferencesAndCategoryData = async () => {
    const promisesArr = [
      this.getUserPreferencesData(),
      this.getCategoryListData()
    ]
    let formattedListData = []
    await Promise.all(promisesArr).then((response) => {
      const userPreferencesList = get(response, '[0].data.response', [])
      const userCategoryList = userPreferencesList.find((item) => {
        return Object.keys(item).find((itemType) => itemType === 'category')
      })
      const categoryData = get(userCategoryList, 'category', {})
      const categoryListData =  get(response, '[1].data.response', [])
      // log('categoryListDatacategoryListData', userCategoryList, categoryData)
      formattedListData = categoryListData.map((category) => {
        const { name = '', cid = '', sub_categories = [] } = category || {}
        const selectedCategoryUserData = categoryData.preferences.find((item) => get(item, 'cid') === cid) || {}
        // log('selectedCategoryUserDataselectedCategoryUserData', selectedCategoryUserData)
        const selectedSubCatList = get(selectedCategoryUserData, 'sub_categories', [])
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
      log('sortingCategoryListsortingCategoryList', sortingCategoryList)
      const selectedSortingFilter = get(sortingCategoryList, 'sorting', {})
      let selectedSortingFilters = []
      SORTING_DATA.forEach((item) => {
        const sortingKey = get(item, 'id', '')
        const isUserSelected = sortingKey === get(selectedSortingFilter, 'sorting')
        if (isUserSelected) {
          selectedSortingFilters = [
            ...selectedSortingFilters,
            {
              id: sortingKey
            }
          ]
        }
        sortingFormattedValues.push({
          id: sortingKey,
          isSelected: isUserSelected ? true : false,
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

  updateFilterDataOnPress = (item: IFilterListItem, indexToUpdate, filterItemKey, checkBoxInitialValue, filterKey) => {
    log('updateFilterDataOnPressupdateFilterDataOnPress', item, indexToUpdate, filterItemKey, checkBoxInitialValue, filterKey)
    const tempPreferences = [...this.preferencesListData]
    const categoryToUpdate = get(tempPreferences, `[${indexToUpdate}]`, {})
    const filterType = get(categoryToUpdate, `${FILTER_ITEM_KEYS.FILTER_TYPE}`, '')
    const filterListItems = [ ...get(categoryToUpdate, `${FILTER_ITEM_KEYS.LIST_ITEMS}`, [])]
    let currentSelectedFilterValuesList = get(categoryToUpdate, `${FILTER_ITEM_KEYS.CURRENT_SELECTED_FILTER_VALUES}`, [])
    const updatedValue = !checkBoxInitialValue
    switch (filterType) {
      case FILTER_ITEM_KEYS.CHECKBOX_TYPE:
        filterListItems.forEach((filterSubItem) => {
          if (filterSubItem.id === filterItemKey) {
            filterSubItem.isSelected = updatedValue
          }
        })
        if (updatedValue) {
          currentSelectedFilterValuesList.push({ id: filterItemKey })
        } else {
          currentSelectedFilterValuesList = filter(
            currentSelectedFilterValuesList,
            (filterListObj) => filterListObj.id !== filterItemKey
          )
        }
        break
      case FILTER_ITEM_KEYS.RADIO_BUTTON_TYPE:
        filterListItems.forEach((filterSubItem) => {
          if (filterSubItem.id === filterItemKey) {
            filterSubItem.isSelected = updatedValue
          } else {
            filterSubItem.isSelected = false
          }
        })
        currentSelectedFilterValuesList = []
        if (updatedValue) {
          currentSelectedFilterValuesList.push({ id: filterItemKey })
        }
        break
      default:

    }
    categoryToUpdate[FILTER_ITEM_KEYS.LIST_ITEMS] = [ ...filterListItems]
    categoryToUpdate[FILTER_ITEM_KEYS.CURRENT_SELECTED_FILTER_VALUES] = [...currentSelectedFilterValuesList]
    tempPreferences[indexToUpdate] = {
      ...categoryToUpdate
    }
    this.setPreferencesListData(tempPreferences)
  }


  checkIsCurrentSelectedAndPreviousSelectedFiltersSame = () => {
    let areFiltersSame = true
    for (let index = 0; index < get(this.preferencesListData, 'length', 0); index++) {
      const preferenceItem = get(this.preferencesListData, `[${index}]`, {})
      const currentSelectedFilterList = get(
        preferenceItem,
        `[${FILTER_ITEM_KEYS.CURRENT_SELECTED_FILTER_VALUES}]`,
        []
      )
      const previousSelectedFilterList = get(
        preferenceItem,
        `[${FILTER_ITEM_KEYS.PREVIOUS_SELECTED_FILTER_VALUES}]`,
        []
      )
      log(
        'currentSelectedFilterListcurrentSelectedFilterList',
        currentSelectedFilterList,
        previousSelectedFilterList
      )
      if (get(currentSelectedFilterList, 'length', 0) !== get(previousSelectedFilterList, 'length', 0)) {
        areFiltersSame = false
        break
      }
      const isFiltersPresentInPrevious = currentSelectedFilterList.every((selectedFilterObj) => {
        const { id } = selectedFilterObj || {}
        const isPresentInPreviousFilter = previousSelectedFilterList.find(
          (previousFilter) => get(previousFilter, 'id') === id
        )
        if (!isEmpty(isPresentInPreviousFilter)) {
          return true
        } else {
          return false
        }
      })
      if (!isFiltersPresentInPrevious) {
        areFiltersSame = false
        break
      }
    }
    return areFiltersSame
  }

  setPreviousSelectedFilterList = () => {
    this.preferencesListData.forEach((filterKey) => {
      const currentSelectedFilterList = [...get(filterKey, `[${FILTER_ITEM_KEYS.CURRENT_SELECTED_FILTER_VALUES}]`, [])]
      set(
        filterKey,
        `[${FILTER_ITEM_KEYS.PREVIOUS_SELECTED_FILTER_VALUES}]`,
        jsonParseData(stringifyData([...currentSelectedFilterList]))
      )
    })
  }

  updateFilterDataOnReset = () => {
    const tempPrefeerncesData = [...this.preferencesListData ]
    tempPrefeerncesData.forEach(preference => {
      preference[FILTER_ITEM_KEYS.CURRENT_SELECTED_FILTER_VALUES] = []
      const filterListItems = [ ...get(preference, `${FILTER_ITEM_KEYS.LIST_ITEMS}`, [])]
      filterListItems.forEach((filterItem) => {
        filterItem.isSelected = false
      })

    })
    this.setPreferencesListData(tempPrefeerncesData)
  }

  @action
  setInitialFilterData = () => {
    const tempPreferencesData = jsonParseData(stringifyData([...this.preferencesListData ]))
    tempPreferencesData.forEach((categoryToUpdate) => {
      const filterListItems = [ ...get(categoryToUpdate, `${FILTER_ITEM_KEYS.LIST_ITEMS}`, [])]
      let previousSelectedFilterValuesList = get(categoryToUpdate, `${FILTER_ITEM_KEYS.PREVIOUS_SELECTED_FILTER_VALUES}`, [])

      set(categoryToUpdate, `[${FILTER_ITEM_KEYS.CURRENT_SELECTED_FILTER_VALUES}]`,
        jsonParseData(stringifyData([...previousSelectedFilterValuesList]))
      )
      filterListItems.forEach((item) => {
        const filterObj = previousSelectedFilterValuesList.find(
          (previousFilter) => get(previousFilter, 'id') === get(item, 'id')
        )
        if (!isEmpty(filterObj)) {
          set(item, 'isSelected', true)
        } else {
          set(item, 'isSelected', false)
        }
      })
      set(categoryToUpdate, `[${FILTER_ITEM_KEYS.LIST_ITEMS}]`, [...filterListItems])
    })
    this.setPreferencesListData(tempPreferencesData)

  }

  getPreferencesParamsList = () => {
    log('getPreferencesParamsListgetPreferencesParamsList', this.preferencesListData)
    let reqParams = []
    let sortByParam = ''
    this.preferencesListData.forEach(category => {
      const { filterId, currentSelectedFilterValues = [] } = category || {}
      let selectedSubIds = []
      if (filterId === 'sortBy') {
        sortByParam = get(currentSelectedFilterValues, '[0].id', '')
      } else {
        currentSelectedFilterValues.forEach(selectedSubItem => {
          const { id } = selectedSubItem || {}
          selectedSubIds.push(id)
        })
        if (selectedSubIds?.length > 0) {
          reqParams.push({
            cid: filterId,
            sub_cids: selectedSubIds
          })
        }
      }
    })
    // log('reqParamsreqParamsreqParams', reqParams)
    // reqParams.push({
    //   cid: 57,
    //   sub_cids: [134]
    // })
    return {
      preferences: reqParams,
      sortByParam
    }
  }

  getApiRequestParams = () => {
    const { preferences = [], sortByParam = ''  } = this.getPreferencesParamsList()
    let queryParam = ''
    preferences.forEach((selectedCat) => {
      const { cid , sub_cids } = selectedCat || {}
      let subCidsQueryParams = ''
      subCidsQueryParams = sub_cids.map((subId) => `sub_cid=${subId}`).join('&')
      if (subCidsQueryParams?.length > 0) {
        if (queryParam.length > 0) {
          queryParam = queryParam + `&cid=${cid}&${subCidsQueryParams}`
        } else {
          queryParam = `${cid}&${subCidsQueryParams}`
        }
      }
    })
    let urlParams: any = {}
    if (queryParam?.length > 0) {
      urlParams = {
        ...urlParams,
        cid: queryParam
      }
    }
    if (sortByParam?.length > 0) {
      urlParams = {
        ...urlParams,
        type: sortByParam
      }
    }
    return urlParams
  }

  saveUserPreferences = async () => {
    const { preferences,  sortByParam = 'none' } = this.getPreferencesParamsList()
    log('saveUserPreferencessaveUserPreferences', sortByParam)
    const loginUser = new BaseRequest(this, {
      methodType: 'PUT',
      apiEndPoint: API_END_POINTS.SAVE_USER_PREFERENCES,
      apiId: API_IDS.SAVE_USER_PREFERENCES,
      reqParams: {
        preferences
      },
      urlParams: {
        sortBy: sortByParam?.length > 0 ? sortByParam : 'none'
        // limit: PAGE_SIZE,
        // page: get(this.postsData, 'current_page', 0) + 1
      }
    })
    await loginUser.setRequestHeaders()
    await loginUser.hitPutApi()
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