import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { get } from 'lodash'
import { colors, fontDimensPer, icons, strings, textStyles } from '../../common'
import { ICategoryList } from '../../common/Interfaces'
import { BackButtonComponent, ContainerDataComponent, FlatListWrapper, HeaderComponent, IconButtonWrapper } from '../../components'
import { CustomText } from '../../components/CustomText'
import { raiseComplaintDataStore } from '../../store'
import { widthToDp } from '../../common/Responsive'
import { log } from '../../config'
import { navigateSimple, pushNavigation } from '../../service'


interface IProps {
  navigation?: any
  route?: any
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
    backgroundColor: colors.primaryButton
  },
  backButtonContainer: {
    borderWidth: 1,
    backgroundColor: colors.black,
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
    color: colors.dardBlack
  }
})

export const CategoryListScreen = observer((props: IProps) => {


  const { route } = props || {}
  const { isPushNavigation = false } = route?.params || {}
  const { categoryList } = raiseComplaintDataStore

  useEffect(() => {
    raiseComplaintDataStore.setCategoryList()
  }, [])

  const renderHeaderSection = () => {
    const { HEADING } = strings.CATEGORY_LIST_SCREEN
    return (
      <HeaderComponent
        headerLabel={HEADING}
      />
    )
  }

  const navigateToSubCategory = (item) => {
    const { navigation } = props
    const { categoryId, categoryName } = item as ICategoryList
    raiseComplaintDataStore.setSelectedCategoryId(categoryId)
    if (isPushNavigation) {
      pushNavigation(navigation, 'SubCategoryListScreen', {
        selectedCategoryData: {
          categoryId ,
          categoryName
        }
      })
    } else {
      navigateSimple(navigation, 'SubCategoryListScreen', {
        selectedCategoryData: {
          categoryId ,
          categoryName
        }
      })
    }
  }

  const renderCategoryItem = ({item}) => {
    const { categoryId, categoryName } = item as ICategoryList
    return (
      <TouchableOpacity style = {styles.categoryItemContainer} onPress = {() => navigateToSubCategory(item)}>
        <CustomText textStyle={styles.categoryName}>{categoryName}</CustomText>
        <IconButtonWrapper
          iconImage={icons.FORWARD_ARROW}
          iconHeight = {15}
          iconWidth = {15}
          containerStyle = {styles.backButtonContainer}/>
      </TouchableOpacity>
    )
  }

  const renderCategoryList = () => {
    log('categoryListcategoryList', categoryList)
    return (
      <FlatListWrapper
        contentContainerStyle = {{
          paddingTop: 40,
          paddingHorizontal: 5
        }}
        data={categoryList}
        renderItem = {renderCategoryItem}
        keyExtractor = {(item, index) => get(item, 'categoryId', index).toString()}
        ItemSeparatorComponent = {() => <View style = {styles.itemSeperator}/>}
      />
    )
  }

  return (
    <View style = {styles.container}>
      {renderHeaderSection()}
      <ContainerDataComponent
        renderContainerComponent = {renderCategoryList}
      />
    </View>
  )
})
