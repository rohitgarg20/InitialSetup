import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../common'
import { BASE_URL, HEADER_HEIGHT, OPTIONS_DATA_FOR_SELF_POST, USER_OPTIONS_LIST } from '../common/constant'
import { icons } from '../common/icons'
import { getWidth } from '../common/scaling'
import { log } from '../config'
import { userDataStore } from '../store'
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
    alignItems: 'center'
  },
  userIcon: {
    // height: 25,
    // width: 25,
    alignContent: 'center',
    justifyContent: 'center',
    // borderRadius: 100,
    backgroundColor: colors.whiteSmock,
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
    left: getWidth() - 150,
    top: 0
  },
  withoutImageColor: {
    backgroundColor: '#cccccc'
  },
})

@observer
export class HeaderCardComponent extends Component {
  toolTipRef
  setToolTipRef = (ref) => {
    this.toolTipRef = ref
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
      />
    )
  }

  renderCustomView = () => {
    const {  userInfoData } = userDataStore
    const { username = '', picture = '' } = userInfoData || {}
    return (
      <View style={styles.userIcon}>
       <UserAvatar
          size={'20'}
          imageStyle={[styles.withoutImageColor, { width: '80%', height: '80%' }]}
          showBorderRadius={true}
          name={username.toUpperCase()}
          src={`${BASE_URL}${picture}`}
        />
      </View>
    )
  }

  renderOptionsComponent = () => {
    return (
      <InfoToolTip
        toolTipRef={(ref) => {
          if (ref && this.toolTipRef) {
            this.setToolTipRef(ref)
          }
        }}
        backgroundColor={colors.white}
        customToolTipView={this.renderOptionsListComponent}
        customView={this.renderCustomView}
        customWidth={150}
        customHeight={250}
        mainViewStyle={{ ...styles.mainViewStyle }}
        useAsDropDownView={true}
        withPointer={false}
        customToolTipViewStyle={{ width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1 }}
      />
    )
  }

  render() {
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
          <TouchableOpacity style={styles.topIconStyle}>
            <IconButtonWrapper
              iconImage={icons.SEARCH_ICON}
              iconHeight={16}
              iconWidth={16}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topIconStyle}>
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
