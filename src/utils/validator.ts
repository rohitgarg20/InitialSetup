
export const REGEX_VALID_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const REGEX_VALID_OTP = /^[0-9]{6}$/

export const validateRegex = (input, regex) => {
  if (regex.test(input)) {
    return true
  }
  return false
}

export const emailIdValidator = (emailId) => {
  emailId = emailId && emailId.trim()
  if (emailId && emailId.length === 0) {
    return false
  }
  if (validateRegex(emailId, REGEX_VALID_EMAIL)) {
    return true
  }
  return false

}

export const validateOtp = (otpVal: any) => {
  let isOTPValid = validateRegex(otpVal, REGEX_VALID_OTP)
  return isOTPValid ? true : false
}
