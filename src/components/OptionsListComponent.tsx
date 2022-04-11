import React, { PureComponent } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { get } from 'lodash'

import { inject, observer } from 'mobx-react'
import { FlatListWrapper } from './FlatListWrapper'
import { CustomText } from './CustomText'
import { IconButtonWrapper } from './IconButtonWrapper'
import { colors, fontDimensPer } from '../common'
import { OptionsData } from '../store/interfaces'
import { log } from '../config'
import { widthToDp } from '../utils/Responsive'

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'

  },
  heading: {
    fontSize: widthToDp(fontDimensPer.small),
    color: colors.black,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  subHeading: {
    fontSize: 14,
    color: colors.grey,
    paddingTop: 5
  },
  labelContainer: {
    paddingLeft: 12
  },
  listItemSeparator: {
    paddingTop: 15
  },
  listContainer: {
    paddingHorizontal: 20
    // paddingVertical: 10,
    // paddingBottom: 20
  },
  shimmerPlaceHolder: {
    height: 30,
    borderRadius: 4,
    // elevation: 4,
    marginBottom: 12
  }
})

interface Props {
  onClickListItem?: (key) => void
  optionsList?: OptionsData[]
}

interface State {
  // optionsList?: OptionsData[]
}

export class CommunityOptionsComponent extends PureComponent<Props, State> {
  onClickShareVia = (key) => {
    const { onClickListItem } = this.props
    if (onClickListItem) {
      onClickListItem(key)
    }
  }

  renderListItem = (item: OptionsData) => {
    const { key, icon, heading, subHeading, showToUser = true, iconStyle = {} } = item
    const { onClickListItem } = this.props
    return showToUser ? (
      <TouchableOpacity
        style={styles.listItem}
        testID={`touch-${key}`}
        onPress={() => {
          if (onClickListItem) {
            onClickListItem(key)
          }
        }}
      >
        <View>
          <IconButtonWrapper
            iconImage={icon}
            iconWidth={20}
            iconHeight={20}
            styling={iconStyle}
          />
        </View>
        <View style={styles.labelContainer}>
          {heading ? <CustomText textStyle={styles.heading} >{heading}</CustomText> : null}
          {subHeading ? <CustomText textStyle={styles.subHeading}>{subHeading}</CustomText> : null}
        </View>
      </TouchableOpacity>
    ) : null
  }

  getOptionsListToShow = (questionOptionsList) => {
    return questionOptionsList.filter((item) => {
      return get(item, 'showToUser', false) === true
    })
  }

  renderOptionList = () => {
    const { optionsList } = this.props
    return (
      <FlatListWrapper
        isFetching={false}
        contentContainerStyle={styles.listContainer}
        data={optionsList}
        renderItem={({ item, index }) => {
          return this.renderListItem(item)
        }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        placeholderStyle={styles.shimmerPlaceHolder}
        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
      />
    )
  }

  componentDidMount() { }

  render() {
    log('renderrenderrenderrenderrender', this.props.optionsList)
    return <View style={{ width: 'auto', borderRadius: 5 }} >{this.renderOptionList()}</View>
  }
}
