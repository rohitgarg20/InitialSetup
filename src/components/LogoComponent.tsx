import React from 'react'
import { Image } from 'react-native'
import { icons } from '../common'

export const LogoComponent = () => {
  return (
    <Image
      source={icons.SOCIO_HOOD_LOGO}
      style = {{
        height: 100,
        width: '100%'
      }}
      resizeMode = {'contain'}
    />
  )
}
