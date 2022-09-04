import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from '../../common'
import { commonStyles, popinsTextStyle } from '../../common/commonStyles'
import { CustomText } from '../../common/components'
import { FILTERED_BY_STATUS, IN_OUT_REGISTER_TAB } from '../../common'
import { strings } from '../../common'
import { ContainerDataComponent, HeaderComponent, HorizontalScrollBar, InOutRegisterCard, SearchComponent } from '../../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryButton
  },
  tabItem: {
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedTab: {
    backgroundColor: colors.primaryButton
  },
  unselectedTab: {
    backgroundColor: colors.white
  },
  fixedContainer: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: colors.white,
    zIndex: 999
  },
  filteredByStatusContainer: {
    padding: 4,
    flexDirection: 'row',
    backgroundColor: colors.black,
    marginTop: 10
  },
  statusItem: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.black
  },
  selectedStatusItem: {
    backgroundColor: colors.primaryButton
  },
  unselectedStatusItem: {

  },
  filteredText: {

  },
  mainContainer: {
    paddingTop: 20,
    zIndex: -1
  }
})

const { HEADER_TITLE } = strings.IN_OUT_REGISTER


export const InOutRegisterScreen = () => {

  const renderHeaderSection = () => {
    return (
      <HeaderComponent
        headerLabel={HEADER_TITLE}
        hideBackButton = {false}
        customHeadingStyle = {{
          left: 0
        }}
      />
    )
  }

  const renderTabItem = ({ item }) => {
    const { label } = item
    return (
      <TouchableOpacity >
        <CustomText>{label}</CustomText>
      </TouchableOpacity>
    )
  }

  const renderVisitorsType = () => {
    return (
      <HorizontalScrollBar
        tabBarList= {IN_OUT_REGISTER_TAB}
        selectedTabId = {''}
      />
    )
  }

  const renderFilterByType = () => {
    return (
      <View style = {[commonStyles.roundedBorderTenRadius, styles.filteredByStatusContainer]}>
        {
          FILTERED_BY_STATUS.map((item) => {
            const { isSelected, displayLabel, key } = item
            let style = styles.statusItem
            let textStyle = { ...popinsTextStyle.eighteenBoldBlack, color: colors.white}
            if(isSelected) {
              style = {
                ...style,
                ...styles.selectedStatusItem
              }
              textStyle = {
                ...textStyle,
                color: colors.black
              }
            }
            return (
              <TouchableOpacity style = {style}>
                <CustomText textStyle={textStyle}>{displayLabel}</CustomText>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  const renderFixedHeaderComponent = () => {
    return (
      <View style = {styles.fixedContainer}>
        <SearchComponent/>
        {renderFilterByType()}
      </View>
    )
  }

  const renderMainContainer = () => {
    return (
      <View style = {styles.mainContainer}>
        {renderVisitorsType()}
        <InOutRegisterCard
          username = {'rohit'}
          visitorType = {'Resident'}/>
      </View>
    )
  }


  return (
    <View style = {styles.container}>
      {renderHeaderSection()}
      <ContainerDataComponent
        fixedHeaderComponent={renderFixedHeaderComponent}
        renderContainerComponent = {renderMainContainer}
      />
    </View>
  )
}