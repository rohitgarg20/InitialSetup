import React from 'react'
import { StyleSheet, View} from 'react-native'
import { colors } from '../common'
import { CustomText, FlatListWrapper } from '../common/components'
import { ISearchedResultsList } from '../common/Interface'

const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemSeperator: {
    paddingBottom: 10
  },
  mainContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    paddingHorizontal: 10,
    maxHeight: 100
  },
  listContainer: {
    paddingTop: 10
  }
})

interface IProps {
  searchedResult: ISearchedResultsList[]
}


export const SearchedResultComponent = (props: IProps) => {
  const { searchedResult } = props

  const renderSearchedResultItem = ({item, index}) => {
    const { label, subLabel } = item as ISearchedResultsList
    return (
      <View style = {styles.borderContainer}>
        <CustomText>{label}</CustomText>
        <CustomText>{subLabel}</CustomText>
      </View>
    )
  }

  return (
    <View style = {styles.mainContainer}>
      <FlatListWrapper
        style = {styles.listContainer}
        data={searchedResult}
        renderItem = {renderSearchedResultItem}
        ItemSeparatorComponent = {() => (<View style = {styles.itemSeperator}/>)}
        ListFooterComponent = {() => (<View style = {styles.itemSeperator}/>)}
      />
    </View>
  )
}