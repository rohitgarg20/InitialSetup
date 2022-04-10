import { PixelRatio, Dimensions } from 'react-native'

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')


const widthToDp = widthNumber => {
  let width = typeof widthNumber === 'number' ? widthNumber : parseFloat(widthNumber)
  const value =  Math.round(PixelRatio.roundToNearestPixel(width * SCREEN_WIDTH) / 100)
  return value
}

const heightToDp = heightNumber => {
  let height = typeof heightNumber === 'number' ? heightNumber : parseFloat(heightNumber)
  const value =  Math.round(PixelRatio.roundToNearestPixel(height * SCREEN_HEIGHT) / 100)
  return value
}

export {
  widthToDp,
  heightToDp
}