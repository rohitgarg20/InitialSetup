import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, fontDimensPer } from '../common'
import { icons } from '../common/icons'
import { IDataList } from '../common/Interfaces'
import { getHeight } from '../common/scaling'
import { genericDrawerStore } from '../store'
import { widthToDp } from '../utils/Responsive'
import { CustomText } from './CustomText'
import { FlatListWrapper } from './FlatListWrapper'
import { IconButtonWrapper } from './IconButtonWrapper'


interface IProps {
  dataList: IDataList[]
  onItemSelect?: (key) => void
  popupHeading?: string
}

const styles = StyleSheet.create({
  popupContainer: {
    borderWidth: 1,
    borderColor: colors.white,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: colors.white,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: 2,
    paddingVertical: 15,
    paddingLeft: 10
  },
  itemSeperator: {
    paddingBottom: 20
  },
  listItemContainer: {
    padding: 10
  },
  heading: {
    fontSize:  widthToDp(fontDimensPer.medium),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: colors.lightBlue,
    textAlign: 'center',
    paddingHorizontal: 60
  },
  textPadding: {},
  listItem: {
    // fontSize: fontDimens.small,
    color: colors.black,
    fontWeight: '500',
    fontSize:  widthToDp(fontDimensPer.medium),
    fontFamily: 'Poppins-Medium',
    paddingLeft: 10
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerStyle: {
    paddingTop: 20
  }
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
    const { displayValue, isSelected, srcIcon } = item as IDataList
    return (
      <TouchableOpacity onPress={() => onSelectItem(item)} style = {styles.rowContainer}>
        <IconButtonWrapper
          iconImage={srcIcon}
          iconHeight={ widthToDp(fontDimensPer.medium)}
          iconWidth={ widthToDp(fontDimensPer.medium)}
        />
        <CustomText textStyle={{
          ...styles.listItem,
          color: isSelected ? colors.white : colors.black
        }}>{displayValue}</CustomText>
      </TouchableOpacity>
    )
  }

  const renderItemSeperatorComponent = () => (<View style = {styles.itemSeperator}/>)

  const renderFooterComponent = () => {
    return (
      <TouchableOpacity onPress={() => {
        genericDrawerStore.closeDrawerWithAnimation()
      }}>
        <IconButtonWrapper
          iconImage={icons.CROSS_ICON}
          iconHeight={ widthToDp(fontDimensPer.medium)}
          iconWidth={ widthToDp(fontDimensPer.medium)}
        />
      </TouchableOpacity>
    )
  }

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
        ListFooterComponent = {renderFooterComponent}
        ListFooterComponentStyle = {styles.footerStyle}
      />
    )
  }

  return (
    <View style = {styles.popupContainer}>
      {popupHeading?.length > 0 && <CustomText textStyle={{ ...styles.heading, ...styles.listItemContainer, paddingBottom: 5 }}>{popupHeading}</CustomText>}
      {renderItemListComponent()}
    </View>
  )
}

export {
  itemSelectionComponent as ItemSelectionComponent
}
