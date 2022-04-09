import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Animated, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, fontDimens } from '../../common'
import { IFilterItems, IFilterListItem } from '../../common/constant'
import { icons } from '../../common/icons'
import { CheckBoxComponent, CustomText, FilterListItemsComponent, FlatListWrapper, IconButtonWrapper } from '../../components'
import { AnimatedCardComponent } from '../../components/AnimatedCardComponent'
import { log } from '../../config'
import { preferencesDataStore } from '../../store'

const styles = StyleSheet.create({
  categoryNameContainer: {
    width: '100%',
    borderWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: colors.black,
    paddingLeft: 20,
    paddingVertical: 10
  },
  categoryName: {
    fontSize: fontDimens.normal,
    fontWeight: '700',
    color: colors.white
  },
  categoryContainer: {
    // borderWidth: 0,
    // borderBottomLeftRadius: 5,
    // borderBottomRightRadius: 5,
    // backgroundColor: colors.white
  },
  itemSeperator: {
    paddingBottom: 30
  },
  container: {

  },
  arrowContainer: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderColor: 'transparent',
    top: -15
  }
})

@observer
export  class PreferencesScreen extends Component {

  heightInterpolated = new Animated.Value(0)

  componentDidMount() {
    preferencesDataStore.getUserPreferencesAndCategoryData()
  }

  renderAccordianHeaderView = (showInFullMode) => {
    return (
      <View>
        <CustomText>
          Touchable view is here
        </CustomText>
      </View>
    )
  }

  renderGoalLevelsInGoalComponent = ()=> {
    return (
      <View>
        {
          ['a1', 'b1', 'c1'].map((item) => {
            return (
              <CustomText>
                Aster expasion{item}
              </CustomText>
            )
          })
        }
      </View>
    )
  }

  renderListItem = () => {
    return (
      <View>
        <CustomText>Heading</CustomText>
        {
          ['a', 'b', 'c'].map((item) => {
            return (
              <CustomText>
                {item}
              </CustomText>
            )
          })
        }
        <AnimatedCardComponent
          renderHeaderComponent={(showInFullMode) => this.renderAccordianHeaderView(showInFullMode)}
          renderMainContent={() => this.renderGoalLevelsInGoalComponent()}
          // cardContainerStyle={styles.cardContainerStyle}
          animationDuration={500}
        />
      </View>
    )
  }

  renderAnotherView = () => {
    const interpolated =  this.heightInterpolated.interpolate({
      inputRange: [0, 1],
      outputRange: [70, 2000]
    })

    return (
      <View style = {{}}>
        <Animated.View style = {{
          maxHeight: interpolated, backgroundColor: 'red', overflow: 'hidden'}}>
          {
            ['a', 'b', 'c'].map((item) => {
              return (
                <CustomText>
                  {item}
                </CustomText>
              )
            })
          }

        </Animated.View>
        <TouchableOpacity onPress={() => {
          this.heightInterpolated.setValue(1)
        }}>
          <CustomText>
          click to increase
          </CustomText>
        </TouchableOpacity>
      </View>
    )
  }

  renderCategoryName = (filterLabel) => {
    return (
      <View style = {{
        backgroundColor: colors.white
      }}>
        <View style = {styles.categoryNameContainer}>
          <CustomText textStyle={styles.categoryName}>
            {filterLabel}
          </CustomText>
        </View>
      </View>
    )
  }

  renderArrowItem = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.heightInterpolated.setValue(1)

        }}
        style = {styles.arrowContainer}
      >
        <IconButtonWrapper
          iconImage={icons.RIGHT_ARROW_ICON}
          iconWidth = {8}
          iconHeight = {11}
          styling = {{
            transform: [{
              rotate: '90deg'
            }]
          }}
        />
      </TouchableOpacity>
    )
  }


  renderItemListWithCheckbox = (item) => {
      return (
        <FilterListItemsComponent
          filterCategory={item}
        />
      )
  }

  renderPreferenceCategoryList = ({ item, index }) => {
    const { filterLabel, listItems, filterId  } = item as IFilterListItem
    return (
      <View style = {styles.categoryContainer}>
        {this.renderCategoryName(filterLabel)}
        {this.renderItemListWithCheckbox(item)}
      </View>
    )
  }

  renderItemSeperator = () => {
    return (
      <View style = {styles.itemSeperator}/>
    )
  }

  renderPreferencesList = () => {
    const { preferencesListData } = preferencesDataStore
    log('preferencesListDatapreferencesListData', preferencesListData)
    return (
      <FlatListWrapper
        data = {preferencesListData}
        renderItem = {this.renderPreferenceCategoryList}
        ItemSeparatorComponent = {this.renderItemSeperator}
      />
    )
  }

  render() {
    return (
      <View style = {styles.container}>
        {this.renderPreferencesList()}
      </View>
    )
  }
}
