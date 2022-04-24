import React, { useCallback } from 'react'
import { View } from 'react-native'
import { ApiErrorComponent } from './ApiErrorComponent'
import { ScreenLoaderComponent } from './ScreenLoaderComponent'

interface IProps {
  isFetching?: boolean
  isApiError?: boolean
  onTryAgain?: () => void
}

const loaderWithApiErrorComponent = (props: IProps) => {
  const { isFetching = false, isApiError = false, onTryAgain } = props


  const renderLoaderComponent = useCallback(() => {
    return (
      isFetching &&  <ScreenLoaderComponent

      />
    )
  }, [isFetching])

  const renderApiErrorComponent = useCallback(() => {
    return (
      isApiError && <ApiErrorComponent
      onTryAgain = {onTryAgain}/>
    )
  }, [isApiError, onTryAgain])

  return (
    <View style = {{
      flex: 1
    }}>
      {renderLoaderComponent()}
      {renderApiErrorComponent()}
    </View>
  )
}

export {
  loaderWithApiErrorComponent as LoaderWithApiErrorComponent
}
