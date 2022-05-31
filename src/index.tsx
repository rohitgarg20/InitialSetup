import './config/ReactotronConfig'
import { observer, Provider } from 'mobx-react'
import React, { Component }  from 'react'
import { map } from 'lodash'
import { setRouterHandler } from './navigator'
import { SplashScreen } from './screens/Splash'
import { navigationDataStore } from './store'
import  stores from './store'
import { LogBox, SafeAreaView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { GenericDrawerComponent, Loader } from './components'

const servicesContainer = [<Loader/>, <GenericDrawerComponent/>]

@observer
export class App extends Component {

  componentDidMount() {
    LogBox.ignoreAllLogs(true)
    setRouterHandler()
  }

  render() {
    const style = {flex: 1}
    const { router: Router, currentStackName } = navigationDataStore
    return(
      <Provider { ...stores}>
        <SafeAreaView style = {style}>
          {
            Router ? <>
              <GestureHandlerRootView style={style}>
                <Router/>
                {map(servicesContainer, (service, index) => <>{service}</>)}

              </GestureHandlerRootView>
            </> : <SplashScreen/>
          }
        </SafeAreaView>
      </Provider>
    )
  }

}