import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { get } from 'lodash'
import { colors, fontDimensPer, icons, strings, textStyles } from '../../common'
import { ICategoryList, ISubCategoryList } from '../../common/Interfaces'
import { BackButtonComponent, ContainerDataComponent, FlatListWrapper, HeaderComponent, IconButtonWrapper } from '../../components'
import { CustomText } from '../../components/CustomText'
import { raiseComplaintDataStore } from '../../store'
import { widthToDp } from '../../common/Responsive'
import { log } from '../../config'
import { navigateSimple } from '../../service'

interface IProps {
  route?: any
  navigation?: any
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  heading: {
    flex: 1,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryButton
  },
  categoryItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 13,
    padding: 10,
    backgroundColor: colors.dardBlack
  },
  backButtonContainer: {
    borderWidth: 1,
    backgroundColor: colors.primaryButton,
    padding: 5,
    borderRadius: 5
  },
  itemSeperator: {
    paddingBottom: 10
  },
  subContainer: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.lightBlack,
    padding: 10,
    borderColor: colors.lightBlack
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 50,
    flexDirection: 'row'
  },
  categoryName: {
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    color: colors.primaryButton
  }
})

export const SubCategoryListScreen = observer((props: IProps) => {

  const { route } = props || {}
  const { selectedCategoryData = {} } = route?.params || {}
  log('selectedCategoryDataselectedCategoryData', selectedCategoryData, route)
  const { categoryId, categoryName } = selectedCategoryData as ICategoryList || {}
  const renderHeaderSection = () => {
    const { HEADING } = strings.SUB_CATEGORY_LIST_SCREEN
    return (
      <HeaderComponent
        headerLabel={HEADING}
      />
    )
  }

  const navigateToRaiseComplaintScreen = (subCategoryName, subCategoryId) => {
    const { navigation } = props
    raiseComplaintDataStore.setSelectedCategoryData({
      categoryName,
      categoryId,
      subCategoryName,
      subCategoryId
    })
    navigateSimple(navigation, 'RaiseComplaintScreen')
  }

  const renderCategoryItem = ({item}) => {
    const { subCategoryName, subCategoryId } = item as ISubCategoryList
    return (
      <TouchableOpacity style = {styles.categoryItemContainer} onPress = {() => navigateToRaiseComplaintScreen(subCategoryName, subCategoryId)}>
        <CustomText textStyle={styles.categoryName}>{subCategoryName}</CustomText>
        <IconButtonWrapper
          iconImage={icons.FORWARD_ARROW}
          iconHeight = {15}
          iconWidth = {15}
          styling = {{
            tintColor: colors.dardBlack
          }}
          containerStyle = {styles.backButtonContainer}/>
      </TouchableOpacity>
    )
  }

  const renderCategoryList = () => {
    const { subCategoryListByCategoryId } = raiseComplaintDataStore
    return (
      <FlatListWrapper
        contentContainerStyle = {{
          paddingTop: 40,
          paddingHorizontal: 5
        }}
        data={subCategoryListByCategoryId}
        renderItem = {renderCategoryItem}
        keyExtractor = {(item, index) => get(item, 'subCategoryId', index).toString()}
        ItemSeparatorComponent = {() => <View style = {styles.itemSeperator}/>}
      />
    )
  }

  return (
    <View style = {styles.container}>
      {renderHeaderSection()}
      <ContainerDataComponent
        renderContainerComponent = {renderCategoryList}
        subContainerStyle = {{
          backgroundColor: colors.lightBlack
        }}
      />
    </View>
  )
})
