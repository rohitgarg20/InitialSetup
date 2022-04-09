import { IFilterItems, IFilterListItem } from "../common/constant";



import React, { Component } from 'react'
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { CheckBoxComponent } from "./CheckboxComponent";
import { IconButtonWrapper } from "./IconButtonWrapper";
import { icons } from "../common/icons";
import { colors } from "../common";

const styles = StyleSheet.create({
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

interface IProps {
  filterCategory?: IFilterListItem
}

interface IState {
  isViewExpanded: boolean
}

export class FilterListItemsComponent extends Component<IProps, IState> {
  heightInterpolated = new Animated.Value(0)

  state = {
    isViewExpanded: false
  }

  updateViewExpandedStatus = () => {
    const { isViewExpanded } = this.state
    this.heightInterpolated.setValue(isViewExpanded ? 0 : 1)
    this.setState({
      isViewExpanded: !isViewExpanded
    })
  }

  renderArrowItem = () => {
    const { isViewExpanded } = this.state
    return (
      <TouchableOpacity
        onPress={this.updateViewExpandedStatus}
        style = {styles.arrowContainer}
      >
        <IconButtonWrapper
          iconImage={icons.RIGHT_ARROW_ICON}
          iconWidth = {8}
          iconHeight = {11}
          styling = {{
            transform: [{
              rotate:  isViewExpanded ? '-90deg' : '90deg'
            }]
          }}
        />
      </TouchableOpacity>
    )
  }


  renderItemListWithCheckbox = () => {
    const { filterCategory } = this.props
    const { filterId, listItems, filterType  } = filterCategory
    const interpolated =  this.heightInterpolated.interpolate({
      inputRange: [0, 1],
      outputRange: [200, 2000]
    })
    return (
      <>
        <Animated.View style = {{
          maxHeight: interpolated, overflow: 'hidden', borderWidth: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: colors.white, paddingTop: 20}}>

          {
            [...listItems].map((filterItem) => {
              const { id, isSelected = false, displayLabel = '' } = filterItem as IFilterItems
              return (
                <CheckBoxComponent
                  checkBoxKey={filterId}
                  iconHeight={ 12}
                  iconWidth={16}
                  itemKey={id}
                  itemTitle={displayLabel}
                  isCheckBoxSelected={isSelected}
                  isRadioButton = {filterType === 'radioButton'}
                  onPressCheckBox={(filterItemKey, checkBoxInitialValue, filterKey) => {

                  }}
                  // this.onPressCheckBox(filterItemKey, checkBoxInitialValue, filterKey, filterType)

                  checkBoxBackgroundColor={'#323232'}
                  options={undefined}
                  // checkBoxTitleStyle={[
                  //   styles.filterLabel,
                  //   { color: isCheckBoxSelected ? colors.textPrimary : colors.textSecondary }
                  // ]}
                  // checkBoxStyle={isCheckBoxSelected ? styles.selectedCheckBoxStyle : styles.checkBoxStyle}
                  // mainContainerStyle={[mainContainerStyle, {
                  //   opacity: isCheckBoxDisabled ? 0.6 : 1
                  // }]}
                />
              )
            })
          }

        </Animated.View>
        {this.renderArrowItem()}
      </>
    )
  }

  renderRadioItemListComponent = () => {

  }

  render() {
    return (
      <>
        {this.renderItemListWithCheckbox()}
      </>
    )
  }
}
