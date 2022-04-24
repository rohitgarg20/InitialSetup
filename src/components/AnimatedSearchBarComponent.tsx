
import React, { Component } from 'react'
import { Animated, Easing, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { colors } from '../common'
import { icons } from '../common/icons'
import { getWidth } from '../common/scaling'
import { runAfterInteractions } from '../utils/app-utils'
import { IconButtonWrapper } from './IconButtonWrapper'
import { TextInputComponent } from './TextInputComponent'

const TEXT_INPUT_HEIGHT = 35
const SEARCH_ICON_HEIGHT = 16

const styles = StyleSheet.create({

  searchIconContainer: {
    // tintColor: colors.borderColor
  },
  animatdViewStlyle: {
    position: 'absolute',
    right: 0
  },
  searchFieldContainerTablet: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.borderColor,
    elevation: 0,
    backgroundColor: colors.white,
    height: 40,
    marginLeft: 10
  },
  searchFieldContainerMobile: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 0,
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  searchField: {
    fontSize: 14,
    paddingHorizontal: 0,
    color: colors.borderColor,
    paddingRight:  5,
    paddingLeft: 5,
    height: '100%',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 0
  },
  btnCloseView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%'
  },
  animatedLoader: {
    // marginTop: isTablet() ? 10 : 8
  },
  btnClose: {
    justifyContent: 'center',
    height:  14,
    width:  14,
    tintColor: colors.black
    // top: isTablet() ? dimens.size1 : dimens.size2
  }
})

interface IProps {
  searchText?: string
  isSearchDataLoading?: boolean
  onChangeSearchText?: (text) => void
  onCrossButtonClicked?: () => void
  rightDistance?: number
  showSearchIcon?: boolean
  hideSearchBar?: boolean
  customAnimatedViewStyle?: any
  searchIconWrapper?: any
  customHeightWidth?: any
  searchBarPlaceHolder?: string
  onActivateSearchBar?: (updatedIsSearchBarActive: boolean) => void
  isFetching?: boolean
  isSearchBarExpanded?: boolean
}

const ANIMATION_DURATION = 300

// const { SEARCH_BAR, SEARCH_ICON, CROSS_ICON, FILTER_VIEW } = UNIT_TEST_ID.HOME_SCREEN_CARDS.HOME_SEARCH_COMPONENT
export class AnimatedSearchBarComponent extends Component<IProps> {

  static defaultProps = {
    rightDistance: 100,
    showSearchIcon: true,
    hideSearchBar: false,
    searchBarPlaceHolder: 'Search by test name',
    isSearchBarExpanded: false
  }

  searchBarShowValue = new Animated.Value(this.props.isSearchBarExpanded ? 1 : 0)
  searchBarOpacity
  searchIconOpacity
  searchBarLeftValue
  crossIconRotate

  constructor(props: IProps) {
    super(props)
    this.searchIconOpacity = this.searchBarShowValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    this.searchBarLeftValue = this.searchBarShowValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0,  -(getWidth() - props.rightDistance)],
      extrapolate: 'clamp'
    })

    this.searchBarOpacity = this.searchBarShowValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })


    this.crossIconRotate = this.searchBarShowValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

  }

  showAnimation = (toValue, duration = ANIMATION_DURATION) => {
    Animated.timing(this.searchBarShowValue, {
      toValue,
      duration,
      easing: Easing.linear,
      useNativeDriver: false
    }).start()
  }

  onSearchIconClicked = () => {
    const { onActivateSearchBar = null } = this.props
    this.showAnimation(1)
    if (onActivateSearchBar) {
      runAfterInteractions(() => {
        onActivateSearchBar(true)
      })
    }
  }

  onCrossButtonClicked = () => {
    const { searchText, onCrossButtonClicked, hideSearchBar, onActivateSearchBar = null } = this.props

    if (searchText) {
      if (hideSearchBar) {
        this.showAnimation(0, 0)
      }
      onCrossButtonClicked()
    } else {
      this.showAnimation(0)
    }

    if (onActivateSearchBar) {
      runAfterInteractions(() => {
        onActivateSearchBar(false)
      })
    }
  }

  searchBarCrossIcon = () => {
    const { isSearchDataLoading } = this.props
    return isSearchDataLoading ?
      <View style={styles.animatedLoader}>
        <ActivityIndicator
          size={'small'} />
      </View> :
      <TouchableOpacity onPress={this.onCrossButtonClicked}>
      <Animated.Image
        source={icons.CROSS}
        style={[styles.btnClose, {
          transform: [{ rotate: this.crossIconRotate }]
        }]}
        resizeMode={'contain'} />
        </TouchableOpacity>
  }

  renderSearchBar = () => {
    const { searchText, customAnimatedViewStyle, onChangeSearchText, searchBarPlaceHolder } = this.props

    return <Animated.ScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={{
        justifyContent: 'center',
        flex: 1,
        overflow: 'hidden'
      }}
      style={[
        styles.animatdViewStlyle,
        customAnimatedViewStyle,
        {
          opacity: this.searchBarOpacity,
          left: this.searchBarLeftValue,
          zIndex: this.searchBarOpacity,
          height: TEXT_INPUT_HEIGHT,
          bottom: ((SEARCH_ICON_HEIGHT - TEXT_INPUT_HEIGHT) / 2),
        }
      ]
      }
    >
      <TextInputComponent
        // testID={SEARCH_BAR}
        onChangeText={onChangeSearchText}
        inputValue={searchText}
        shouldShowIconOrTextInRightSideInputBox={true}
        placeholder={searchBarPlaceHolder}
        customRightSideView={this.searchBarCrossIcon}
        inputContainerStyle = {{
          borderWidth: 0.5,
          borderColor: colors.borderColor,
          borderRadius: 20,
          backkgroundColor: colors.white,
          overflow: 'hidden',
          height: '100%',
          paddingVertical: 0
        }}
        textInputStyle = {{
          height: '100%',
          flex: 1
        }}
        useAnimated = {false}
        // handleOnClickEvent={this.onCrossButtonClicked}
        // styles={styles.searchField}
        // rightContainerStyle={styles.btnCloseView}
        // borderType={BORDER_TYPE.noBorder}
        // mainContainerStyle={{
        //   justifyContent: 'center'
        // }}
        // customInputFieldContainerStyle={isTablet() ? styles.searchFieldContainerTablet : styles.searchFieldContainerMobile}
        // innerContainerStyle={{ height: '100%' }}
      />
    </Animated.ScrollView>
  }

  renderSearchIconAndBar = () => {
    const { searchIconWrapper = {}, customHeightWidth = {} } = this.props

    return (
      <View style={searchIconWrapper}>
        <TouchableOpacity onPress={this.onSearchIconClicked} style={{ zIndex: 1 }}>
          <IconButtonWrapper
            styling={[styles.searchIconContainer, customHeightWidth, { opacity: this.searchIconOpacity }]}
            iconImage={icons.SEARCH_ICON}
            iconHeight={SEARCH_ICON_HEIGHT}
            iconWidth={16}
          />
        </TouchableOpacity>
        {this.renderSearchBar()}
      </View>
    )
  }

  renderHeaderRightComponent = () => {
    return (
      <View >
        {this.renderSearchIconAndBar()}
      </View>)
  }

  render = () => {
    const { isFetching } = this.props
    return <>
      {!isFetching && this.renderHeaderRightComponent()}
    </>
  }

}