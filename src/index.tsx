import './config/ReactotronConfig'
import { observer, Provider } from 'mobx-react'
import React, { Component }  from 'react'
import { map, isEmpty } from 'lodash'
import { setRouterHandler } from './navigator'
import { SplashScreen } from './screens/Splash'
import { navigationDataStore } from './store'
import  stores from './store'
import { LogBox, SafeAreaView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Loader } from './components'
import { GenericDrawerComponent } from './components/GenericDrawerComponent'
import { GenericDrawer } from './components/GenericDrawer'
import { getUserInfoData } from './utils/auth-utils'

const servicesContainer = [<Loader/>, <GenericDrawer/>]
@observer
export class App extends Component {

  async componentDidMount() {
    LogBox.ignoreAllLogs(true)
    const userInfo = await getUserInfoData()
    if (!isEmpty(userInfo)) {
      setRouterHandler()
    } else {
      setTimeout(() => {
        setRouterHandler()
      }, 500)
    }
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