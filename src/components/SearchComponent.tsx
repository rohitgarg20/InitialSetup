import React, { useState } from 'react'
import {Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, icons } from '../common'
import { popinsTextStyle } from '../common/commonStyles'
import { IconButtonWrapper, TextInputComponent } from '../common/components'
import { strings } from '../common'
import { SearchedResultComponent } from './SearchedResultComponent'


const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    padding: 7
  },
  inputTextContainer: {
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 10
  }
})


interface IProps {

}

const { PLACEHOLDER } = strings.SEARCH_COMPONENT

export const SearchComponent = () => {

  const [searchText, updateSearchText] = useState('')

  const renderSearchIcon = () => {
    return (
      <TouchableOpacity style = {styles.iconContainer}>
        <IconButtonWrapper
          iconImage={icons.SOCIETY}
          iconHeight = {20}
          iconWidth = {20}
        />
      </TouchableOpacity>
    )
  }

  const onChangeSearchText = (searchText) => {
    updateSearchText(searchText)
  }

  const renderInputTextContainer = () => {
    return (
      <TextInputComponent
        useAnimated = {false}
        placeholder = {PLACEHOLDER}
        shouldShowIconOrTextInRightSideInputBox = {true}
        customRightSideView = {renderSearchIcon}
        inputContainerStyle = {styles.inputTextContainer}
        textInputStyle = {popinsTextStyle.eighteenBoldBlack}
        inputValue = {searchText}
        onChangeText = {onChangeSearchText}
      />
    )
  }

  const renderSearchedResultComponent = () => {
    return (
      <SearchedResultComponent
        searchedResult={[
          {
            id: '',
            label: 'rohit',
            subLabel: 'garg'
          },
          {
            id: '',
            label: 'rohit',
            subLabel: 'garg'
          },
          {
            id: '',
            label: 'rohit',
            subLabel: 'garg'
          },
          {
            id: '',
            label: 'rohit',
            subLabel: 'garg'
          },
          {
            id: '',
            label: 'rohit',
            subLabel: 'garg'
          },
          {
            id: '',
            label: 'rohit',
            subLabel: 'garg'
          },
          {
            id: '',
            label: 'rohit',
            subLabel: 'garg'
          }
        ]}
      />
    )
  }

  const renderSearchedComponent = () => {
    return (
      <Animated.View style = {{
        transform: [{
            translateY: 0
        }],
        position: 'absolute',
        top: 55,
        backgroundColor: colors.white,
        zIndex: 99999,
        width: '100%'
      }}>
        {renderSearchedResultComponent()}
      </Animated.View>
    )
  }


  return(
    <View>
      {renderInputTextContainer()}
      {/* {renderSearchedComponent()} */}
    </View>
  )

}