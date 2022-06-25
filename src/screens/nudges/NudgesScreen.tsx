import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Button, StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, ToastAndroid } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { colors, fontDimens, fontDimensPer } from '../../common'
import { ACTION_TYPE, BASE_URL, FETCHING_ARR, navigateToWebView } from '../../common/constant'
import { icons } from '../../common/icons'
import { CustomText, FlatListWrapper, IconButtonWrapper, ImageWithLoaderComponent, LoaderWithApiErrorComponent, ShimmerComponent } from '../../components'
import { HeaderCardComponent } from '../../components/HeaderCardComponent'
import { log } from '../../config'
import { genericDrawerStore, nudgesListDataStore } from '../../store'
import { INudgeListItem } from '../../store/interfaces'
import { showAndroidToastMessage } from '../../utils/app-utils'
import { widthToDp } from '../../utils/Responsive'
import { PreferencesScreen } from '../preferences/PreferencesScreen'

const PADDING_HORIZONTAL = 20
const PADDING_VERTIACAL = 10

const styles = StyleSheet.create({
  container: {
    height: '60%',
    backgroundColor: '#F5FCFF'
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    elevation: 25,
    shadowOffset: {
      height: 10,
      width: 10
    },
    shadowColor: 'grey',
    shadowRadius: 8

  },
  swipeLabel: {
    fontWeight: '600',
    fontSize: widthToDp(fontDimensPer.medium),
    color: colors.white,
    fontFamily: 'Poppins-SemiBold'
  },
  footerContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: PADDING_VERTIACAL,
    backgroundColor: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nudgesLabel: {
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    fontWeight: '400',
    fontSize: widthToDp(fontDimensPer.small),
    // lineHeight: 12,
    color: colors.black,
    paddingBottom: 5,
    fontFamily: 'OpenSans-VariableFont_wdth,wght'

  },
  descContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: PADDING_VERTIACAL,
    backgroundColor: colors.white,
    flex: 1
  },
  description: {
    fontWeight: '400',
    // lineHeight: 16,
    color: colors.black,
    fontSize: widthToDp(fontDimensPer.medium),
    fontFamily: 'OpenSans-VariableFont_wdth,wght'
  },
  nudgesNotes: {
    fontSize: widthToDp(fontDimensPer.medium),
    color: colors.labelColor,
    paddingTop: 25,
    paddingBottom: 30,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400'

  }
})

interface IProps {
  navigation?: any
}
@observer
export class NudgesScreen extends Component<IProps> {
  swiper
  constructor(props, state) {
    super(props, state)
    nudgesListDataStore.updateFetchingStatus(true)
  }

  onPressApplyFilter = () => {

    nudgesListDataStore.resetDataAndHitApi()
  }
  componentDidMount() {
    const { navigation } = this.props
    nudgesListDataStore.getNudgesListData()
    // genericDrawerStore.setRenderingComponent(<PreferencesScreen navigation={navigation} onPressApplyFilter = {this.onPressApplyFilter}/>)

  }

  componentWillUnmount() {
    // genericDrawerStore.clearData()
    nudgesListDataStore.init()
  }

  renderNudgeSwiperView = () => {
    const { nudgesData, updateCurrentIndex, saveCurrentNudge, currentNudeIndex } = nudgesListDataStore
    const nudgesList = nudgesData?.nudgesList || []
    if (nudgesList.length === 0) {
      return null
    }
    return (
      <View style={styles.container}>
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          cards={[...nudgesList]}
          renderCard={(card) => {
            const { image } = card as INudgeListItem
            return (
              <View style={styles.card}>
                <ImageWithLoaderComponent
                  srcImage={`${BASE_URL}${image}`}
                />
              </View>
            )
          }}
          onSwiped={(cardIndex) => {
            log('onSwipedonSwipedonSwiped', cardIndex)
            updateCurrentIndex()
          }}
          onSwipedRight = {(cardIndex) => {
            log('onSwipedRightonSwipedRight')
            saveCurrentNudge(cardIndex)
          }}
          onSwipedAll={() => {
            // console.log('onSwipedAll')
          }}
          onSwipedLeft = {() => {
            showAndroidToastMessage('This nudge has been skipped', ToastAndroid.SHORT)
          }}
          cardIndex={currentNudeIndex}
          // backgroundColor={'transparent'}
          verticalSwipe={false}
          stackSize={3}
          cardStyle={{
            height: '90%'
          }}
          cardVerticalMargin={0}
          containerStyle={{
            backgroundColor: colors.grey
          }}
          animateCardOpacity={true}
          stackSeparation={10}
          key = {nudgesList.length}
        />
      </View>
    )
  }


  renderShimmerView = () => {
    return (
      <ShimmerComponent />
    )
  }

  renderFetchingView = () => {
    const { isFetching } = nudgesListDataStore
    if (!isFetching) {
      return null
    }
    return (
      <FlatListWrapper
        isFetching={true}
        data={FETCHING_ARR}
        customizedShimmerView={this.renderShimmerView}
        renderItem={null}

      />
    )
  }

  renderSwipeArrowsList = () => {
    const leftArrowList = (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        {
          [1, 2, 3, 4, 5, 6].map((item, index) => {
            return (
              <IconButtonWrapper
                iconImage={icons.RIGHT_ARROW}
                iconHeight={25 / item}
                iconWidth={25 / item}
                styling={{
                  paddingRight: 10,
                  transform: [{
                    rotate: '180deg'
                  }]
                }}
              />
            )
          })
        }
      </View>
    )

    const rightArrowList = (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        {[6, 5, 4, 3, 2, 1].map((item, index) => {
          return (
            <IconButtonWrapper
              iconImage={icons.RIGHT_ARROW}
              iconHeight={25 / item}
              iconWidth={25 / item}
              styling={{
                paddingRight: 10
              }}
            />
          )
        })}
      </View>
    )
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '70%',
        paddingHorizontal: 20
      }}>
        {leftArrowList}
        <CustomText textStyle={{ ...styles.swipeLabel, fontWeight: '400', fontSize: 10 }}>
          Swipe
        </CustomText>
        {rightArrowList}
      </View>)

  }

  moveToNextNudge = (key) => {
    if (key === ACTION_TYPE.NEXT) {

      this.swiper.swipeRight()
    } else {
      this.swiper.swipeLeft()
    }
  }

  renderNudeSkipAcceptSection = () => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black,
        paddingHorizontal: PADDING_HORIZONTAL,
        paddingVertical: PADDING_VERTIACAL,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
      }}>
        <TouchableOpacity onPress={() => this.moveToNextNudge(ACTION_TYPE.SKIP)}>
          <CustomText textStyle={styles.swipeLabel}>
            Skip
          </CustomText>
        </TouchableOpacity>
        {this.renderSwipeArrowsList()}

        <TouchableOpacity onPress={() => this.moveToNextNudge(ACTION_TYPE.NEXT)}>
          <CustomText textStyle={styles.swipeLabel}>
          Accept
          </CustomText>
        </TouchableOpacity>

      </View>
    )
  }

  renderFooterComponent = () => {
    const { navigation } = this.props
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => {
          log('on press is called')
          navigateToWebView({
            navigation,
            pageUrl: `${BASE_URL}/mobile/nudge/saved`
          })
        }} style={styles.rowContainer}>
          <CustomText textStyle={styles.nudgesLabel}>
            My Nudges
          </CustomText>
          <IconButtonWrapper
            iconImage={icons.RIGHT_ARROW}
            iconHeight={10}
            iconWidth={10}
            styling={{
              marginLeft: 5,
              tintColor: colors.black
              // marginTop: 1
            }}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity>
          <IconButtonWrapper
            iconImage={icons.FILTER_ICON}
            iconHeight={18}
            iconWidth={18}
          />
        </TouchableOpacity> */}
      </View>
    )
  }

  renderNudgeContentContainer = () => {
    const { currentNudgeData } = nudgesListDataStore
    const { description } = currentNudgeData as INudgeListItem
    log('currentNudgeDatacurrentNudgeData', currentNudgeData)

    return (
      <View style={styles.descContainer}>
        <CustomText textStyle={styles.description} numberOfLines={4} ellipsizeMode={'tail'}>
          {description}
        </CustomText>
      </View>
    )
  }

  renderNudesView = () => {
    const { currentNudeIndex, nudgesData, resetDataAndHitApi } = nudgesListDataStore
    const nudgesList = nudgesData?.nudgesList || []
    const totalNudges = nudgesList?.length
    log('currentNudeIndexcurrentNudeIndex', currentNudeIndex, totalNudges)

    if (currentNudeIndex >= totalNudges) {
      return (
        <View>
          <CustomText>
            No nudges Present
          </CustomText>
        </View>
      )
    }
    return (
      <ScrollView
        contentContainerStyle = {{
          flex: 1
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              resetDataAndHitApi()
            }}
          />
        }
      >
        <CustomText textStyle={styles.nudgesNotes}>Note: Click on the poster to check event details.</CustomText>
        {this.renderNudgeSwiperView()}
        {this.renderNudeSkipAcceptSection()}
        {this.renderFooterComponent()}
        {this.renderNudgeContentContainer()}
      </ScrollView>
    )

  }

  renderContainerContent = () => {
    const { isFetching, isApiError, resetDataAndHitApi } = nudgesListDataStore
    if (isFetching || isApiError) {
      return (
        <View style = {{
          flex: 1
        }}>
          <LoaderWithApiErrorComponent
            isFetching = {isFetching}
            isApiError = {isApiError}
            onTryAgain = {resetDataAndHitApi}
          />
        </View>
      )
    }

    return this.renderNudesView()
  }

  render() {
    const { isFetching, updateFetchingStatus, resetDataAndHitApi  } = nudgesListDataStore

    return (
      <>
        <HeaderCardComponent
          updateFetchingStatus={updateFetchingStatus}
          hitSearchApi = {resetDataAndHitApi}
        />
        {
          this.renderContainerContent()
        }
      </>
    )
  }
}
