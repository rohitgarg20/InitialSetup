import React, { PureComponent } from 'react'
import { KeyboardAwareScrollView , KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view'

interface Props extends KeyboardAwareScrollViewProps {
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled'
}

interface State {
}

const DEFAULT_PROPS = {
  showsVerticalScrollIndicator : false,
  enableOnAndroid : true,
  // contentContainerStyle : { flexGrow : 1}
}

class KeyboardAwareScrollViewComponent extends PureComponent<Props, State> {

  constructor(props: Props, state: State) {
    super(props, state)
  }

  render() {
    const { children, keyboardShouldPersistTaps } = this.props
    const finalProps =  {...DEFAULT_PROPS , ...this.props}
    const persistTaps = keyboardShouldPersistTaps ? keyboardShouldPersistTaps : 'handled'
    return <KeyboardAwareScrollView
      keyboardShouldPersistTaps = {persistTaps}
      {...finalProps}
    >
      {children}
    </KeyboardAwareScrollView>
  }
}

export { KeyboardAwareScrollViewComponent }