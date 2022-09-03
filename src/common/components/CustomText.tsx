import React, { Component } from 'react'
import { Animated, Text, TextProps } from 'react-native'
import { isEmpty, isNumber } from 'lodash'
import { computeFontStyle  } from '../../utils/app-utils'


interface Props extends TextProps {
  children?: any // Prop to render Text component as shown in example. Ex: <CustomText>Hello &amp;</CustomText>
  text?: string // Prop to send string values to be rendered inside Text component, ex: <CustomText text='Hello' />
  // In case both text and children props are sent, then "text" prop's value is given higher priority and is rendered !!!
  textStyle?: any // Prop to add style to your text component
  useAnimatedText?: boolean
}

export class CustomText extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { children = '', text = '', textStyle = {}, useAnimatedText = false, ...restProps } = this.props
    const style = computeFontStyle(textStyle)
    // log('computeFontStylecomputeFontStylecomputeFontStyle', style, children)

    if (isEmpty(text) && !isNumber(text) && isEmpty(children) && !isNumber(children)) {
      return null
    }

    if (useAnimatedText) {
      return !isEmpty(text) || isNumber(text) ? (
        <Animated.Text {...restProps} allowFontScaling={false} style={style}>
          {text}
        </Animated.Text>
      ) : (
        <Animated.Text {...restProps} allowFontScaling={false} style={style}>
          {children}
        </Animated.Text>
      )
    }

    return !isEmpty(text) || isNumber(text) ? (
      <Text {...restProps} allowFontScaling={false} style={style}>
        {text}
      </Text>
    ) : (
      <Text {...restProps} allowFontScaling={false} style={style}>
        {children}
      </Text>
    )
  }
}
