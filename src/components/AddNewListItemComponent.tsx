import React, { useCallback, useEffect } from 'react'
import { BackHandler, View } from 'react-native'
import { useEvent } from 'react-native-reanimated'
import { BASE_URL, LIST_ITEMS, LIST_ITEM_KEYS, navigateToWebView } from '../common/constant'
import { genericDrawerStore } from '../store'
import { BottomModalPopup } from './BottomModalPopup'
import { ItemSelectionComponent } from './ItemSelectionComponent'


export const addNewListItemComponent = ({  }) => {


  const handleBackPressed = useCallback(() => {
    genericDrawerStore.disableDrawer()
    return true
  }, [])


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPressed)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPressed)
    }
  }, [handleBackPressed])

  const onClickPostOption = (optionKey) => {
    const { ADD_NEW_POST, ADD_ARTICLE, ADD_NEW_EVENT, ADD_NEW_NUDGE, ADD_REFLECTION_TEMPLATE, CREATE_DISCUSSION_ROOM} = LIST_ITEM_KEYS

    switch (optionKey) {
      case ADD_NEW_POST:
        navigateToWebView({
          navigation: undefined,
          pageUrl: `${BASE_URL}/mobile/post/create`
        })
        break
      case ADD_ARTICLE:
        navigateToWebView({
          navigation: undefined,
          pageUrl: `${BASE_URL}/mobile/article/create`
        })
        break
      case CREATE_DISCUSSION_ROOM:
        navigateToWebView({
          navigation: undefined,
          pageUrl: `${BASE_URL}/mobile/discussion/create`
        })
        break
      case ADD_NEW_EVENT:
        navigateToWebView({
          navigation: undefined,
          pageUrl: `${BASE_URL}/mobile/events/create`
        })
        break
      case ADD_NEW_NUDGE:
        navigateToWebView({
          navigation: undefined,
          pageUrl: `${BASE_URL}/mobile/nudge/create`
        })
        break
      case ADD_REFLECTION_TEMPLATE:
        navigateToWebView({
          navigation: undefined,
          pageUrl: `${BASE_URL}/mobile/reflectionTemplate/create`
        })
        break
      default:
    }
    genericDrawerStore.disableDrawer()
  }

  return (
    <BottomModalPopup
      innerContent={() => {
        return (
          <ItemSelectionComponent
            dataList={LIST_ITEMS}
            popupHeading = {''}
            onItemSelect = {onClickPostOption}
          />
        )
      }}
    />
  )
}

export {
  addNewListItemComponent as AddNewListItemComponent
}
