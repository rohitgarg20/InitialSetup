const REGEX_NUMBERS_ONLY = /^[0-9]*$/
export const ATLEAST_ONE_NUMBER_REGEX = /^.*[0-9].*/
export const ATLEAST_ONE_UPAR_CASE_REGEX = /^.*[A-Z].*/
export const ATLEAST_ONE_SPECIAL_CHAR_REGEX = /^.*[@#$].*/
export const MIN_LENGTH = /^(.){8,}$/

export function validateRegex(input, regex) {
  if (regex.test(input)) {
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