import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from '../common'
import { popinsTextStyle } from '../common/commonStyles'
import { CustomText, FlatListWrapper } from '../common/components'
import { IN_OUT_REGISTER_TAB } from '../common'

const styles = StyleSheet.create({
  tabContainer: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    minWidth: 80
  },
  tabItem: {

  },
  itemSeperator: {
    paddingHorizontal: 20
  }
})

interface IProps {
  tabBarList: any[]
  selectedTabId: string
}

export const HorizontalScrollBar = (props: IProps) => {
  const { tabBarList, selectedTabId } = props

  const renderTabItem = ({ item }) => {
    const { label, key } = item
    let itemStyle = {}
    if(key === selectedTabId) {
      itemStyle = {
        backgroundColor: colors.primaryButton
      }
    }

    return (
      <TouchableOpacity style = {[styles.tabContainer, itemStyle]}>
        <CustomText textStyle={popinsTextStyle.twentyNormalBlack}>{label}</CustomText>
      </TouchableOpacity>
    )
  }

  const renderHorizontalScrollList = () => {
    return (
      <FlatListWrapper
        data = {tabBarList}
        horizontal
        renderItem={renderTabItem}
        ItemSeparatorComponent = {() => (<View style = {styles.itemSeperator}/>)}
      />
    )
  }
  return (
    <View style = {{
        zIndex: 999
    }}>
      {renderHorizontalScrollList()}
    </View>
  )
}