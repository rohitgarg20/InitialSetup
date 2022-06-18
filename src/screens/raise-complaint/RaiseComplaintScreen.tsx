/* eslint-disable react-native/no-inline-styles */
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Keyboard, Animated } from 'react-native'
import { map } from 'lodash'
import { colors, fontDimensPer, icons, strings, textStyles } from '../../common'
import { ISelectedCategoryData } from '../../common/Interfaces'
import { widthToDp } from '../../common/Responsive'
import { ButtonComponent, HeaderComponent, IconButtonWrapper } from '../../components'
import { CustomText } from '../../components/CustomText'
import { log } from '../../config'
import { pushNavigation } from '../../service'
import { raiseComplaintDataStore } from '../../store'
import { TextInputComponent } from '../../components/TextInputWrapper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header } from '@react-navigation/stack'
import { getHeight } from '../../common/Scaling'
import { COMPLAINT_TYPE_LIST, COMPLAIN_TYPE_KEYS, HEADER_TOP } from '../../common/constant'

const FOTTER_BUTTON_HEIGHT = 70

const styles = StyleSheet.create({
  container: {
    // minHeight: getHeight(),
    backgroundColor: colors.primaryButton,
    height: getHeight(),
    flex: 1
  },
  subContainer: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.lightBlack,
    paddingTop: 10,
    borderColor: colors.lightBlack,
    zIndex: 1,
    justifyContent: 'flex-end'
    // paddingHorizontal: 20
  },
  categoryItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 13,
    padding: 5,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.black,
    marginVertical: 10
  },
  subCategoryItemContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 13,
    padding: 5,
    backgroundColor: colors.black,
    borderWidth: 2,
    borderColor: colors.black
    // marginVertical: 10
  },
  categoryName: {
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    color: colors.black
  },
  subCategoryName: {
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    color: colors.primaryButton
  },
  backButtonContainer: {
    borderWidth: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10
  },
  forwardArrowSubCategory: {
    backgroundColor: colors.primaryButton,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10
  },
  selectedCategoryContainer: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: colors.white,
    zIndex: 1,
    paddingBottom: 20
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 20
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.white
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  complaintTypeLabel: {
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    color: colors.black,
    paddingLeft: 10,
    fontFamily: 'poppins'
  },
  roundedBorderContainer: {
    borderRadius: 20,
    padding: 10,
    paddingBottom: 20,
    backgroundColor: colors.white
  },
  itemSeperator: {
    marginBottom: 20
  },
  textInput: {
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    color: colors.black,
    fontFamily: 'poppins',
    height: '100%',
    textAlignVertical: 'top'
  },
  buttonContainer: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor: colors.white,
    height: FOTTER_BUTTON_HEIGHT,
    paddingHorizontal: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteBgButton: {
    backgroundColor: colors.white,
    height: 70,
    paddingHorizontal: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexEnd: {
    // flex: 1,
    // justifyContent: 'flex-end'

  }
})

interface IProps {
  navigation?: any
}

const raiseComplaintScreen = observer((props: IProps) => {
  const { navigation } = props
  const { selectedCategoryData, complainTitle, updateSelectedComplaintType, complainDescription, updateComplaintAddress,
    updateComplaintTitle, updateComplainDescription, selectedComplainType, complainAddress, submitComplaint, onlyViewComplaintDescription = false } = raiseComplaintDataStore
  const { categoryName, subCategoryName, categoryId } = selectedCategoryData as ISelectedCategoryData

  const bottomValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (event) => {
      log('eventeventeventeventeventevent', event)
      bottomValue.setValue(-FOTTER_BUTTON_HEIGHT)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      bottomValue.setValue(0)
    })

    return () => {
      Keyboard.dismiss()
      showSubscription.remove()
      hideSubscription.remove()
      raiseComplaintDataStore.resetComplaintFormData()
      if (onlyViewComplaintDescription) {
        raiseComplaintDataStore.init()
      } else {
        raiseComplaintDataStore.resetComplaintFormData()
      }
    }
  }, [bottomValue, onlyViewComplaintDescription])


  const renderHeader = () => {
    const { HEADING, COMPLAINT_DETAILS } = strings.RAISE_COMPLAINT
    return (
      <HeaderComponent
        headerLabel={ onlyViewComplaintDescription ? COMPLAINT_DETAILS :  HEADING}
      />
    )
  }

  const navigateToCategoryScreen = () => {
    pushNavigation(navigation, 'CategoryListScreen', {
      isPushNavigation: true
    })
  }

  const navigateToSubCategoryScreen = () => {
    pushNavigation(navigation, 'SubCategoryListScreen', {
      selectedCategoryData: {
        categoryId ,
        categoryName
      }
    })
  }

  const renderSelectedCategory = () => {

    return (
      <TouchableOpacity style = {styles.categoryItemContainer}
        onPress = {
          () => navigateToCategoryScreen()}
        disabled = {onlyViewComplaintDescription}
      >
        <CustomText textStyle={styles.categoryName}>{categoryName}</CustomText>
        <IconButtonWrapper
          iconImage={icons.FORWARD_ARROW}
          iconHeight = {15}
          iconWidth = {15}
          containerStyle = {styles.backButtonContainer}/>
      </TouchableOpacity>
    )
  }

  const renderSelectedSubCategory = () => {

    return (
      <TouchableOpacity
        style = {styles.subCategoryItemContainer}
        onPress = {() => navigateToSubCategoryScreen()}
        disabled = {onlyViewComplaintDescription}
      >
        <CustomText textStyle={styles.subCategoryName}>{subCategoryName}</CustomText>
        <IconButtonWrapper
          iconImage={icons.FORWARD_ARROW}
          iconHeight = {15}
          iconWidth = {15}
          styling = {{
            tintColor: colors.black
          }}
          containerStyle = {styles.forwardArrowSubCategory}/>
      </TouchableOpacity>
    )
  }

  const renderSelectedCategoryData = () => {
    const { SELECT_CATEGORY } = strings.RAISE_COMPLAINT
    return (
      <View style = {[styles.roundedBorderContainer, styles.itemSeperator]}>
        <CustomText textStyle={textStyles.boldHeadingWithPopins}>{SELECT_CATEGORY}</CustomText>
        {renderSelectedCategory()}
        {renderSelectedSubCategory()}
      </View>
    )
  }

  const renderComplaintTypeView = () => {
    const { COMPLAINT_TYPE } = strings.RAISE_COMPLAINT
    return (
      <View style = {[styles.roundedBorderContainer, styles.itemSeperator]}>
        <CustomText textStyle={textStyles.boldHeadingWithPopins}>{COMPLAINT_TYPE}</CustomText>
        <View style = {styles.rowContainer}>
          {
            map(COMPLAINT_TYPE_LIST, (complaintItem) => {
              const { id, displayLabel } = complaintItem || {}
              const isSelected = id === selectedComplainType
              return (
                <TouchableOpacity
                  style = {styles.rowItem}
                  onPress = {() => updateSelectedComplaintType(id)}
                  disabled = {onlyViewComplaintDescription}
                >
                  <View style = {{ ...styles.radioButton, backgroundColor: isSelected ? colors.black : colors.white }}/>
                  <CustomText textStyle={styles.complaintTypeLabel}>{displayLabel}</CustomText>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    )
  }


  const renderComplaintAddress = () => {
    const { COMPLAINT_ADDRESS } = strings.RAISE_COMPLAINT

    return (
      <TextInputComponent
        inputContainerStyle = {[styles.roundedBorderContainer, styles.itemSeperator, { height: 100,  alignItems: 'flex-start',
          padding: 0 }]}
        placeholder = {COMPLAINT_ADDRESS}
        multiline = {true}
        useAnimated = {false}
        textInputStyle = {styles.textInput}
        onChangeText = {updateComplaintAddress}
        inputValue = {complainAddress}
        editable = {!onlyViewComplaintDescription}
      />
    )
  }

  const renderComplaintTitle = () => {
    const { COMPLAINT_TITLE } = strings.RAISE_COMPLAINT

    return (
      <TextInputComponent
        inputContainerStyle = {[styles.roundedBorderContainer, styles.itemSeperator, { height: 100,  alignItems: 'flex-start',
          padding: 0 }]}
        placeholder = {COMPLAINT_TITLE}
        multiline = {true}
        useAnimated = {false}
        textInputStyle = {styles.textInput}
        onChangeText = {updateComplaintTitle}
        inputValue = {complainTitle}
        editable = {!onlyViewComplaintDescription}
      />
    )
  }

  const renderComplaintDescription = () => {
    const { COMPLAINT_DESCRIPTION } = strings.RAISE_COMPLAINT

    return (
      <TextInputComponent
        inputContainerStyle = {[styles.roundedBorderContainer, styles.itemSeperator, { height: 150,  alignItems: 'flex-start',
          padding: 0
        }]}
        placeholder = {COMPLAINT_DESCRIPTION}
        multiline = {true}
        useAnimated = {false}
        textInputStyle = {styles.textInput}
        onChangeText = {updateComplainDescription}
        inputValue = {complainDescription}
        editable = {!onlyViewComplaintDescription}
      />
    )
  }

  const renderComplainButton = () => {
    const { SUBMIT_COMPLAINT } = strings.RAISE_COMPLAINT


    return (
      <ButtonComponent
        buttonLabel={SUBMIT_COMPLAINT}
        onPressButton={submitComplaint}
        buttonContainerStyles = {{
          borderRadius: 10
        }}
        buttonLabelStyles = {[styles.complaintTypeLabel, { paddingLeft: 0, fontWeight: '700' }]}
        disabled = {onlyViewComplaintDescription}
      />
    )
  }

  const renderComplainButtonWithBorder = () => {
    return (
      <Animated.View style = {[styles.whiteBgButton, {
        transform: [{
          translateY: bottomValue.interpolate({
            inputRange: [-FOTTER_BUTTON_HEIGHT, 0],
            outputRange: [0, getHeight()]
          })
        }]
      }]}>
        {renderComplainButton()}
      </Animated.View>
    )
  }

  const renderSubmitComplainButton = () => {
    const { SUBMIT_COMPLAINT } = strings.RAISE_COMPLAINT
    if (onlyViewComplaintDescription) {
      return null
    }
    return (
      <Animated.View style = {[styles.buttonContainer, {
        // bottom: bottomValue
      }]}>
        {renderComplainButton()}
      </Animated.View>
    )
  }

  const renderComplaintForm = () => {
    return (
      <View style = {styles.subContainer} >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps = {'handled'}
          style = {{
            flex: 1,
            marginTop: HEADER_TOP
          }}
          contentContainerStyle = {{
            flexGrow: 1
          }}
        >
          <View style = {{
            paddingHorizontal: 20
          }}>
            {renderSelectedCategoryData()}
            {renderComplaintTypeView()}
            { selectedComplainType === COMPLAIN_TYPE_KEYS.COMMON_AREA_COMPLAIN && renderComplaintAddress()}
            {renderComplaintTitle()}
            {renderComplaintDescription()}
          </View>
          {/* {renderComplainButtonWithBorder()} */}

        </ScrollView>
        {renderSubmitComplainButton()}
      </View>
    )
  }

  return (
    <View style = {styles.container}>
      {renderHeader()}
      {renderComplaintForm()}

    </View>
  )
})

export {
  raiseComplaintScreen as RaiseComplaintScreen
}
