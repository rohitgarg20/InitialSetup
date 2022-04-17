import React, { Component } from 'react'
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { colors } from '../common'
import { log } from '../config'

const TOTAL_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 5,
    borderColor: colors.black,
    borderWidth: 1
},

selectedDotStyle: {
  width: 10,
  height: 10,
  borderRadius: 10,
  marginRight: 5,
  backgroundColor: colors.lightBlue
},

dotViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
},
})

interface Props {
  pages?: any[]
  onPageChange?: (selectedPageIndex) => void
  scrollViewTestId?: string
}

interface State {
  selectedPageIndex?: number
}

export class ViewPager extends Component<Props, State> {

  constructor(props: Props, state: State) {
    super(props, state)
    this.state = {
      selectedPageIndex: 0
    }
  }
    onPageScrollEnd = (event) => {
      const { onPageChange } = this.props
      const { x } = event.nativeEvent.contentOffset
      const selectedPageIndex = Math.round(x / TOTAL_WIDTH)
      this.setState({
        selectedPageIndex
      })
      if (onPageChange) {
        onPageChange(selectedPageIndex)
      }
    }

    renderPagerComponent = () => {
      const { pages, scrollViewTestId = '' } = this.props
      log('renderPagerComponentrenderPagerComponent', pages.length)
      return (
        <ScrollView
          horizontal
          pagingEnabled
          onMomentumScrollEnd = {this.onPageScrollEnd}
          showsHorizontalScrollIndicator = {true}
          testID={scrollViewTestId}
          nestedScrollEnabled
          contentContainerStyle = {{
            // flexGrow: 1
          }}
        >
          {
            pages.map((item, key) => {
              return(
                <View key={key} style = {{ flex: 1  }}>
                  {item}
                </View>
              )
            })
          }
        </ScrollView>
      )
    }

    renderDotIndicator = () => {
      const dotViewArray = []
      const { selectedPageIndex } = this.state
      const { pages } = this.props
      log('renderDotIndicatorrenderDotIndicator', pages.length)
      for ( let i = 0 ; i < pages.length ; i++) {
        dotViewArray.push(
          <View
            style = {i === selectedPageIndex ? styles.selectedDotStyle : styles.dotStyle}
            key={i}
          />
        )
      }
      return (
        <View style = {[styles.dotViewContainer, { }]}>
          {dotViewArray}
        </View>
      )
    }
    render() {
      return (
        <View style = {{ height: '100%', flex: 1 }} >
          {this.renderPagerComponent()}
          {this.renderDotIndicator()}
        </View>
      )
    }
}
