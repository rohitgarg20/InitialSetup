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