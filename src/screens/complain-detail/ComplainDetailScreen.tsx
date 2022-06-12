import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { get, isEmpty, map } from 'lodash'
import { colors, commonStyles, fontDimensPer, popinsTextStyle, strings } from '../../common'
import { ButtonComponent, ComplainCardComponent, ComplaintLifeCycleComponent, ContainerDataComponent, FlatListWrapper, HeaderComponent, UserActionPopup } from '../../components'
import { complaintDetailStore, genericDrawerStore } from '../../store'
import { observer } from 'mobx-react'
import { log } from '../../config'
import { CustomText } from '../../components/CustomText'
import { capitalizeWords, formatDate, getFormattedTime } from '../../utils/app-utils'
import { IComplaintLifeCycle } from '../../common/Interfaces'
import { CenterModalPopup } from '../../components/CenterModalPopup'
import { USER_ACTIONS_KEYS, USER_ACTIONS_ON_COMPLAINT } from '../../common/constant'
import { TextInputComponent } from '../../components/TextInputWrapper'
import { widthToDp } from '../../common/Responsive'

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
  }
})

interface IProps {
  route?: any
}

@observer
export class ComplainDetailScreen extends Component<IProps> {

  componentDidMount() {
    const { route } = this.props
    const complaintId = get(route, 'params.complaintId', '')
    complaintDetailStore.getComplaintDetails(complaintId)
  }

  componentWillUnmount() {
    complaintDetailStore.init()
  }

    renderHeaderSection = () => {
      const { HEADING } = strings.COMPLAIN_DETAIL_SCREEN
      return (
        <HeaderComponent
          headerLabel={HEADING}
        />
      )
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
          this.showNotifyAdminPopup()
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
              />
            )
          }}
        />
      ))
    }

    reopenComplaint = () => {
      //
    }

    renderComplainListComponent = () => {
      const { complainDetailData } = complaintDetailStore
      log('complainDetailDatacomplainDetailData', complainDetailData)
      return (
        <View style = {{
          marginTop: -60
        }}>
          <ComplainCardComponent
            complaintData={complainDetailData}
            actionClickEvent = {this.renderUserActionsPopup}
            closeComplaintAlert = {this.renderCloseComplaintAlert}
            onPressUserActionItem = {this.onPressUserActionItem}
            reopenComplaintEvent = {this.reopenComplaint}
          />
          {this.renderComplaintLifeCycleComponent()}
        </View>
      )
    }

    renderMsgSeperator = () => {
      return (<View style = {styles.msgSeperator}/> )
    }


    renderComplaintLifeCycleList = () => {
      const { complainDetailData } = complaintDetailStore
      const { complaintLifeCycle } = complainDetailData
      log('complaint complaintLifeCycle', complaintLifeCycle)
      return (
        <FlatListWrapper
          data={complaintLifeCycle}
          renderItem = {this.renderSystemAutomatedMsg}
          contentContainerStyle = {styles.lifeCycleContainer}
          ItemSeparatorComponent = {this.renderMsgSeperator}
        />
      )

    }

    renderUserActionByRole = (actionBy) => {
      return (
        <CustomText textStyle={popinsTextStyle.sixteenSemiBoldBlack}>{capitalizeWords(actionBy)}</CustomText>
      )
    }

    renderMsgTypeView = (msgType) => {
      return (
        <CustomText textStyle={{ ...popinsTextStyle.fourteenNormalBlack }}>{msgType}</CustomText>
      )
    }

    renderMsgDateView = (date) => {
      const displayDate = `${formatDate(date, {
        showDay: false,
        showInDDMMYYYYFormat: true,
        showCommaAfterMonth: false,
        showTwoDigitDateAlways: false
      })}, ${getFormattedTime(date)}`
      return <CustomText textStyle={{ ...commonStyles.textRightAlign, ...popinsTextStyle.tenWithDarkGrey, ...styles.topFourPadding }}>{displayDate}</CustomText>
    }


    renderUserLifeCycleEvent = ( { item: lifeCycleEvent }) => {
      const { type, time, reasonDesc = '' } = lifeCycleEvent as IComplaintLifeCycle
      log('renderUserLifeCycleEventrenderUserLifeCycleEvent', new Date(time))
      return (
        <View style = {[styles.msgUserContainer]}>
          <CustomText textStyle={{ ...popinsTextStyle.sixteenSemiBoldBlack  }}>You</CustomText>
          {this.renderMsgTypeView(type)}
          {this.renderMsgDescription(reasonDesc)}
          {this.renderMsgDateView(time)}
        </View>
      )
    }

    renderVendorData = (vendorData) => {
      const { name = '', phone = '' } = vendorData || {}
      if (isEmpty(vendorData)) {
        return null
      }
      return (
        <View style = {commonStyles.rowContainer}>
          <CustomText textStyle={{ ...popinsTextStyle.fourteenNormalBlack }}>{capitalizeWords(name)}</CustomText>
          {phone.length > 0 && <CustomText textStyle={{ ...popinsTextStyle.fourteenNormalBlack }} > - {phone}</CustomText>}
        </View>
      )
    }

    renderMsgDescription = (msgDesc) => {
      return (
        msgDesc.length > 0 && <CustomText textStyle={{ ...popinsTextStyle.fourteenNormalBlack }}>{msgDesc}</CustomText>
      )
    }

    renderSystemAutomatedMsg = ({ item: lifeCycleEvent }) => {
      const { type, time, vendorId = {}, reasonDesc = '' } = lifeCycleEvent as IComplaintLifeCycle
      log('renderUserLifeCycleEventrenderUserLifeCycleEvent', new Date(time))
      return (
        <View style = {[styles.msgReceivedContainer]}>
          <CustomText textStyle={{ ...popinsTextStyle.sixteenSemiBoldBlack, ...styles.bottomFourPadding  }}>System Automated</CustomText>
          {this.renderMsgTypeView(type)}
          {this.renderVendorData(vendorId)}
          {this.renderMsgDescription(reasonDesc)}
          {this.renderMsgDateView(time)}
        </View>
      )
    }

    renderAdminMsgView = ({ item: lifeCycleEvent }) => {
      const { type, time, vendorId = {}, reasonDesc = '', admin = {} } = lifeCycleEvent as IComplaintLifeCycle
      const adminName = get(admin, 'name', '')
      log('renderUserLifeCycleEventrenderUserLifeCycleEvent', new Date(time))
      return (
        <View style = {[styles.msgReceivedContainer]}>
          <CustomText textStyle={{ ...popinsTextStyle.sixteenSemiBoldBlack, ...styles.bottomFourPadding  }}>{capitalizeWords(adminName)} - Admin</CustomText>
          {this.renderMsgTypeView(type)}
          {this.renderVendorData(vendorId)}
          {this.renderMsgDescription(reasonDesc)}
          {this.renderMsgDateView(time)}
        </View>
      )
    }


    renderComplaintLifeCycleComponent = () => {
      const { complainDetailData } = complaintDetailStore
      const { complaintLifeCycle } = complainDetailData
      return (
        <ComplaintLifeCycleComponent
          complaintLifeCycle = {complaintLifeCycle}
        />
      )
    }

    render() {
      return (
        <View style = {styles.container}>
          {this.renderHeaderSection()}
          <ContainerDataComponent
            renderContainerComponent = {this.renderComplainListComponent}
          />
        </View>
      )
    }
}
