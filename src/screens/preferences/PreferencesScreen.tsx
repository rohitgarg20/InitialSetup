import React, { Component } from 'react'
import { View } from 'react-native'
import { CustomText } from '../../components'
import { AnimatedCardComponent } from '../../components/AnimatedCardComponent'
import { preferencesDataStore } from '../../store'

export  class PreferencesScreen extends Component {
  componentDidMount() {
    preferencesDataStore.getUserPreferencesData()
  }

  renderAccordianHeaderView = (showInFullMode) => {
    return (
      <View>
        <CustomText>
          Touchable view is here
        </CustomText>
      </View>
    )
  }

  renderGoalLevelsInGoalComponent = ()=> {
    return (
      <View>
        {
          ['a1', 'b1', 'c1'].map((item) => {
            return (
              <CustomText>
                Aster expasion{item}
              </CustomText>
            )
          })
        }
      </View>
    )
  }

  renderListItem = () => {
    return (
      <View>
        <CustomText>Heading</CustomText>
        {
          ['a', 'b', 'c'].map((item) => {
            return (
              <CustomText>
                {item}
              </CustomText>
            )
          })
        }
        <AnimatedCardComponent
          renderHeaderComponent={(showInFullMode) => this.renderAccordianHeaderView(showInFullMode)}
          renderMainContent={() => this.renderGoalLevelsInGoalComponent()}
          // cardContainerStyle={styles.cardContainerStyle}
          animationDuration={500}
        />
      </View>
    )
  }

  render() {
    return (
      <View>
        <CustomText>
       Preeferences Screen
        </CustomText>
        {this.renderListItem()}
      </View>
    )
  }
}
