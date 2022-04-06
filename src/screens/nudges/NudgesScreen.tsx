import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { colors, fontDimens } from '../../common'
import { ACTION_TYPE, BASE_URL, FETCHING_ARR } from '../../common/constant'
import { icons } from '../../common/icons'
import { CustomText, FlatListWrapper, IconButtonWrapper, ImageWithLoaderComponent, ShimmerComponent } from '../../components'
import { HeaderCardComponent } from '../../components/HeaderCardComponent'
import { log } from '../../config'
import { nudgesListDataStore } from '../../store'
import { INudgeListItem } from '../../store/interfaces'

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
    fontSize: fontDimens.medium,
    lineHeight: 16,
    color: colors.white
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
    flexDirection: 'row'
  },
  nudgesLabel: {
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    fontWeight: '400',
    fontSize: fontDimens.small,
    lineHeight: 12,
    color: colors.black,
    paddingBottom: 5
  },
  descContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: PADDING_VERTIACAL,
    backgroundColor: colors.white,
    flex: 1
  },
  description: {
    fontWeight: '600',
    fontSize: fontDimens.small,
    lineHeight: 16,
    color: colors.black
  },
  nudgesNotes: {
    fontSize: fontDimens.small,
    lineHeight: 16,
    color: colors.labelColor,
    paddingTop: 25,
    paddingBottom: 30,
    textAlign: 'center'
  }
})

@observer
export class NudgesScreen extends Component {
  swiper
  constructor(props, state) {
    super(props, state)
    nudgesListDataStore.updateFetchingStatus(true)
  }

  componentDidMount() {
    nudgesListDataStore.getNudgesListData()
  }

  componentWillUnmount() {
    nudgesListDataStore.init()
  }

  renderNudgeSwiperView = () => {
    const { nudgesData, updateCurrentIndex } = nudgesListDataStore
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
            updateCurrentIndex()
            console.log(cardIndex)
          }}
          onSwipedAll={() => {
            console.log('onSwipedAll')
          }}
          cardIndex={0}
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
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => this.moveToNextNudge(ACTION_TYPE.NEXT)} style={styles.rowContainer}>
          <CustomText textStyle={styles.nudgesLabel}>
            My Nudges
          </CustomText>
          <IconButtonWrapper
            iconImage={icons.RIGHT_ARROW}
            iconHeight={10}
            iconWidth={10}
            styling={{
              marginLeft: 5,
              tintColor: colors.black,
              marginTop: 1
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <IconButtonWrapper
            iconImage={icons.FILTER_ICON}
            iconHeight={18}
            iconWidth={18}
          />
        </TouchableOpacity>
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
    const { currentNudeIndex, nudgesData } = nudgesListDataStore
    const nudgesList = nudgesData?.nudgesList || []
    const totalNudges = nudgesList?.length
    if (currentNudeIndex > totalNudges) {
      return (
        <View>
          <CustomText>
            No nudges Present
          </CustomText>
        </View>
      )
    }
    return (
      <>
        <CustomText textStyle={styles.nudgesNotes}>Note: Click on the poster to check event details.</CustomText>
        {this.renderNudgeSwiperView()}
        {this.renderNudeSkipAcceptSection()}
        {this.renderFooterComponent()}
        {this.renderNudgeContentContainer()}
      </>
    )

  }


  render() {
    const { isFetching } = nudgesListDataStore

    return (
      <>
        <HeaderCardComponent />
        {
          isFetching ? this.renderFetchingView() : <>
            {this.renderNudesView()}
          </>
        }
      </>
    )
  }
}
