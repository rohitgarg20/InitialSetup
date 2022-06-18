import { ACTION_TAKEN_ROLES, COMPLAINT_STATUS, COMPLAINT_TYPE_LIST, GET_DATA_BY_COMPLAINT_STATUS } from '../common/constant'
import { get } from 'lodash'
import { IComplainData, IComplaintLifeCycle } from '../common/Interfaces'
import { log } from '../config'

export const getComplaintUserDisplayName = (lifeCycleEvent, status = '') => {
  const { USER, SYSTEM_AUTOMATED, ADMIN } = ACTION_TAKEN_ROLES
  const lastEventData = get(lifeCycleEvent, `[${lifeCycleEvent.length - 1}]`, {})
  const { actionTakerRole } = lastEventData as IComplaintLifeCycle || {}
  log('lastEventDatalastEventData', lastEventData)
  switch (actionTakerRole) {
    case USER:
      const { complainer = {} } = lastEventData
      return get(complainer, 'name', '')
    case SYSTEM_AUTOMATED:
    case ADMIN:
      const { vendorId = {}, admin = {} } = lastEventData

      if (status === COMPLAINT_STATUS.ASSIGNED) {
        return get(admin, 'name', 'System')
      }
      log('SYSTEM_AUTOMATEDSYSTEM_AUTOMATED', get(vendorId, 'name', 'No name'))
      return get(vendorId, 'name', 'No name')
    default:
      return 'No name'
  }

}

export const getComplaintFormattedData = (complaintData) => {
  const { status, complaintType = '', complaintNumber = 1, _id, complaintLifeCycle = [] } = complaintData || {}

  const complainTypeData = COMPLAINT_TYPE_LIST.find((type) => type.id === complaintType)
  log('complaintLabelcomplaintLabel' , complainTypeData)

  const { complaintLabel, displayStatus, backgroundColor } = GET_DATA_BY_COMPLAINT_STATUS.get(status) || {}
  log('complaintLabelcomplaintLabel' , complainTypeData)

  const formattedData: IComplainData =  {
    ...complaintData,
    statusDisplayData: {
      value: displayStatus,
      backgroundColor
    },
    complaintUserData: {
      displayLabel: complaintLabel,
      displayValue: getComplaintUserDisplayName(complaintLifeCycle, status)
    },
    vendorData: {
      displayLabel: 'Vendor',
      displayValue: getComplaintUserDisplayName(complaintLifeCycle)
    },
    complaintId: _id,
    displayComplaintType: get(complainTypeData, 'displayLabel', ''),
    complaintNumber
  }
  return formattedData
}