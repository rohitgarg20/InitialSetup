import React, { Component } from 'react'
import { ActivityIndicator, BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native'
import { get, isEmpty, map } from 'lodash'
import { colors, commonStyles, fontDimensPer, popinsTextStyle, strings } from '../../common'
import { ButtonComponent, ComplainCardComponent, ComplaintLifeCycleComponent, ContainerDataComponent, FlatListWrapper, HeaderComponent, UserActionPopup } from '../../components'
import { complaintDetailStore, genericDrawerStore, raiseComplaintDataStore } from '../../store'
import { observer } from 'mobx-react'
import { log } from '../../config'
import { CustomText } from '../../components/CustomText'
import { capitalizeWords, formatDate, getFormattedTime, showAndroidToastMessage } from '../../utils/app-utils'
import { IComplaintLifeCycle } from '../../common/Interfaces'
import { CenterModalPopup } from '../../components/CenterModalPopup'
import { COMPLAINT_STATUS, USER_ACTIONS_KEYS, USER_ACTIONS_ON_COMPLAINT } from '../../common/constant'
import { TextInputComponent } from '../../components/TextInputWrapper'
import { widthToDp } from '../../common/Responsive'
import { goBack } from '../../service'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryButton
  },
  itemSeperator: {
    paddingBottom: 30
  },
  titleLabel: {
    // fontSize: widthToDp(fontDimensPer.twentyFont),
    color: colors.dardBlack,
    fontWeight: '700',
    fontFamily: 'Poppins',
    paddingBottom: 5
  },
  buttonContainer: {
    backgroundColor: colors.white,
    height: 70,
    paddingHorizontal: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerButtonContainer: {
    borderRadius: 10,
    paddingVertical: 5
  },
  msgUserContainer: {
    borderTopLeftRadius: 15,
    borderTopEndRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: colors.primaryButton,
    paddingLeft: 15,
    paddingRight: 2,
    paddingVertical: 2,
    borderWidth: 0,
    width: '60%',
    alignSelf: 'flex-end'
  },
  lifeCycleContainer: {
    paddingTop: 25
  },
  msgSeperator: {
    paddingBottom: 25
  },
  bottomFourPadding: {
    paddingBottom: 4
  },
  topFourPadding: {
    paddingTop: 4
  },
  msgReceivedContainer: {
    borderTopLeftRadius: 15,
    borderTopEndRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: colors.white,
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 2,
    borderWidth: 0,
    width: '70%',
    alignSelf: 'flex-start'
  },
  actionsPopupBorderContainer: {
    borderRadius: 20,
    borderColor: colors.white,
    backgroundColor: colors.white,
    paddingHorizontal: 2,
    paddingVertical: 10,
    zIndex: 99999
    // width: '60%',

  },
  actionItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  firstItemStyle: {
    borderBottomWidth: 1,
    borderColor: colors.black,
    paddingBottom: 5,
    marginBottom: 5
  },
  notifyAdminPopup: {
    borderRadius: 20,
    borderColor: colors.white,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    zIndex: 99999,
    width: '80%',
    alignItems: 'center'

  },
  roundedBorderContainer: {
    borderRadius: 20,
    paddingBottom: 20,
    backgroundColor: colors.grey,
    marginVertical: 10,
    height: 100,
    alignItems: 'flex-start',
    padding: 0
  },
  textInput: {
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    color: colors.black,
    fontFamily: 'poppins',
    height: '100%',
    textAlignVertical: 'top'
  },
  cancelButton: {
    width: 'auto',
    backgroundColor: colors.darkGrey,
    borderColor: colors.darkGrey
  },
  actionButton: {
    width: 'auto',
    backgroundColor: colors.darkBlue,
    borderColor: colors.darkBlue,
    paddingVertical: 0
  },
  paddingVertical: {
    paddingVertical: 10
  },
  textUnderline: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.darkBlue,
    color: colors.darkBlue
  },
  loaderContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    bottom: 0,
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }
})

interface IProps {
  route?: any
  navigation?: any
}

@observer
export class ComplainDetailScreen extends Component<IProps> {
  didFocusListener
  willBlurListener
  constructor(props, state) {
    super(props, state)
    complaintDetailStore.updateFetchingStatus(true)
  }

  componentDidMount() {
    const { route, navigation } = this.props
    const complaintId = get(route, 'params.complaintId', '')
    complaintDetailStore.getComplaintDetails(complaintId)
    this.didFocusListener = navigation.addListener('focus', this.addBackHandlerListener)
    this.willBlurListener = navigation.addListener('blur', this.removeBackHandlerListener)
  }

  addBackHandlerListener = () => {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressed)
  }

  removeBackHandlerListener = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed)
  }

  onBackPressed = () => {
    const { isDrawerEnabled } = genericDrawerStore
    const { navigation } = this.props
    if (isDrawerEnabled) {
      genericDrawerStore.disableDrawer()
    } else {
      goBack(navigation)
    }
    return true
  }

  componentWillUnmount() {
    complaintDetailStore.init()
    this.didFocusListener()
    // tslint:disable-next-line:no-unused-expression
    this.willBlurListener()
  }

    renderHeaderSection = () => {
      const { HEADING } = strings.COMPLAIN_DETAIL_SCREEN
      return (
        <HeaderComponent
          headerLabel={HEADING}
        />
      )
    }

    onClickMarkAsResolved = (statusToUpdate) => {
      const {  userMsg } = complaintDetailStore
      if (userMsg.length < 10) {
        return showAndroidToastMessage('Please enter minimum 10 characters of description')
      }
      return complaintDetailStore.actionOnComplaintStatusUpdate(statusToUpdate)
    }

    showMarkAsResolvedPopup = () => {
      // genericDrawerStore.disableDrawer()
      genericDrawerStore.enableDrawer()
      genericDrawerStore.updateCloseDrawerOnOutsideTap(true)
      genericDrawerStore.setRenderingComponent(() => (
        <CenterModalPopup
          innerContent={() => {
            return (
              <UserActionPopup
                popupType= {'markAsResolved'}
                onClickButton = {this.onClickMarkAsResolved}
              />
            )
          }}
        />
      ))
    }

    showNotifyAdminPopup = () => {
      // genericDrawerStore.disableDrawer()
      genericDrawerStore.enableDrawer()
      genericDrawerStore.updateCloseDrawerOnOutsideTap(true)
      genericDrawerStore.setRenderingComponent(() => (
        <CenterModalPopup
          innerContent={() => {
            return (
              <UserActionPopup
                popupType= {'notifyAdmin'}
                onClickButton = {complaintDetailStore.actionOnComplaintStatusUpdate}
              />
            )
          }}
        />
      ))
    }

    onPressUserActionItem = (key) => {
      log('onPressUserActionItemonPressUserActionItem', key)
      complaintDetailStore.clearUserMsg()
      switch (key) {
        case USER_ACTIONS_KEYS.NOTIFY_ADMIN:
          // this.showNotifyAdminPopup()
          showAndroidToastMessage('This section is under development')
          break
        case USER_ACTIONS_KEYS.MARKASRESOLVED:
          this.showMarkAsResolvedPopup()
          break
        default:
      }
    }

    userActionsList = () => {
      return (
        <View style = {styles.actionsPopupBorderContainer}>
          {
            map(USER_ACTIONS_ON_COMPLAINT, (userAction, index) => {
              let firstItemStyle = {}
              if (index === 0) {
                firstItemStyle = styles.firstItemStyle
              }
              const { key, label } = userAction || {}
              return (
                <TouchableOpacity onPress={() => this.onPressUserActionItem(key)} style= {[styles.actionItem, firstItemStyle]}>
                  <CustomText textStyle={popinsTextStyle.sixteenSemiBoldBlack}>{label}</CustomText>
                </TouchableOpacity>
              )
            })
          }
        </View>
      )
    }

    renderUserActionsPopup = () => {
      genericDrawerStore.enableDrawer()
      genericDrawerStore.updateCloseDrawerOnOutsideTap(true)
      genericDrawerStore.setRenderingComponent(() => (
        <CenterModalPopup
          innerContent={() => {
            return (
              this.userActionsList()
            )
          }}
        />
      ))
    }

    renderCloseComplaintAlert = () => {
      genericDrawerStore.enableDrawer()
      genericDrawerStore.updateCloseDrawerOnOutsideTap(true)
      genericDrawerStore.setRenderingComponent(() => (
        <CenterModalPopup
          innerContent={() => {
            return (
              <UserActionPopup
                popupType= {'closeComplaint'}
                onClickButton = {complaintDetailStore.actionOnComplaintStatusUpdate}
              />
            )
          }}
        />
      ))
    }

    reopenComplaint = () => {
      complaintDetailStore.actionOnComplaintStatusUpdate(COMPLAINT_STATUS.REOPENED)
    }

     navigateToViewComplaintFullDetailScreen = (complaintData) => {
      log('navigateToViewComplaintFullDetailScreen', complaintData)
      raiseComplaintDataStore.setInitialComplaintData(complaintData)
    }

    renderComplainListComponent = () => {
      const { complainDetailData } = complaintDetailStore
      log('complainDetailDatacomplainDetailData', complainDetailData)
      return (
        <View style = {{
          marginTop: -60,
          flex: 1
        }}>
          <ComplainCardComponent
            complaintData={complainDetailData}
            actionClickEvent = {this.renderUserActionsPopup}
            closeComplaintAlert = {this.renderCloseComplaintAlert}
            onPressUserActionItem = {this.onPressUserActionItem}
            reopenComplaintEvent = {this.reopenComplaint}
            navigateToViewComplaintScreen = {this.navigateToViewComplaintFullDetailScreen}
          />
          {this.renderComplaintLifeCycleComponent()}
        </View>
      )
    }


    renderComplaintLifeCycleComponent = () => {
      const { complainDetailData } = complaintDetailStore
      const { complaintLifeCycle } = complainDetailData
      return (
        <View style = {{
          flex: 1
        }}>
          <ComplaintLifeCycleComponent
            complaintLifeCycle = {complaintLifeCycle}
          />
        </View>
      )
    }

    renderLoaderView = () => {
      const { isFetchingData } = complaintDetailStore
      if (isFetchingData) {
        return(
          <View style = {styles.loaderContainer}>
            <ActivityIndicator size={'large'} color = {colors.darkBlue}/>
          </View>
        )
      }
    }

    render() {
      return (
        <View style = {styles.container}>
          {this.renderHeaderSection()}
          {this.renderLoaderView()}
          <ContainerDataComponent
            renderContainerComponent = {this.renderComplainListComponent}
          />
        </View>
      )
    }
}
