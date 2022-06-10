import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { isEmpty } from 'lodash'
import { colors, commonStyles, fontDimensPer, icons, strings } from '../../common'
import { COMPLAINT_STATUS } from '../../common/constant'
import { IComplainData } from '../../common/Interfaces'
import { widthToDp } from '../../common/Responsive'
import { log } from '../../config'
import { capitalizeFirstLetterOnly, formatDate } from '../../utils/app-utils'
import { CustomText } from '../CustomText'
import { IconButtonWrapper } from '../IconButtonWrapper'
import { ButtonComponent } from '../ButtonComponent'

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderColor: colors.white,
    overflow: 'hidden',
    padding: 10
  },
  titleLabel: {
    fontSize: widthToDp(fontDimensPer.twentyFont),
    color: colors.dardBlack,
    fontWeight: '700',
    fontFamily: 'Poppins',
    paddingBottom: 5
  },
  complainStatusContainer: {
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  subHeading: {
    fontSize: widthToDp(fontDimensPer.fourteenFont),
    color: colors.white,
    fontWeight: '600',
    fontFamily: 'Poppins'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dotContainer: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: colors.dardBlack,
    marginHorizontal: 5
  },
  underLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.red,
    color: colors.red,
    marginLeft: 5
  },
  date: {
    color: colors.lightGrey
    // paddingHorizontal: 5
  },
  complainType: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    color: colors.lightGrey
  },
  mediumHeading: {
    fontSize: widthToDp(fontDimensPer.sixteenFont),
    color: colors.dardBlack,
    fontWeight: '500',
    fontFamily: 'Poppins',
    paddingLeft: 10

  },
  rowWithTopPadding: {
    paddingTop: 8
  },
  buttonCommon: {
    width: 'auto',
    paddingVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    minWidth: '40%'
  },
  actionsButton: {
    backgroundColor: colors.blue,
    borderColor: colors.blue
  },
  notifyButton: {
    backgroundColor: colors.darkBlue,
    borderColor: colors.darkBlue
  },
  reopenComplaintButton: {
    backgroundColor: colors.green,
    borderColor: colors.green
  },
  closeComplaintButton: {
    backgroundColor: colors.peach,
    borderColor: colors.peach
  },
//   info
})

interface IProps {
  complaintData: IComplainData
  navigateToComplainDetailScreen?: () => void
  showCardButtons?: boolean
}

const complainCardComponent = (props: IProps) => {
  const { complaintData, navigateToComplainDetailScreen, showCardButtons = true } = props
  const { complaintTitle, updatedAt, priority, statusDisplayData, displayComplaintType, status, complaintId,
    category, subcomplaintCategory, complaintUserData, vendorData  } = complaintData || {}
  const {  backgroundColor, value  } = statusDisplayData || {}


  const renderComplaintTitle = () => {
    return (
      <CustomText textStyle= {styles.titleLabel} numberOfLines = {1} ellipsizeMode = {'tail'}>
        {complaintTitle}
      </CustomText>
    )
  }


  const renderDotContainer = () => {
    return (
      <View style = {styles.dotContainer}/>
    )
  }

  const renderUpdatedDate = () => {
    return (
      <CustomText textStyle={{ ...styles.subHeading, ...styles.date }}>{formatDate(updatedAt, {
        showDay: false,
        showCommaAfterMonth: false,
        showThreeLettersMonth: true
      })}</CustomText>
    )
  }

  const renderComplaintType = () => {
    return (
      <CustomText textStyle={{...styles.subHeading, ...styles.complainType }}>{displayComplaintType}</CustomText>
    )
  }

  const renderComplainPriorityComponent = () => {
    if (status === COMPLAINT_STATUS.UNASSIGNED || status === COMPLAINT_STATUS.ASSIGNED ) {
      return (
        <CustomText textStyle={{...styles.subHeading, ...styles.underLine }}>{capitalizeFirstLetterOnly(priority)}</CustomText>
      )
    }
    return null
  }

  const renderComplainStatus = () => {
    return (
      <View style = {[styles.complainStatusContainer, { backgroundColor }]}>
        <CustomText textStyle={styles.subHeading}>{value}</CustomText>
      </View>
    )
  }

  const renderComplainDetail = () => {
    return (
      <View style = {styles.rowContainer}>
        {renderComplainStatus()}
        {renderComplainPriorityComponent()}
        {renderDotContainer()}
        {renderUpdatedDate()}
        {renderDotContainer()}
        {renderComplaintType()}
      </View>
    )
  }

  const renderIconComponent = (icon) => {
    return (
      <IconButtonWrapper
        iconImage={icon}
        iconHeight = {20}
        iconWidth = {20}
      />
    )
  }

  const renderTextComponent = (text) => {
    return (
      <View>
        <CustomText textStyle={styles.mediumHeading}>{text}</CustomText>
      </View>
    )
  }

  const renderComplaintId = () => {
    const complainDisplayId = `${strings.COMPLAINT_LIST_SCREEN.COMPLAINT_ID} ${complaintId}`
    return (
      <View style = {[styles.rowContainer, styles.rowWithTopPadding]}>
        {renderIconComponent(icons.INFO_SYMBOL)}
        {renderTextComponent(complainDisplayId)}
      </View>
    )
  }

  const renderComplaintCategoryWithSubCategory = () => {
    const displayValue = `${category?.categoryName} / ${subcomplaintCategory?.subcategoryName}`
    return (
      <View style = {[styles.rowContainer, styles.rowWithTopPadding]}>
        {renderIconComponent(icons.INFO_CIRCLE)}
        {renderTextComponent(displayValue)}
      </View>
    )
  }


  const renderComplaintUserData = () => {
    if (isEmpty(complaintUserData)) {
      return null
    }
    const displayValue = `${complaintUserData?.displayLabel} - ${complaintUserData?.displayValue}`
    return (
      <View style = {[styles.rowContainer, styles.rowWithTopPadding]}>
        {renderIconComponent(icons.PERSON)}
        {renderTextComponent(displayValue)}
      </View>
    )
  }

  const renderVendorDetails = () => {
    if (status === COMPLAINT_STATUS.ASSIGNED ) {
      const displayValue = `${vendorData?.displayLabel} - ${vendorData?.displayValue}`
      return (
        <View style = {[styles.rowContainer, styles.rowWithTopPadding]}>
          {renderIconComponent(icons.VENDOR)}
          {renderTextComponent(displayValue)}
        </View>
      )
    }
    return null
  }

  const onPressCard = () => {
    if (navigateToComplainDetailScreen) {
      navigateToComplainDetailScreen()
    }
  }

  const renderActionsButton = () => {
    return (
      <ButtonComponent
        buttonLabel = {'Actions'}
        onPressButton = {() => {}}
        buttonContainerStyles = {{ ...styles.buttonCommon , ...styles.actionsButton }}
        buttonLabelStyles = {{
          color: colors.white
        }}
      />
    )
  }

  const renderNotifyButton = () => {
    return (
      <ButtonComponent
        buttonLabel = {'Notify Admin'}
        onPressButton = {() => {}}
        buttonContainerStyles = {{ ...styles.buttonCommon , ...styles.notifyButton }}
        buttonLabelStyles = {{
          color: colors.white
        }}
      />
    )
  }

  const renderCloseComplaintButton = () => {
    return (
      <ButtonComponent
        buttonLabel = {'Close Complaint'}
        onPressButton = {() => {}}
        buttonContainerStyles = {{ ...styles.buttonCommon, ...styles.closeComplaintButton }}
        buttonLabelStyles = {{
          color: colors.white
        }}
      />
    )
  }

  const renderReopenComplaintButton = () => {
    return (
      <ButtonComponent
        buttonLabel = {'Re-Open Complaint'}
        onPressButton = {() => {}}
        buttonContainerStyles = {{ ...styles.buttonCommon, ...styles.reopenComplaintButton }}
        buttonLabelStyles = {{
          color: colors.black
        }}
      />
    )
  }

  const renderFotterButtons = () => {
    return (
      <View style = {[commonStyles.rowWithEqualSpaced, styles.rowWithTopPadding]}>
        {(status === COMPLAINT_STATUS.UNASSIGNED || status === COMPLAINT_STATUS.ASSIGNED ) ? renderActionsButton() : renderNotifyButton()}
        {(status === COMPLAINT_STATUS.CLOSED) ? renderCloseComplaintButton() : renderReopenComplaintButton()}
      </View>
    )
  }

  return (
    <TouchableOpacity style = {styles.cardContainer} onPress = {onPressCard}>
      {renderComplaintTitle()}
      {renderComplainDetail()}
      {renderComplaintId()}
      {renderComplaintCategoryWithSubCategory()}
      {renderComplaintUserData()}
      {renderVendorDetails()}
      {showCardButtons && renderFotterButtons()}
    </TouchableOpacity>
  )
}


export {
  complainCardComponent as ComplainCardComponent
}
