import React, { PureComponent } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { get } from 'lodash'

import { inject, observer } from 'mobx-react'
import { FlatListWrapper } from './FlatListWrapper'
import { CustomText } from './CustomText'
import { IconButtonWrapper } from './IconButtonWrapper'
import { colors, fontDimens, fontDimensPer } from '../common'
import { OptionsData } from '../store/interfaces'
import { log } from '../config'
import { UserAvatar } from './UserAvtar'
import { BASE_URL, HEADER_HEIGHT } from '../common/constant'
import { capitalizeFirstLetterOnly } from '../utils/app-utils'
import { widthToDp } from '../utils/Responsive'

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 15

  },
  heading: {
    // fontSize: 12,
    color: colors.black,
    fontWeight: '400',
    // lineHeight: 12,
    fontSize: widthToDp(fontDimensPer.small),
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
    // paddingHorizontal: 20
    // paddingVertical: 10,
    // paddingBottom: 20,
  },
  shimmerPlaceHolder: {
    height: 30,
    borderRadius: 4,
    // elevation: 4,
    marginBottom: 12
  },
  avtarContainer: {
    height: HEADER_HEIGHT - 15,
    width: HEADER_HEIGHT - 15,
    justifyContent: 'center',
    marginRight: 5
  },
  withoutImageColor: {
    backgroundColor: '#cccccc'
  },
  rowContainer: {
    paddingLeft: 10,
    flexDirection: 'row',
    height: HEADER_HEIGHT - 5,
    backgroundColor: colors.black,
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
    alignItems: 'center',
    // paddingHorizontal: 10
  },
  userName: {
    // fontSize: fontDimens.medium,
    color: colors.white,
    fontSize: widthToDp(fontDimensPer.small),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    flex: 1,

  },
  headerStyle: {
    marginBottom: 10
  }
})

interface Props {
  onClickListItem?: (key) => void
  optionsList?: OptionsData[]
  username?: string
  picture?: string
}

interface State {
  // optionsList?: OptionsData[]
}

export class UserOptionsListComponent extends PureComponent<Props, State> {
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
            iconWidth={16}
            iconHeight={16}
            styling={iconStyle}
          />
        </View>
        <View style={styles.labelContainer}>
          {heading ? <CustomText textStyle={styles.heading}>{heading}</CustomText> : null}
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

  renderRoundedAvtar = () => {
    const { username, picture } = this.props
    return username ? (
      <View style={[styles.avtarContainer]}>
        <UserAvatar
          size={'30'}
          imageStyle={[styles.withoutImageColor, { width: '80%', height: '80%' }]}
          showBorderRadius={true}
          name={username.toUpperCase()}
          src={`${BASE_URL}${picture}`}
        />
      </View>
    ) : null
  }

  renderUserName = () => {
    const { username = '' } = this.props
    return (
      <CustomText textStyle={styles.userName}>
        {capitalizeFirstLetterOnly(username)}
      </CustomText>
    )
  }

  renderHeaderComponent = () => {
    return (
      <View style = {styles.rowContainer}>
        {this.renderRoundedAvtar()}
        {this.renderUserName()}
      </View>
    )
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
        ListHeaderComponent = {this.renderHeaderComponent}
        ListHeaderComponentStyle = {styles.headerStyle}

      />
    )
  }

  componentDidMount() { }

  render() {
    log('renderrenderrenderrenderrender', this.props.optionsList)
    return <View style={{ width: '100%' }} >{this.renderOptionList()}</View>
  }
}
