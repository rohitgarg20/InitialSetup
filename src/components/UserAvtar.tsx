import React from 'react'
import { View, Image, Text } from 'react-native'

// from https://flatuicolors.com/
const defaultColors = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50' // midnight blue
]

function sumChars(str) {
  let sum = 0
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i)
  }
  return sum
}

interface Props {
  src?: any
  name?: any
  color?: string
  textColor?: string
  colors?: any
  fontDecrease?: any
  size?: any
  containerStyle?: any
  imageStyle?: any
  defaultName?: any
  radius?: number
  component?: any
  showBorderRadius?: boolean
}

export class UserAvatar extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    let {
      src,
      name,
      color,
      textColor = '#fff',
      colors = defaultColors,
      fontDecrease,
      size,
      containerStyle,
      imageStyle,
      defaultName,
      radius = 0.5,
      showBorderRadius
    } = this.props

    if (!fontDecrease) fontDecrease = 2.5

    if (!name) throw new Error('Avatar requires a name')

    if (typeof size !== 'number') size = parseInt(size, 10)

    const firstTwoChar = (str) => {
      return str && str.length > 2 ? (str.substring(0, 2)).toUpperCase() : 'UN'
    }
    let abbr = firstTwoChar(name)
    if (!abbr) abbr = defaultName

    if (isNaN(radius)) radius = 0.5
    const borderRadius = showBorderRadius ?  size * radius : 0

    const imageLocalStyle = {
      borderRadius
    } as any

    const innerStyle = {
      borderRadius,
      borderWidth: 1,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    } as any

    if (size) {
      imageLocalStyle.width = innerStyle.width = size
      imageLocalStyle.height = innerStyle.height = size
    }

    let inner
    if (src) {

      const props = {
        style: [imageLocalStyle, imageStyle],
        source: {uri: src}
      }

      inner = React.createElement( this.props.component || Image, props )

    } else {
      let background
      if (color) {
        background = color
      } else {
        // pick a deterministic color from the list
        let i = sumChars(name) % colors.length
        background = colors[i]
      }

      innerStyle.backgroundColor = background

      inner = <Text style={{ fontSize: size / fontDecrease, color: textColor }}>{abbr}</Text>
    }

    return (
      <View>
        <View style={[innerStyle, containerStyle]}>
          {inner}
        </View>
      </View>
    )
  }
}