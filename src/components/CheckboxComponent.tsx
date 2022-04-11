import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { RadioButtons } from '.'
import { colors, fontDimens, fontDimensPer } from '../common'
import { icons } from '../common/icons'
import { widthToDp } from '../utils/Responsive'
import { CustomText } from './CustomText'

export const styles = StyleSheet.create({
  checkBoxContainer: {
    borderWidth: 2,
    backgroundColor: colors.white,
    borderRadius: 2,
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#323232'

  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //  marginBottom: isTablet() ? 20 : 15,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  checkBoxTitle: {
    paddingLeft: 15,
    color: colors.black,
    fontWeight: '400',
    fontSize: widthToDp(fontDimensPer.small),
    fontFamily: 'Poppins-Regular'
  },
  outerCircleStyle: {
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: '#323232',
    height: 15,
    width: 15,
  },
  innerCircleStyle: {
    height: 8,
    width: 8
  }
})

export interface CheckBoxOptions {
  multiSelected?: boolean
  showOuterCheckBoxOnSelected?: boolean
  checkboxButtonOpacity?: number
}

interface Props {
  checkBoxKey?: any
  itemTitle?: string
  isCheckBoxSelected?: boolean
  checkBoxStyle?: any
  iconHeight?: any
  iconWidth?: any
  mainContainerStyle?: any
  checkBoxTitleStyle?: any
  checkBoxBackgroundColor?: any
  onPressCheckBox?: (id, isChecked, selectedArray, options?: CheckBoxOptions) => void
  itemKey?: any
  options?: CheckBoxOptions
  outerCheckBoxStyle?: any
  isAlwaysSelected?: boolean
  isCheckBoxDisabled?: boolean
  testID?: string
  isRadioButton?: boolean
}

export class CheckBoxComponent extends PureComponent<Props> {
  static defaultProps = {
    iconHeight: 10,
    iconWidth: 15

  }

  constructor(props: Props) {
    super(props)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps === this.props) {
  //     return false
  //   }
  //   if (
  //     typeof nextProps !== 'object' ||
  //     nextProps === null ||
  //     nextProps === undefined ||
  //     typeof this.props !== 'object' ||
  //     this.props === null ||
  //     this.props === undefined
  //   ) {
  //     return true
  //   }

  //   const currentPropsKeys = Object.keys(nextProps)
  //   const prevPropsKeys = Object.keys(this.props)
  //   if (currentPropsKeys.length !== prevPropsKeys.length) {
  //     return true
  //   }

  //   for (let i = 0; i < currentPropsKeys.length; i++) {
  //     if (prevPropsKeys[i] === 'options' && nextProps.hasOwnProperty('options')) {
  //       if (
  //         get(nextProps, 'options.multiSelected') !== get(this, 'props.options.multiSelected') &&
  //         get(nextProps, 'options.showOuterCheckBoxOnSelected') !==
  //           get(this, 'props.options.showOuterCheckBoxOnSelected')
  //       ) {
  //         return true
  //       }
  //     } else if (
  //       !nextProps.hasOwnProperty(prevPropsKeys[i]) ||
  //       nextProps[currentPropsKeys[i]] !== this.props[currentPropsKeys[i]]
  //     ) {
  //       return true
  //     }
  //   }
  //   return false
  // }

  render() {
    const {
      checkBoxStyle,
      mainContainerStyle,
      checkBoxTitleStyle,
      iconHeight,
      iconWidth,
      checkBoxBackgroundColor,
      onPressCheckBox,
      itemTitle,
      checkBoxKey,
      isCheckBoxSelected,
      itemKey,
      options,
      outerCheckBoxStyle,
      isAlwaysSelected = false,
      isCheckBoxDisabled = false,
      testID,
      isRadioButton = false
    } = this.props
    return (
      <TouchableOpacity
        testID = {testID}
        activeOpacity={isAlwaysSelected ? 1 : 0.2}
        style={[ styles.mainContainer, mainContainerStyle ]}
        disabled = {isCheckBoxDisabled}
        onPress={() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          !options
            ? onPressCheckBox(itemKey, isCheckBoxSelected, checkBoxKey)
            : onPressCheckBox(itemKey, isCheckBoxSelected, checkBoxKey, options)
        }}
      >
        <View style={(options && options.showOuterCheckBoxOnSelected && outerCheckBoxStyle) || {}}>
          {isRadioButton ? (
            <RadioButtons
            outerCircleStyle={styles.outerCircleStyle}
            innerCircleStyle = { [{
              backgroundColor : isCheckBoxSelected ? checkBoxBackgroundColor : colors.white
            }, styles.innerCircleStyle]}
            />
          ) :
            <View
              style={[
                styles.checkBoxContainer,
                {
                  backgroundColor: isCheckBoxSelected ? checkBoxBackgroundColor : colors.white,
                  borderColor: isCheckBoxSelected ? checkBoxBackgroundColor : '#323232'
                },
                checkBoxStyle
              ]}
            >
              {isCheckBoxSelected ? (
                <Image
                  source={icons.TICK}
                  style={{height: iconHeight, width: iconWidth, tintColor: colors.white}}
                  resizeMode={'contain'}
                />
              ) : null}
            </View>
          }
        </View>
        {itemTitle ? <CustomText textStyle={{ ...styles.checkBoxTitle, ...checkBoxTitleStyle }} >{itemTitle}</CustomText> : null}
      </TouchableOpacity>
    )
  }
}
