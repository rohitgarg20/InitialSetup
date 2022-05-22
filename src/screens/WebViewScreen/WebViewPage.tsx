import React, { Component } from 'react'
import { View, StyleSheet, Linking, ActivityIndicator, BackHandler } from 'react-native'
import { WebView } from 'react-native-webview'
import { observer } from 'mobx-react'
import { get } from 'lodash'
import { goBack } from '../../service'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { colors, strings } from '../../common'
import { log } from '../../config'
import { userDataStore } from '../../store'


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  activityIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

interface IProps {
  route?: any
  navigation?: any
}

@observer
export class WebViewPage extends Component<IProps> {
  pageUrl
  backButtonPressedCallBack?: () => { /* */ }
  screenFocusListener
  screenBlurListener
  connectionChangeListener: any

  constructor(props: IProps) {
    super(props)
    const { route } = props
    this.pageUrl = get(route, 'params.pageUrl', '')
    this.backButtonPressedCallBack = get(route, 'params.backButtonPressedCallBack', null)
  }

  componentDidMount() {
    this.addListeners()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  addListeners = () => {
    const { navigation } = this.props
    this.screenFocusListener = navigation.addListener('focus', this.addScreenFocusedHandlers)
    this.screenBlurListener = navigation.addListener('blur', this.addScreenBluredHandlers)
  }

  addScreenFocusedHandlers = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPressed)
  }

  addScreenBluredHandlers = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPressed)
  }

  removeListeners = () => {
    // tslint:disable-next-line: no-unused-expression
    this.screenFocusListener && this.screenFocusListener()
    // tslint:disable-next-line: no-unused-expression
    this.screenBlurListener && this.screenBlurListener()
  }

  handleBackPressed = () => {
    if (this.backButtonPressedCallBack) {
      this.backButtonPressedCallBack()
    } else {
      goBack(undefined)
    }
    return true
  }


  handleDataReceived = (msgData) => {
    const { NO_BROWSER_AVAILABLE, NO_DETAILS } = strings
    const newsUrl = msgData.data.url
    if (newsUrl) {
      Linking.canOpenURL(newsUrl).then((supported) => {
        if (supported) {
          Linking.openURL(newsUrl)
        } else {
          showAndroidToastMessage(NO_BROWSER_AVAILABLE)
        }
      })
    } else {
      showAndroidToastMessage(NO_DETAILS)
    }
  }

  onWebViewMessage = (event) => {
    let msgData
    try {
      msgData = JSON.parse(event.nativeEvent.data)
    } catch (err) {
      return
    }
    if (msgData.targetFunc === this[msgData.targetFunc].apply(this, [msgData])) {
      this[msgData.targetFunc].apply(this, [msgData])
    }
  }

  onError = (err) => {
    //
    log('onErroronErroronError', err, this.pageUrl)
  }

  activityIndicatorLoadingView = () => {
    return <ActivityIndicator color={colors.darkBlue} size='large' style={styles.activityIndicatorStyle} />
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          style={{ flex: 1 }}
          source={{
            uri: this.pageUrl,
            headers: {
              'x-csrf-token': userDataStore.xsrfToken,
              // 'withcredentials': true
            }
          }}
          onMessage={this.onWebViewMessage.bind(this)}
          onError={this.onError.bind(this)}
          renderLoading={this.activityIndicatorLoadingView}
          startInLoadingState={true}
        />
      </View>
    )
  }
}
