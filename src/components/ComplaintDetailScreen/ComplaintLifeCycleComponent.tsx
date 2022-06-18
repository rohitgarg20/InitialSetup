import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { get, isEmpty } from 'lodash'

import { log } from '../../config'
import { FlatListWrapper } from '../FlatListWrapper'
import { IComplaintLifeCycle } from '../../common/Interfaces'
import { CustomText } from '../CustomText'
import { colors, commonStyles, popinsTextStyle } from '../../common'
import { capitalizeWords, formatDate, getFormattedTime } from '../../utils/app-utils'
import { ACTION_TAKEN_ROLES } from '../../common/constant'

interface IProps {
  complaintLifeCycle?: IComplaintLifeCycle[]
}

const styles = StyleSheet.create({
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
    paddingTop: 25,
    // flexGrow: 1
    // flex: 1
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

export const complaintLifeCycleComponent = (props: IProps) => {
  const { complaintLifeCycle } = props
  //   log('complaintLifeCycleComponentcomplaintLifeCycleComponent', complaintLifeCycle)

  const renderUserActionByRole = (actionBy) => {
    return (
      <CustomText textStyle={popinsTextStyle.sixteenSemiBoldBlack}>{capitalizeWords(actionBy)}</CustomText>
    )
  }

  const renderMsgTypeView = (msgType) => {
    return (
      <CustomText textStyle={{ ...popinsTextStyle.fourteenNormalBlack }}>{msgType}</CustomText>
    )
  }

  const renderMsgDateView = (date) => {
    const displayDate = `${formatDate(date, {
      showDay: false,
      showInDDMMYYYYFormat: true,
      showCommaAfterMonth: false,
      showTwoDigitDateAlways: false
    })}, ${getFormattedTime(date)}`
    return <CustomText textStyle={{ ...commonStyles.textRightAlign, ...popinsTextStyle.tenWithDarkGrey, ...styles.topFourPadding }}>{displayDate}</CustomText>
  }

  const renderMsgDescription = (msgDesc) => {
    return (
      msgDesc.length > 0 && <CustomText textStyle={{ ...popinsTextStyle.fourteenNormalBlack }}>{msgDesc}</CustomText>
    )
  }


  const renderUserLifeCycleEvent = ( lifeCycleEvent ) => {
    const { type, time, reasonDesc = '' } = lifeCycleEvent as IComplaintLifeCycle
    log('renderUserLifeCycleEventrenderUserLifeCycleEvent', new Date(time))
    return (
      <View style = {[styles.msgUserContainer]}>
        <CustomText textStyle={{ ...popinsTextStyle.sixteenSemiBoldBlack  }}>You</CustomText>
        {renderMsgTypeView(type)}
        {renderMsgDescription(reasonDesc)}
        {renderMsgDateView(time)}
      </View>
    )
  }

  const renderVendorData = (vendorData) => {
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


  const renderSystemAutomatedMsg = (lifeCycleEvent) => {
    const { type, time, vendorId = {}, reasonDesc = '' } = lifeCycleEvent as IComplaintLifeCycle
    log('renderUserLifeCycleEventrenderUserLifeCycleEvent', new Date(time))
    return (
      <View style = {[styles.msgReceivedContainer]}>
        <CustomText textStyle={{ ...popinsTextStyle.sixteenSemiBoldBlack, ...styles.bottomFourPadding  }}>System Automated</CustomText>
        {renderMsgTypeView(type)}
        {renderVendorData(vendorId)}
        {renderMsgDescription(reasonDesc)}
        {renderMsgDateView(time)}
      </View>
    )
  }

  const renderAdminMsgView = (lifeCycleEvent) => {
    const { type, time, vendorId = {}, reasonDesc = '', admin = {} } = lifeCycleEvent as IComplaintLifeCycle
    const adminName = get(admin, 'name', '')
    log('renderUserLifeCycleEventrenderUserLifeCycleEvent', new Date(time))
    return (
      <View style = {[styles.msgReceivedContainer]}>
        <CustomText textStyle={{ ...popinsTextStyle.sixteenSemiBoldBlack, ...styles.bottomFourPadding  }}>{capitalizeWords(adminName)} - Admin</CustomText>
        {renderMsgTypeView(type)}
        {renderVendorData(vendorId)}
        {renderMsgDescription(reasonDesc)}
        {renderMsgDateView(time)}
      </View>
    )
  }

  const renderMsgSeperator = () => {
    return (<View style = {styles.msgSeperator}/> )
  }

  const renderMsgByActionType = ({ item: lifeCycleEvent  }) => {
    const { USER, SYSTEM_AUTOMATED, ADMIN } = ACTION_TAKEN_ROLES
    const { actionTakerRole } = lifeCycleEvent as IComplaintLifeCycle
    switch (actionTakerRole) {
      case USER:
        return renderUserLifeCycleEvent(lifeCycleEvent)
      case SYSTEM_AUTOMATED:
        return renderSystemAutomatedMsg(lifeCycleEvent)
      case ADMIN:
        return renderAdminMsgView(lifeCycleEvent)
      default:
        return null
    }
  }

  const renderComplaintLifeCycleList = () => {
    log('complaintLifeCyclecomplaintLifeCycle', complaintLifeCycle)
    return (
      <FlatListWrapper
        style = {{
          // flex: 1,
          // backgroundColor: 'red'
        }}
        data={complaintLifeCycle}
        renderItem = {renderMsgByActionType}
        contentContainerStyle = {styles.lifeCycleContainer}
        ItemSeparatorComponent = {renderMsgSeperator}
        keyExtractor = {(item, index) => get(item, '_id', index).toString()}
      />
    )

  }
  return (
    <View style = {{
      // flex: 1
    }}>
      {renderComplaintLifeCycleList()}
    </View>
  )
}

export {
  complaintLifeCycleComponent as ComplaintLifeCycleComponent
}
