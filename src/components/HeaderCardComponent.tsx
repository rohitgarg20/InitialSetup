import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { debounce, get } from 'lodash'
import { colors } from '../common'
import { BASE_URL, HEADER_HEIGHT, MINIMUM_TEXT_TO_SEARCH, navigateToWebView, OPTIONS_DATA_FOR_SELF_POST, USER_KEYS, USER_OPTIONS_LIST, WAITING_TIME } from '../common/constant'
import { icons } from '../common/icons'
import { getWidth } from '../common/scaling'
import { log } from '../config'
import { STACK_NAMES } from '../navigator'
import { goBack, setInititalStackName } from '../service'
import { navigationDataStore, preferencesDataStore, userDataStore } from '../store'
import { handleSignOut } from '../utils/auth-utils'
import { AnimatedSearchBarComponent } from './AnimatedSearchBarComponent'
import { CustomText } from './CustomText'
import { IconButtonWrapper } from './IconButtonWrapper'
import { InfoToolTip } from './InfoToolTip'
import { CommunityOptionsComponent } from './OptionsListComponent'
import { UserAvatar } from './UserAvtar'
import { UserOptionsListComponent } from './UserOptionsListComponent'

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
    alignItems: 'center',
    shadowColor: colors.lightestGrey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 9
  },
  userIcon: {
    // height: 25,
    // width: 25,
    alignContent: 'center',
    justifyContent: 'center',
    // borderRadius: 100,
    marginLeft: 15

  },
  serachField: {
    borderWidth: 1,
    flex: 1,
    maxWidth: 150,
    marginLeft: 12,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderColor: colors.borderColor
  },
  topIconStyle: {
    marginLeft: 15
  },
  topHeaderRightView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  mainViewStyle: {
    borderColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    borderRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 0,
    // paddingVertical: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'absolute',
    right: -1000,
    zIndex: 1,
    left: getWidth() - 160,
    top: 0
  },
  withoutImageColor: {
    backgroundColor: '#cccccc'
  }
})

interface IProps {
  updateFetchingStatus?: (status) => void
  hitSearchApi?: () => void
}
@observer
export class HeaderCardComponent extends Component<IProps> {
  toolTipRef

  preferencesScript = `
  (function() {
		document.getElementById('confirm-btn').onclick = function(e) {
		  e.preventDefault();
		  window.ReactNativeWebView.postMessage(JSON.stringify({"action": "updatePreferences"}));
		  e.stopPropagation()
		}
	  }())
    ;
  `

  setToolTipRef = (ref) => {
    this.toolTipRef = ref
  }

  onClickPostOption = (optionKey) => {
    const { VIEW_PROFILE, SETTINGS, MY_EVENTS, SAVED, SUPPORT, SIGN_OUT, MESSAGES } = USER_KEYS

    switch (optionKey) {
      case VIEW_PROFILE:
        navigateToWebView({
          navigation: undefined,
          pageUrl: `${BASE_URL}/mobile/profile/view`
        })
        break
      case SETTINGS:
        navigateToWebView({
          navigation: undefined,
          pageUrl: `${BASE_URL}/mobile/setting`
        })
        break
      case MY_EVENTS:
      case SAVED:
        navigateToWebView({
          navigation: undefined,
          pageUrl: `${BASE_URL}/mobile/events/saved`
        })
        break
      case SUPPORT:
        navigateToWebView({
          navigation: undefined,
          pageUrl: `${BASE_URL}/mobile/support/tickets`
        })
        break
      case SIGN_OUT:
        handleSignOut()
        navigationDataStore.setActiveTabName(undefined)
        setInititalStackName(STACK_NAMES.LOGIN_STACK)
        break
      case MESSAGES:
        navigateToWebView({
          navigation: undefined,
          pageUrl: `${BASE_URL}/mobile/message/list`
        })
        break
      default:
    }
    if (this.toolTipRef) {
      this.toolTipRef.toggleTooltip()
    }
  }

  renderOptionsListComponent = () => {
    const {  userInfoData } = userDataStore
    const { username = '', picture = '' } = userInfoData || {}
    log('renderOptionsListComponentrenderOptionsListComponent', userInfoData)
    return (
      <UserOptionsListComponent
        optionsList={USER_OPTIONS_LIST}
        username = {username}
        picture = {picture}
        onClickListItem = {this.onClickPostOption}
      />
    )
  }

  renderCustomView = () => {
    const {  userInfoData } = userDataStore
    const { username = '', picture = '' } = userInfoData || {}
    return (
      <View style={styles.userIcon}>
        {username?.length > 0 && <UserAvatar
          size={'20'}
          imageStyle={[styles.withoutImageColor, { width: '80%', height: '80%' }]}
          showBorderRadius={true}
          name={username.toUpperCase()}
          src={`${BASE_URL}${picture}`}
        />}
      </View>
    )
  }

  renderOptionsComponent = () => {
    return (
      <InfoToolTip
        toolTipRef={(ref) => {
          if (ref && !this.toolTipRef) {
            this.setToolTipRef(ref)
          }
        }}
        backgroundColor={colors.white}
        customToolTipView={this.renderOptionsListComponent}
        customView={this.renderCustomView}
        customWidth={160}
        customHeight={250}
        mainViewStyle={{ ...styles.mainViewStyle }}
        useAsDropDownView={true}
        withPointer={false}
        customToolTipViewStyle={{ width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1 }}
      />
    )
  }

  onChangeSearchText = (text) => {
    const { updateFetchingStatus, hitSearchApi } = this.props
    const { searchText } = userDataStore
    const searchTextLength = get(searchText, 'length')
    const textLength = get(text, 'length')
    if (searchTextLength >= MINIMUM_TEXT_TO_SEARCH && textLength < MINIMUM_TEXT_TO_SEARCH) {
      log('inside if is called')
      this.updateSearchTextAndFetchData.cancel()
      userDataStore.updateSearchText(text)
      updateFetchingStatus(true)
      this.updateSearchTextAndFetchData('')
    } else if (textLength >= MINIMUM_TEXT_TO_SEARCH) {
      this.updateSearchTextAndFetchData.cancel()
      userDataStore.updateSearchText(text)
      updateFetchingStatus(true)
      this.updateSearchTextAndFetchData(text)
    } else {
      userDataStore.updateSearchText(text)
    }
  }

  resetSearchData = () => {
    const { updateFetchingStatus, hitSearchApi } = this.props

    userDataStore.updateSearchText('')
    updateFetchingStatus(true)
    hitSearchApi()
  }

  updateSearchTextAndFetchData = debounce(searchText => {
    const { updateFetchingStatus, hitSearchApi } = this.props

    updateFetchingStatus(true)
    hitSearchApi()
  }, WAITING_TIME)

  messageHandler = (data) => {
    log('messageHandlermessageHandlermessageHandlermessageHandler', data)
    const { action = '' } = data || {}
    const { hitSearchApi, updateFetchingStatus } = this.props
    if (action === 'updatePreferences' && hitSearchApi) {
      goBack(undefined)
      updateFetchingStatus(true)
      setTimeout(async () => {
        await preferencesDataStore.getUserPreferencesAndCategoryData()
        hitSearchApi()
      }, 3000)
    }
  }

  render() {
    const { searchText } = userDataStore
    log('this.preferencesScriptthis.preferencesScript', this.preferencesScript)
    return (
      <View style={styles.headerContainer}>
        <View>
          <TouchableOpacity>
            <IconButtonWrapper
              iconImage={icons.LOGO}
              iconHeight={20}
              iconWidth={20}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.topHeaderRightView}>
          {/* <TouchableOpacity style={styles.topIconStyle}>
            <IconButtonWrapper
              iconImage={icons.SEARCH_ICON}
              iconHeight={16}
              iconWidth={16}
            />
          </TouchableOpacity> */}
          <AnimatedSearchBarComponent
            rightDistance = {180}
            onChangeSearchText = {this.onChangeSearchText}
            onCrossButtonClicked = {this.resetSearchData}
            isSearchBarExpanded = {searchText.length > 0}
            searchText = {searchText}
          />
          <TouchableOpacity style={styles.topIconStyle} onPress = {() => {
            navigateToWebView({
              navigation: undefined,
              pageUrl: `${BASE_URL}/mobile/preferences/view`,
              injectedJavaScript: this.preferencesScript,
              messageHandler:  this.messageHandler
            })
          }}>
            <IconButtonWrapper
              iconImage={icons.FILTER_ICON}
              iconHeight={15}
              iconWidth={15}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topIconStyle} onPress = {() => {
            navigateToWebView({
              navigation: undefined,
              pageUrl: `${BASE_URL}/mobile/message/list`
            })
          }}>
            <IconButtonWrapper
              iconImage={icons.MESSAGE_ICON}
              iconHeight={15}
              iconWidth={15}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topIconStyle}>
            <IconButtonWrapper
              iconImage={icons.BELL_ICON}
              iconHeight={15}
              iconWidth={15}
            />
          </TouchableOpacity>
          {this.renderOptionsComponent()}
        </View>
      </View>
    )
  }
}
