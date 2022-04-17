import React, { Component } from 'react'
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { colors } from '../common'
import { getWidth } from '../common/scaling'
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
    justifyContent: 'center'
  }
})

interface Props {
  pages?: any[]
  onPageChange?: (selectedPageIndex) => void
  scrollViewTestId?: string
  showDotsOnTop?: boolean
}

interface State {
  selectedPageIndex?: number
  containerWidth?: number
}

export class ViewPager extends Component<Props, State> {

  constructor(props: Props, state: State) {
    super(props, state)
    this.state = {
      selectedPageIndex: 0,
      containerWidth: 0

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
      const { containerWidth } = this.state
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
                <View key={key} style = {{ flex: 1, width: containerWidth  }}>
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
      const {  containerWidth } = this.state
      const { showDotsOnTop = false } = this.props
      return (
        <View style = {{ height: '100%', flex: 1 }}
          onLayout = {(event) => {
            const { width = 0 } = event.nativeEvent.layout
            if (width !== containerWidth) {
              this.setState({
                containerWidth: width
              })
            }
          }}
        >{
            showDotsOnTop ? (
              <>
                {this.renderDotIndicator()}
                {this.renderPagerComponent()}
              </>
            ) : (
              <>
                {this.renderPagerComponent()}
                {this.renderDotIndicator()}
              </>
            )
          }

        </View>
      )
    }
}
