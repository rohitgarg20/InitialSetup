import React, { useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import { isNumber } from 'lodash'
import { colors } from '../common'
import { icons } from '../common/icons'
import { log } from '../config'


const styles = StyleSheet.create({
  activityLoaderContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: colors.darkBlue
	},
  srcImage: {
		width: '100%',
		height: '100%'
	},

})

const imageWithLoaderComponent = ({ srcImage }) => {
  const [isImageFeteching, setImageFetchedStatus] = useState(true)
  const [errorFetchingImage, setErrorFetchingImage] = useState(false)

  const getSourceImage = (image) => {
    return isNumber(image) ? image : { uri: image, cache: 'only-if-cached' }
  }

  return (
    <View style={{ height: '100%', overflow: 'hidden' }}>
      {isImageFeteching && (
        <View style={styles.activityLoaderContainer}>
          <ActivityIndicator color={colors.grey} size={'large'} />
        </View>
      )}
      {errorFetchingImage ? (
        <Image source={icons.LOGO} resizeMode={'contain'} style={styles.srcImage} />
      ) : (
        <Image
          source={getSourceImage(srcImage)}
          resizeMode={'stretch'}
          style={styles.srcImage}
          onError={(err) => {
            log('onErroronErroronError', err)
            setImageFetchedStatus(false)
            setErrorFetchingImage(true)
          }}
          onLoadEnd={() => {
            setImageFetchedStatus(false)
          }}
        />
      )}
    </View>
  )
}

export { imageWithLoaderComponent as ImageWithLoaderComponent }
