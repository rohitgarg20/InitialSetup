import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { ActivityIndicator, Animated, StyleSheet, View } from 'react-native'
import { get } from 'lodash'
import { colors, fontDimensPer, strings } from '../../common'
import { IComplainData } from '../../common/Interfaces'
import { ButtonComponent, ComplainCardComponent, ContainerDataComponent, FlatListWrapper, HeaderComponent, SingleLineSlimShimmerComponent } from '../../components'
import { complaintListStore } from '../../store'
import { log } from '../../config'
import { widthToDp } from '../../common/Responsive'
import { navigateSimple } from '../../service'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryButton
  },
  itemSeperator: {
    paddingBottom: 30
  },
  titleLabel: {
    fontSize: widthToDp(fontDimensPer.twentyFont),
    color: colors.dardBlack,
    fontWeight: '700',
    fontFamily: 'Poppins',
    paddingBottom: 5
  },
  buttonContainer: {
    backgroundColor: colors.white,
    height: 70,
    paddingHorizontal: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerButtonContainer: {
    borderRadius: 10,
    paddingVertical: 5
  }
})

const complainListScreen = observer(({ navigation  }) => {
  const { isFetchingListData, complaintList, totalCount, currentCount, onLoadMoreData } = complaintListStore

  useEffect(() => {
    complaintListStore.updateFetchingListStatus(true)
    complaintListStore.getComplaintList()
    return () => {
      complaintListStore.init()
    }
  }, [])

  const renderHeaderSection = () => {
    const { HEADING } = strings.COMPLAINT_LIST_SCREEN
    return (
      <HeaderComponent
        headerLabel={HEADING}
      />
    )
  }

  const getListKeyExtractor = (item, index) => {
    return get(item, '_id', index).toString()
  }

  const navigateToComplainDetail = (item) => {
    const { _id  } = item as IComplainData
    navigateSimple(navigation, 'ComplainDetailScreen', {
      complaintId: _id,
      // complaintDetails: item
    })
  }

  const renderComplainCardComponent = ({ item }) => {
    return (
      <ComplainCardComponent
        complaintData={item}
        navigateToComplainDetailScreen = {() => navigateToComplainDetail(item)}
        showCardButtons = {false}
      />
    )
  }

  const renderItemSeperator = () => {
    return (
      <View style = {styles.itemSeperator}/>
    )
  }

  const renderFooterComponent = () => {
    log('currentCountcurrentCount', currentCount, totalCount)
    if (isFetchingListData || currentCount >= totalCount) {
      return null
    }
    return (
      <ActivityIndicator
        animating = {true}
        color = {colors.primaryButton}
        size = {'large'}
      />
    )
  }

  const renderCustomizedShimmer = () => {
    return (
      <SingleLineSlimShimmerComponent/>
    )
  }

  const renderComplainListComponent = () => {
    log('isFetchingListDataisFetchingListData', isFetchingListData)
    return (
      <FlatListWrapper
        isFetching = {isFetchingListData}
        renderItem = {renderComplainCardComponent}
        data = {isFetchingListData ? ['', '', '', '', '', '', '', '', '', ''] : complaintList as IComplainData[]}
        keyExtractor = {getListKeyExtractor}
        ItemSeparatorComponent = {renderItemSeperator}
        ListFooterComponent = {renderFooterComponent}
        onEndReached = {onLoadMoreData}
        onEndReachedThreshold = {0.001}
        customizedShimmerView = {renderCustomizedShimmer}

      />
    )
  }

  const navigateToRaiseNewComplaintScreen = () => {
    navigateSimple(navigation, 'CategoryListScreen')
  }

  const renderComplainButton = () => {
    const { RAISE_COMPLAINT } = strings.RAISE_COMPLAINT

    return (
      <ButtonComponent
        buttonLabel={RAISE_COMPLAINT}
        onPressButton={navigateToRaiseNewComplaintScreen}
        buttonContainerStyles = {styles.footerButtonContainer}
        buttonLabelStyles = {styles.titleLabel}
      />
    )
  }

  const renderRaiseNewComplainFotter = () => {
    return (
      <View style = {styles.buttonContainer}>
        {renderComplainButton()}
      </View>
    )
  }

  return (
    <View style = {styles.container}>
      {renderHeaderSection()}
      <ContainerDataComponent
        renderContainerComponent = {renderComplainListComponent}
      />
      {!isFetchingListData && renderRaiseNewComplainFotter()}
    </View>
  )
})

export {
  complainListScreen as ComplainListScreen
}
