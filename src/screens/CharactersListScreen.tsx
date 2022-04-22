import { observer } from 'mobx-react'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Image, TextInput, TouchableOpacity, View, Text } from 'react-native'
import { get, debounce } from 'lodash'
import { colors, icons } from '../common'
import { CharacterItemCardComponent } from '../components'
import { characterDetailStore, charactersListStore } from '../store'
import { CARD_HEIGHT } from '../common/constant'

const styles = StyleSheet.create({
  cardSeperator: {
    paddingBottom: 10
  },
  contentContainer: {
    padding: 10
  },
  container: {
    backgroundColor: colors.background,
    flex: 1
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: colors.lightestGrey,
    margin: 10,
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    margin: 0,
    padding: 0,
    color: colors.lightBlack,
  },
  crossContainer: {
    width: 30
  },
  inputContainer: {
    flex: 1,
    paddingRight: 10
  },
  flatListContainer: {
    flex: 1
  },
  crossIcon: {
    height: 20,
    width: 20,
    tintColor: colors.lightBlack
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  emptyLabel: {
    fontSize: 20,
    color: colors.white
  },
  loaderContainer: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const characterListScreen = observer(({ navigation }) => {


  useEffect(() => {
    charactersListStore.getAllCharactersList()
  }, [])

  const searchDebounce = debounce((searchText) => {
    charactersListStore.resetListData()
    charactersListStore.getAllCharactersList()
  }, 1000)

  const updateSearchTextAndFetchData = useCallback(() => {
    searchDebounce()
  }, [searchDebounce])


  const onPressCard = useCallback((item) => {
    navigation.navigate('CharacterDetailScreen', {
      characterData: item
    })
  }, [navigation])

  const renderCharacterItem = useCallback(({ item }) => {
    return (
      <CharacterItemCardComponent
        characterItem={item}
        onPressCard = {onPressCard}
      />
    )
  }, [onPressCard])

  const renderItemSeperator = () => {
    return (
      <View style = {styles.cardSeperator}/>
    )
  }

  const renderListFooterComponent = () => {
    const { charactersList = [], totalRecords } = charactersListStore
    if (totalRecords === charactersList?.length || totalRecords === 0) {
      return null
    }

    return (
      <View>
        <ActivityIndicator size={'large'} color={colors.lightBlack} />
      </View>
    )
  }


  const loadMoreData = () => {
    const { charactersList = [], totalRecords } = charactersListStore
    if (totalRecords === charactersList?.length || totalRecords === 0) {
      return null
    }
    charactersListStore.updateCurrentPage()
    charactersListStore.getAllCharactersList()

  }

  const getItemLayout = (data, index) => ({ length: CARD_HEIGHT, offset: ((CARD_HEIGHT * index) + index), index })

  const getKeyExtractor = (item, index) => {
    return get(item, 'id', index).toString()
  }

  const renderListEmptyComponent = () => {
    return (
      <View style = {styles.emptyContainer}>
        <Text style = {styles.emptyLabel}>No Result found</Text>
      </View>
    )
  }

  const renderCharactersList = useCallback(() => {
    const { charactersList = [] } = charactersListStore
    const windowSize = charactersList.length > 50 ? charactersList.length / 4 : 21
    return (
      <FlatList
        contentContainerStyle = {styles.contentContainer}
        data = {charactersList}
        renderItem = {renderCharacterItem}
        ItemSeparatorComponent = {renderItemSeperator}
        keyExtractor = {getKeyExtractor}
        ListFooterComponent={renderListFooterComponent}
        onEndReachedThreshold={0.001}
        onEndReached={loadMoreData}
        getItemLayout = {getItemLayout}
        decelerationRate = {'fast'}
        maxToRenderPerBatch={windowSize}
        windowSize={windowSize}
        // initialNumToRender = {charactersList.length}
        style = {styles.flatListContainer}
        ListEmptyComponent={renderListEmptyComponent}

      />
    )
  }, [renderCharacterItem])

  const clearSearch = () => {
    const { updateSearchText } = charactersListStore
    updateSearchText('')
    updateSearchTextAndFetchData()
  }

  const renderCrossIcon = () => {
    return (
      <TouchableOpacity style = {styles.crossContainer} onPress = {clearSearch}>
        <Image
          source={icons.CROSS}
          style = {styles.crossIcon}
        />
      </TouchableOpacity>
    )
  }

  const onChangeSearchText = (searchVal) => {
    const { updateSearchText } = charactersListStore
    updateSearchText(searchVal)
    updateSearchTextAndFetchData()
  }

  const renderSearchBar = () => {
    const { searchText } = charactersListStore
    return (
      <View style = {styles.searchContainer}>
        <View style = {styles.inputContainer}>
          <TextInput style = {styles.input}
            selectionColor = {colors.lightBlack}
            value = {searchText}
            onChangeText = {onChangeSearchText}
            placeholder = {'Search by name'}
          />
        </View>
        {renderCrossIcon()}
      </View>
    )
  }

  if (charactersListStore.isFetching) {
    return (
      <View style = {styles.loaderContainer}>
        <ActivityIndicator size={'large'} color={colors.lightBlack} />
      </View>
    )
  }

  return (
    <View style = {styles.container}>
      {renderSearchBar()}
      {renderCharactersList()}
    </View>
  )
})

export {
  characterListScreen as CharacterListScreen
}
