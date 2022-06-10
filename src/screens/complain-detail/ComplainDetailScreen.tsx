import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { get, isEmpty } from 'lodash'
import { colors, commonStyles, popinsTextStyle, strings } from '../../common'
import { ComplainCardComponent, ComplaintLifeCycleComponent, ContainerDataComponent, FlatListWrapper, HeaderComponent } from '../../components'
import { complaintDetailStore } from '../../store'
import { observer } from 'mobx-react'
import { log } from '../../config'
import { CustomText } from '../../components/CustomText'
import { capitalizeWords, formatDate, getFormattedTime } from '../../utils/app-utils'
import { IComplaintLifeCycle } from '../../common/Interfaces'

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

    renderComplainListComponent = () => {
      const { complainDetailData } = complaintDetailStore
      log('complainDetailDatacomplainDetailData', complainDetailData)
      return (
        <View style = {{
          marginTop: -60
        }}>
          <ComplainCardComponent
            complaintData={complainDetailData}
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
      log('complaintLifeCyclecomplaintLifeCycle', complaintLifeCycle)
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
