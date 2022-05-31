import React, { Component, ReactElement } from 'react'
import { Animated, Dimensions, FlatList, FlatListProps } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder-1'
import { get } from 'lodash'

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')

export interface FlatListWrapperProps extends FlatListProps<any> {
  fetchingViewUnitTestID?: string
  dataListUnitTestID?: string
  isFetching?: boolean
  placeholderStyle?: any
  infiniteScrollShimmer?: boolean
  customizedShimmerView?: () => ReactElement<any>
  isAnimated?: boolean
  inputRef?: any
  showCustomizedAnimatedFlatList?: boolean
  animatedFlatListStyle?: {}
}

interface State {
  infiniteData?: any
}

export class FlatListWrapper extends Component<FlatListWrapperProps, State> {
  static defaultProps = {
    isFetching: false,
    placeholderstyle: {},
    infiniteScrollShimmer: false,
    customizedShimmerView: null,
    isAnimated: false,
    showCustomizedAnimatedFlatList: false,
    animatedFlatListStyle: {}
  }

  scrolledYValue = new Animated.Value(0)
  listPosition

  constructor(props: FlatListWrapperProps, state: State) {
    super(props)
    this.state = {
      infiniteData: ['', '', '', '', '', '', '', '', '', '', '']
    }
    this.init()
  }

  init = () => {
    const { isAnimated, horizontal } = this.props
    if (isAnimated) {
      const initialListPosition = horizontal ? WINDOW_WIDTH : WINDOW_HEIGHT
      this.listPosition = new Animated.Value(initialListPosition)
    }
  }

  onEndReached = () => {
    const { infiniteData } = this.state
    const { infiniteScrollShimmer } = this.props
    if (infiniteScrollShimmer) this.setState({ infiniteData: infiniteData.concat(infiniteData) })
  }

  renderShimmerComponent = () => {
    const { customizedShimmerView, placeholderStyle } = this.props
    if (customizedShimmerView) {
      return customizedShimmerView()
    } else {
      return <ShimmerPlaceHolder isInteraction={false} autoRun style={placeholderStyle} />
    }
  }

  renderPlaceholder = () => {
    const { infiniteScrollShimmer, inputRef, fetchingViewUnitTestID } = this.props
    const { infiniteData } = this.state
    const noOfItems = get(this.props, 'data', [])
    const numColumns = get(this.props, 'numColumns', 1)
    const contentContainerStyle = get(this.props, 'contentContainerStyle', {})
    const data = infiniteScrollShimmer ? infiniteData : noOfItems
    return (
      <Animated.FlatList
        {...this.props}
        testID={fetchingViewUnitTestID}
        data={data}
        renderItem={() => this.renderShimmerComponent()}
        numColumns={numColumns}
        onEndReached={() => this.onEndReached()}
        contentContainerStyle={contentContainerStyle}
        ref={inputRef || React.createRef()}
      />
    )
  }

  renderFlatList = () => {
    const { isAnimated, inputRef, showCustomizedAnimatedFlatList, animatedFlatListStyle, dataListUnitTestID } = this.props

    if (showCustomizedAnimatedFlatList) {
      return (
        <Animated.FlatList testID={dataListUnitTestID} {...this.props} ref={inputRef || React.createRef()} style={animatedFlatListStyle} />
      )
    }
    if (isAnimated) {
      return <this.renderAnimatedFlatList />
    }
    return (
      <FlatList {...this.props} testID={dataListUnitTestID} ref={inputRef || React.createRef()} />
    )
  }

  renderAnimatedFlatList = () => {
    const { renderItem, horizontal } = this.props
    Animated.timing(this.listPosition, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false
    }).start()
    const itemSpacing = this.listPosition.interpolate({
      inputRange: [0, WINDOW_HEIGHT / 2, WINDOW_HEIGHT],
      outputRange: [0, 90, 100],
      extrapolate: 'clamp'
    })
    const listAnimatedStyle = horizontal ? { translateX: this.listPosition } : { translateY: this.listPosition }
    const itemAnimatedStyle = horizontal ? { marginLeft: itemSpacing } : { marginTop: itemSpacing }
    return (
      <Animated.View style={{ transform: [listAnimatedStyle] }}>
        <FlatList
          {...this.props}
          renderItem={(props) => <Animated.View style={itemAnimatedStyle}>{renderItem({ ...props })}</Animated.View>}
        />
      </Animated.View>
    )
  }

  render() {
    const { isFetching } = this.props
    if (isFetching) {
      return <this.renderPlaceholder />
    }
    return <this.renderFlatList />
  }
}
