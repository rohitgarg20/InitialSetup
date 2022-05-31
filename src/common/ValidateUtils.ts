import { log } from '../config'
import { INCORRECT_EMAIL_ID, NAME_MIN_LENGTH_INVALID, PASSWORD_EMPTY, PASSWORD_MISMATCHES } from './ErrorMessages'


const REGEX_VALID_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const MIN_SOCIETY_ID_LENGTH = 4
const USER_NAME_MIN_LENGTH = 2
const REGEX_NUMBERS_ONLY = /^[0-9]*$/
const REGEX_VALID_OTP = /^[0-9]{6}$/


export function validateRegex(input, regex) {
  if (regex.test(input)) {
    return true
  }
  return false
}

export function emailIdValidator(emailId) {
  emailId = emailId && emailId.trim()
  if (emailId &&  emailId.length === 0) {
    return false
  }
  if (validateRegex(emailId, REGEX_VALID_EMAIL)) {
    return true
  }
  return false

}

export function validateSocietyId(societyId) {
  societyId = societyId && societyId.trim()
  if (societyId &&  societyId.length === 0) {
    return false
  }
  if (societyId.length > MIN_SOCIETY_ID_LENGTH) {
    return true
  }
  return false

}

export const isUserNameValid = (userName) => {
  userName = userName.trim()
  if (userName.length < USER_NAME_MIN_LENGTH) {
    return false
  }
  return true
}

export const isCreatePasswordValid = (password, confirmPassword) => {
  if (password.length === 0 || password !== confirmPassword){
    return false
  }
  return true
}

export const getInValidUserNameErrorMsg = (userName) => {
  return isUserNameValid(userName) ? '' : NAME_MIN_LENGTH_INVALID
}

export const getCreatePasswordErrorMsg = (password, confirmPass) => {
  if (password.length === 0) {
    return PASSWORD_EMPTY
  }
  return isCreatePasswordValid(password, confirmPass) ? '' : PASSWORD_MISMATCHES
}

export function isNumbers(userName) {
  if (userName && userName.length > 0) {
    if (validateRegex(userName, REGEX_NUMBERS_ONLY)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }

}

export const isOTPValid = (otpVal: any) => {
  let isValidOpt = validateRegex(otpVal, REGEX_VALID_OTP)
  log('validateOtpvalidateOtp', isValidOpt, otpVal )
  return isValidOpt ? true : false
}

export const getInValidEmailErrorMsg = (email) => {
  return emailIdValidator(email) ? '' : INCORRECT_EMAIL_ID
}

export const getPasswordEmptyErrorMsg = (password) => {
  if (password.length === 0) {
    return PASSWORD_EMPTY
  }
  return ''
}