import { Picker } from '@react-native-picker/picker'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Animated, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import  { get } from 'lodash'
import { colors, commonStyles, segoeFontTextStyles, strings } from '../../common'
import { BottomModalPopup, ButtonComponent, FlatListWrapper, GenericDrawerComponent, HeaderComponent, ItemSelectionComponent } from '../../components'
import { CustomText } from '../../components/CustomText'
import { genericDrawerStore, propetyDetailStore } from '../../store'
import { log } from '../../config'
import { TextInputComponent } from '../../components/TextInputWrapper'

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.drawerBackGroundGray
  },
  labelContainer: {
    paddingVertical: 15
  },
  selectItem: {
    borderWidth: 1,
    borderColor: colors.primaryButton,
    borderRadius: 5,
    backgroundColor: colors.primaryButton
  },
  listContainer: {
    paddingHorizontal: '10%',
    height: '100%',
    justifyContent: 'center',
    flex: 1,
    // flexGrow: 1
  },
  textLabel: {
    padding: 10
  }
})

const { SELECT_PROPERTY_TYPE, SELECT_FLOOR, SELECT_FLAT, ENTER_PROPERTY_DETAIL, ENTER_ADDRESS, SELECT_OWNERSHIP, SUBMIT_DETAILS } = strings.EDIT_PROPERTY_DETAILS

const enterPropertyDetailScreen = observer(() => {

  const { propertiesList, selectedPropertyData, updateSelectedPropertyItem, selectedFloorData, floorsList, updateSelectedFloorId,
    flatsList, selectedFlatData, updateSelectedFlatId, updateAddress, address, ownershipTypeList, updateOwnershipStatus, 
    selectedOwnershipData, savePropertyDetails, isSubmitButtonDisabled } = propetyDetailStore


  useEffect(() => {
    propetyDetailStore.getInitData()
    return () => {
      propetyDetailStore.init()
    }
  } , [])

  const onSelectPropertyType = (key) => {
    updateSelectedPropertyItem(key)
    genericDrawerStore.disableDrawer()
  }

  const onSelectFloor = (key) => {
    updateSelectedFloorId(key)
    genericDrawerStore.disableDrawer()
  }

  const onSelectFlat = (key) => {
    updateSelectedFlatId(key)
    genericDrawerStore.disableDrawer()
  }

  const onChangeOwnership = (key) => {
    updateOwnershipStatus(key)
    genericDrawerStore.disableDrawer()
  }

  const renderPropertyList = () => {
    log('renderPropertyListrenderPropertyList')
    genericDrawerStore.enableDrawer()
    genericDrawerStore.updateCloseDrawerOnOutsideTap(true)
    genericDrawerStore.setRenderingComponent(() => (
      <BottomModalPopup
        innerContent={() => {
          return (
            <ItemSelectionComponent
              dataList={propertiesList}
              popupHeading = {SELECT_PROPERTY_TYPE}
              onItemSelect = {onSelectPropertyType}
            />
          )
        }}
      />
    ))
  }

  const renderFloorList = () => {
    log('renderPropertyListrenderPropertyList')
    genericDrawerStore.enableDrawer()
    genericDrawerStore.updateCloseDrawerOnOutsideTap(true)
    genericDrawerStore.setRenderingComponent(() => (
      <BottomModalPopup
        innerContent={() => {
          return (
            <ItemSelectionComponent
              dataList={floorsList}
              popupHeading = {SELECT_FLOOR}
              onItemSelect = {onSelectFloor}
            />
          )
        }}
      />
    ))
  }

  const renderFlatsList = () => {
    log('renderPropertyListrenderPropertyList')
    genericDrawerStore.enableDrawer()
    genericDrawerStore.updateCloseDrawerOnOutsideTap(true)
    genericDrawerStore.setRenderingComponent(() => (
      <BottomModalPopup
        innerContent={() => {
          return (
            <ItemSelectionComponent
              dataList={flatsList}
              popupHeading = {SELECT_FLAT}
              onItemSelect = {onSelectFlat}
            />
          )
        }}
      />
    ))
  }

  const renderOwnershipList = () => {
    log('renderPropertyListrenderPropertyList')
    genericDrawerStore.enableDrawer()
    genericDrawerStore.updateCloseDrawerOnOutsideTap(true)
    genericDrawerStore.setRenderingComponent(() => (
      <BottomModalPopup
        innerContent={() => {
          return (
            <ItemSelectionComponent
              dataList={ownershipTypeList}
              popupHeading = {SELECT_OWNERSHIP}
              onItemSelect = {onChangeOwnership}
            />
          )
        }}
      />
    ))
  }

  const renderDropdownLabelComponent = (label) => {
    return (
      <View style = {styles.labelContainer}>
        <CustomText textStyle={{ ...segoeFontTextStyles.eighteenNormalGreyish, ...commonStyles.textLeftAlign }}>{label}</CustomText>
      </View>
    )
  }

  const renderPropertyListComponent = () => {
    const selectedPropertyName = get(selectedPropertyData, 'displayValue') || SELECT_PROPERTY_TYPE
    return (

      <TouchableOpacity style = {[commonStyles.rowWithEqualSpaced, styles.selectItem]} onPress = {renderPropertyList}>
        <CustomText  textStyle={{ ...segoeFontTextStyles.eighteenNormalBlack, ...styles.textLabel }}>{selectedPropertyName}</CustomText>
      </TouchableOpacity>
    )
  }

  const renderFloorListComponent = () => {
    const selectedFloorName = get(selectedFloorData, 'displayValue') || SELECT_FLOOR
    const isDisabled = get(selectedPropertyData, 'displayValue', '').length === 0
    return (

      <TouchableOpacity
        style = {[commonStyles.rowWithEqualSpaced, styles.selectItem, { opacity: isDisabled ? 0.5 : 1 }]}
        onPress = {renderFloorList}
        disabled = {isDisabled}
      >
        <CustomText  textStyle={{ ...segoeFontTextStyles.eighteenNormalBlack, ...styles.textLabel }}>{selectedFloorName}</CustomText>
      </TouchableOpacity>
    )
  }

  const renderFlatListComponent = () => {
    const selectedFlatName = get(selectedFlatData, 'displayValue') || SELECT_FLAT
    log('selectedFlatDataselectedFlatData', selectedFloorData)
    const isDisabled = get(selectedFloorData, 'displayValue', '').length === 0

    return (

      <TouchableOpacity
        style = {[commonStyles.rowWithEqualSpaced, styles.selectItem, { opacity: isDisabled ? 0.5 : 1 } ]}
        onPress = {renderFlatsList}
        disabled = {isDisabled}>
        <CustomText  textStyle={{ ...segoeFontTextStyles.eighteenNormalBlack, ...styles.textLabel }}>{selectedFlatName}</CustomText>
      </TouchableOpacity>
    )
  }

  const renderOwnerShipListComponent = () => {
    const selectedFlatName = get(selectedOwnershipData, 'displayValue') || SELECT_OWNERSHIP

    return (

      <TouchableOpacity
        style = {[commonStyles.rowWithEqualSpaced, styles.selectItem, {  } ]}
        onPress = {renderOwnershipList}
        disabled = {false}>
        <CustomText  textStyle={{ ...segoeFontTextStyles.eighteenNormalBlack, ...styles.textLabel }}>{selectedFlatName}</CustomText>
      </TouchableOpacity>
    )
  }

  const renderSelectPropertyComponent = () => {
    return (
      <View>
        {renderDropdownLabelComponent(`${SELECT_PROPERTY_TYPE} *`)}
        {renderPropertyListComponent()}
      </View>
    )
  }

  const renderSelectFloorComponent = () => {
    return (
      <View>
        {renderDropdownLabelComponent(`${SELECT_FLOOR} *`)}
        {renderFloorListComponent()}
      </View>
    )
  }

  const renderSelectFlatComponent = () => {
    return (
      <View>
        {renderDropdownLabelComponent(`${SELECT_FLAT} *`)}
        {renderFlatListComponent()}
      </View>
    )
  }

  const renderSelectOwnershipComponent = () => {
    return (
      <View>
        {renderDropdownLabelComponent(`${SELECT_OWNERSHIP} *`)}
        {renderOwnerShipListComponent()}
      </View>
    )
  }

  const renderHeaderComponent = () => {
    return (
      <HeaderComponent
        headerLabel={ENTER_PROPERTY_DETAIL}
        hideBackButton = {true}
        customHeadingStyle = {{ ...segoeFontTextStyles.twentyTwoNormalGreyish, textAlign: 'center', left: 0}}
      />
    )
  }

  const renderAddressTextInput = () => {
    return (
      <TextInputComponent
        placeholder={'Address'}
        inputValue = {address}
        // errorMsg = {showErrorMessage ? INCORRECT_EMAIL_ID : ''}
        onChangeText = {updateAddress}
      />
    )
  }

  const renderAddressComponent = () => {
    return (
      <View>
        {renderDropdownLabelComponent(ENTER_ADDRESS)}
        {renderAddressTextInput()}
      </View>
    )
  }

  const renderSubmitButton = () => {
    return (
      <ButtonComponent
        buttonLabel={SUBMIT_DETAILS}
        onPressButton = {savePropertyDetails}
        buttonContainerStyles = {{
          marginTop: 30,
          opacity: isSubmitButtonDisabled ? 0.5 : 1
        }}
        disabled = {isSubmitButtonDisabled}
      />
    )
  }

  return (
    <ScrollView style = {commonStyles.fullBlackContainer} contentContainerStyle = {{  }}>
      {renderHeaderComponent()}
      <View style = {styles.listContainer}>
        {renderSelectPropertyComponent()}
        {renderSelectFloorComponent()}
        {renderSelectFlatComponent()}
        {renderSelectOwnershipComponent()}
        {renderAddressComponent()}
        {renderSubmitButton()}
      </View>
    </ScrollView>
  )
})

export {
  enterPropertyDetailScreen as EnterPropertyDetailScreen
}
