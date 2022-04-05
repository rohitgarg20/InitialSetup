import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Tooltip from 'rn-tooltip-advance'

// import { colors, dimens } from '../../common-library/config'
// import { verticalScale, icons } from '../../mypat-common/common'
// import { widthPercentage } from '../common'
import { isEmpty } from 'lodash'
import { colors } from '../common'
import { CustomText } from './CustomText'
import { IconButtonWrapper } from './IconButtonWrapper'
import { icons } from '../common/icons'
import { log } from '../config'


// All Item StyleSheet
const styles = StyleSheet.create({
  infoIcon: {
    width: 20,
    height: 20
  },
  tipContainer: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  textStyle: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.white,
    flexWrap: 'wrap'
  },
  textStyleGoal: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.white,
    flexWrap: 'wrap'
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6
  }
})

interface Props {
  tooltipText?: string
  showGoalIcon?: boolean
  toolTipRef?: (ref) => void
  customView?: any
  infoIconStyles?: object
  showCustomIcon?: boolean
  customInfoIcon?: any
  customWidth?: number
  customHeight?: number
  mainViewStyle?: any
  mainHeading?: string
  mainHeadingStyle?: any
  iconWrapperStyle?: any
  customInfoIconWrapperStyle?: any
  customInfoIconHeight?: number
  customInfoIconWidth?: number
  customToolTipView?: any
  customToolTipViewStyle?: any
  backgroundColor?: string
  withPointer?: boolean
  useAsDropDownView?: boolean
  onCloseTooltip?: () => void
  tooltipPosition?: number

}
interface State {
  styles?: any
  contentHeight: number
}

const DEFAULT_SETTINGS = {
  tooltipText: 'ToolTip Text Enters here',
  showGoalIcon: false,
  infoIconStyles: styles.infoIcon,
  showCustomIcon: false,
  customInfoIcon: '',
  mainHeading: '',
  mainHeadingStyle: {},
  customInfoIconWrapperStyle: {}

}

export class InfoToolTip extends Component<Props, State> {
  static defaultProps = {
    customInfoIconHeight: 20,
    customInfoIconWidth: 20,
    tooltipPosition: -1
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      contentHeight: props.customToolTipView ? 0 : 70
    }
  }

  _onLayout = ({ nativeEvent }: { nativeEvent: any }) => {
    this.setState({
      contentHeight: nativeEvent.layout.height
    })
  }

  renderToolTipView() {
    const { tooltipText, showGoalIcon, mainHeading } = this.props
    const { contentHeight } = this.state
    return <View onLayout={this._onLayout}>
      {mainHeading ? <CustomText textStyle={{ fontSize: 16, color: colors.white }}>{mainHeading}</CustomText> : null}
      <CustomText /* onLayout={this._onLayout} */ textStyle={styles.textStyle}>{tooltipText || ''}</CustomText>
      {showGoalIcon && showGoalIcon === true ? (
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          {/* <Image source={icons.HEADERGOAL_ICON} style={styles.infoIcon} resizeMode='contain' /> */}
          <CustomText textStyle={styles.textStyleGoal}>
            {' '}
            Data of this card changes with your selected goal.
          </CustomText>
        </View>
      ) : null}
    </View>
  }

  renderCustomView = () => {
    const { customToolTipView = () => { }, customToolTipViewStyle } = this.props
    return <View style={customToolTipViewStyle}>
      {customToolTipView()}
    </View>
  }

  render() {
    const { customInfoIconWidth, customToolTipView, customView, toolTipRef, tooltipPosition,
      customInfoIconHeight, showCustomIcon = false, customInfoIcon = '', iconWrapperStyle,
      customInfoIconWrapperStyle, backgroundColor, mainViewStyle, customHeight, customWidth, useAsDropDownView = false, withPointer = true } = this.props
    const { contentHeight } = this.state
    let tooltipHeight = contentHeight
    tooltipHeight += customHeight ? customHeight : 20
    const defaultWidth = 60
    let width = customWidth ? customWidth : defaultWidth

    return (
      <Tooltip
        ref={(ref) => {
          if (ref && toolTipRef) {
            log('inside ref function')
            toolTipRef(ref)
          }
        }
        }
        withPointer={withPointer}
        containerStyle={mainViewStyle}
        backgroundColor={backgroundColor || '#333333'}
        withOverlay={false}
        height={tooltipHeight}
        width={width}
        toggleOnPress={true}
        useAsDropDownView={useAsDropDownView}
        tooltipPosition={tooltipPosition}
        // withTooltip = {false}
        onClose={() => {
        }}
        popover={customToolTipView ? this.renderCustomView() : this.renderToolTipView()}
      >{customView ? customView() :
          <View style={[styles.iconWrapper, iconWrapperStyle, customInfoIconWrapperStyle]}>
            <IconButtonWrapper
              iconImage={showCustomIcon ? customInfoIcon : icons.EYE_ICON}
              iconWidth={customInfoIconWidth}
              iconHeight={customInfoIconHeight}
            />
          </View>}
      </Tooltip>
    )
  }
}
