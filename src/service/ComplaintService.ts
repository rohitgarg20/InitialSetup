import { COMPLAINT_STATUS } from '../common/constant'
import { get } from 'lodash'

export const getComplaintUserDisplayName = (complaintData) => {
  const { status } = complaintData || {}
  switch (status) {
    case COMPLAINT_STATUS.UNASSIGNED:
      return get(complaintData, 'complainer.name', '')
    default:
      return 'No name'
  }

}