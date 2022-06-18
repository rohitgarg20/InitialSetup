import { get, isEmpty, isNumber } from 'lodash'
import { Image, InteractionManager, Platform, ToastAndroid } from 'react-native'
import { DAYS_NAME, MONTH_NAMES } from '../common/constant'
import { log } from '../config'
import { navigateSimple } from '../service'

export const computeFontStyle = (textStyle) => {
  const fontSizeFromProps = get(textStyle, 'fontSize', 14)
  textStyle = {
    ...textStyle,
    lineHeight: 1.4 * fontSizeFromProps,
    minHeight:  1.4 * fontSizeFromProps
  }
  // let fontFamilyToShow = ''
  // const fontWeight = get(textStyle, 'fontWeight', 400)
  // const fontWeightNumber = +fontWeight ? +fontWeight : fontWeight
  // if (isEmpty(fontFamilyFromProps)) {
  //   if (fontWeightNumber >= 700 || fontWeight === 'bold') {
  //     fontFamilyToShow = 'Roboto-Bold'
  //   } else if (fontWeightNumber >= 500) {
  //     fontFamilyToShow = 'Roboto-Medium'
  //   } else if (fontWeightNumber < 400 && fontWeightNumber >= 300) {
  //     fontFamilyToShow = 'Roboto-Thin'
  //   } else {
  //     fontFamilyToShow = 'Roboto-Regular'
  //   }
  // } else {
  //   fontFamilyToShow = fontFamilyFromProps
  // }
  // return [
  //   textStyle,
  //   {
  //     fontFamily: fontFamilyToShow,
  //     fontWeight: '' + fontWeightNumber
  //   }
  // ]
  // log('computeFontStylecomputeFontStyle', textStyle)
  return {
    ...textStyle
  }
}

export const getImageSource = (imagePath) => (isNumber(imagePath) ? imagePath : { uri: imagePath })

export const isImageCached = async (url) => {
  return Image.prefetch(url).then((data) => {
    if (data) {
      return true
    } else {
      return false
    }
  }).catch((err) => {
    return false
  })
}

// Toast Message for both android and ios
export const showAndroidToastMessage = (msg, duration = ToastAndroid.SHORT) => {
  log('showAndroidToastMessage showAndroidToastMessage message called', msg)
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, duration)
  } else {
    // showSnackbar(msg)
  }
}

export const toDateTime = (secs) => {
  const t = new Date(1970, 0, 1)
  t.setSeconds(secs / 1000)
  return t
}

export function getDay(dateinP) {
  const date = new Date(dateinP)
  const day = date.getDay()
  return DAYS_NAME[day]
}

interface IDateAdditionalInfo {
  MONTH_NAME?: any[]
  monthToUpperCase?: boolean
  getDaywithSufix?: boolean
  showCommaAfterMonth?: boolean
  yearInYYFormat?: boolean
  showTwoDigitDateAlways?: boolean
  showThreeLettersMonth?: boolean
  showDay?: boolean
  showInDDMMYYYYFormat?: boolean
}

export const formatDate = (dateInp, additionalInfo?: IDateAdditionalInfo) => {
  const {
    MONTH_NAME = MONTH_NAMES, monthToUpperCase = false,
    showCommaAfterMonth = false, yearInYYFormat = false, showTwoDigitDateAlways = true,
    showThreeLettersMonth = true, showDay = true, showInDDMMYYYYFormat = false
  } = additionalInfo || {}
  try {
    const date = new Date(dateInp)
    let dateD: any = Number(date.getDate())
    dateD = showTwoDigitDateAlways ? dateD <= 9 ? `0${dateD}` : dateD : dateD
    let dateM = MONTH_NAME[date.getMonth()]
    if (showThreeLettersMonth) {
      dateM = dateM.substr(0, 3)
    }
    dateM = monthToUpperCase ? dateM.toUpperCase() : dateM
    let dateY
    dateY = date.getFullYear()
    if (yearInYYFormat) {
      dateY = dateY.toString().substr(-2)
    }
    if (showDay) {
      return `${getDay(dateInp)}, ${dateM}${showCommaAfterMonth ? ',' : ''} ${dateD}, ${dateY}`
    } else if (showInDDMMYYYYFormat) {
      return `${dateD} ${dateM}${showCommaAfterMonth ? ',' : ''} ${dateY}`
    } else {
      return `${dateM}${showCommaAfterMonth ? ',' : ''} ${dateD}, ${dateY}`

    }
  } catch (err) {
    return null
  }
}

export const getFormattedTime = (datein, appendZeroInHours = true) => {
  const date = new Date(datein)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const finalminutes = minutes < 10 ? '0' + minutes : minutes
  let hoursFinal = hours
  let timeAmOrPm = 'AM'
  if (hoursFinal >= 12) {
    hoursFinal = hoursFinal - 12
    timeAmOrPm = 'PM'
  }
  if (hoursFinal === 0) {
    hoursFinal = 12
  }
  let hoursFinals
  if (appendZeroInHours) {
    hoursFinals = hoursFinal < 10 ? '0' + hoursFinal : hoursFinal
  } else {
    hoursFinals = hoursFinal
  }
  return `${hoursFinals}:${finalminutes} ${timeAmOrPm}`
}

export const isValidJSONString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const jsonParseData = (data) => isValidJSONString(data) ? JSON.parse(data) : null

export const stringifyData = (data) => JSON.stringify(data)

export const capitalizeFirstLetterOnly = (value) => value ? value.charAt(0).toUpperCase() + value.substr(1) : ''

export const runAfterInteractions = (
  func1 = () => {
    /* */
  },
  fucn2 = () => {
    /* */
  }
) => {
  InteractionManager.runAfterInteractions(() => {
    log('UTILS runAfterInteractions inside InteractionManager new')
    func1()
  }).then(() => {
    log('UTILS runAfterInteractions InteractionManager new then')
    fucn2()
  })
}

export const capitalizeWords = (value) => {
  if (value) {
    return value.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }
  return ''
}

export const getKeyByValue = (map, searchValue) => {
  for (let [key, value] of map.entries()) {
    if (value === searchValue)
      return key
  }
}

export const navigateToWebView = ({ navigation = undefined, pageUrl }) => {
  navigateSimple(navigation, 'WebViewPage', {
    pageUrl
  })
}

export const callPromisesParallel = async (promisesArray) => {
  const rejectionHandler = (promiseRes) => {
    return promiseRes
      .then((res) => {
        return res
      })
      .catch((err) => {
        return { error: err }
      })
  }

  return await Promise.all(promisesArray.map(rejectionHandler))
}