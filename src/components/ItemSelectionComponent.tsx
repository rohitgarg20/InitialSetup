import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, commonStyles, segoeFontTextStyles } from '../common'
import { IDataList } from '../common/Interfaces'
import { getHeight } from '../common/Scaling'
import { CustomText } from './CustomText'
import { FlatListWrapper } from './FlatListWrapper'


interface IProps {
  dataList: IDataList[]
  onItemSelect?: (key) => void
  popupHeading?: string
}

const styles = StyleSheet.create({
  popupContainer: {
    borderWidth: 1,
    borderColor: colors.primaryButton,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: colors.primaryButton,
    shadowColor: colors.primaryButton,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: 2,
  },
  itemSeperator: {
    paddingBottom: 20
  },
  listItemContainer: {
    padding: 10
  },
  textPadding: {}
})

const itemSelectionComponent = (props: IProps) => {
  const { popupHeading, dataList, onItemSelect } = props

  const onSelectItem = (item) => {
    const { key, displayValue, isSelected } = item as IDataList
    if(onItemSelect) {
      onItemSelect(key)
    }

  }

  const renderItem = ({ item }) => {
    const { displayValue, isSelected } = item as IDataList
    return (
      <TouchableOpacity onPress={() => onSelectItem(item)}>
        <CustomText textStyle={{
          ...segoeFontTextStyles.eighteenNormalBlack,
          color: isSelected ? colors.white : colors.dardBlack,
          ...commonStyles.textLeftAlign
        }}>{displayValue}</CustomText>
      </TouchableOpacity>
    )
  }

  const renderItemSeperatorComponent = () => (<View style = {styles.itemSeperator}/>)

  const renderItemListComponent = () => {
    return (
      <FlatListWrapper
        data={dataList}
        renderItem = {renderItem}
        ItemSeparatorComponent = {renderItemSeperatorComponent}
        style = {{
          maxHeight: getHeight() * 0.4
        }}
        contentContainerStyle = {styles.listItemContainer}
      />
    )
  }

  return (
    <View style = {styles.popupContainer}>
      {popupHeading?.length > 0 && <CustomText textStyle={{ ...segoeFontTextStyles.eighteenBlackBoldWeight, ...styles.listItemContainer, paddingBottom: 5 }}>{popupHeading}</CustomText>}
      {renderItemListComponent()}
    </View>
  )
}

export {
  itemSelectionComponent as ItemSelectionComponent
}
