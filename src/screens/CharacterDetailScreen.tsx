import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { get, isEmpty } from 'lodash'
import { characterDetailStore, episodeDetailStore } from '../store'
import { colors } from '../common'
import { ICharacterData, ILocationData } from '../common/Interfaces'
import { ImageWithLoaderComponent } from '../components/ImageWithLoaderComponent'
import { LOCATION_TYPE } from '../common/constant'
import { log } from '../config'

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background
  },
  nameContainer: {
    paddingHorizontal: 10,
    borderBottomWidth: 4,
    borderColor: colors.lightestGrey,
  },
  name: {
    fontSize: 20,
    color: colors.white,
    paddingBottom: 10
  },
  imgContainer: {
    paddingTop: 10,
    width: '100%',
    height: 250,
    // borderRadius: 5
  },
  descriptionContainer: {
    padding: 10
  },
  userDescriptionLabel: {
    fontSize: 22,
    color: colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10
  },
  keyLabel: {
    fontSize: 18,
    color: colors.lightestGrey
  },
  valueLabel: {
    fontSize: 16,
    color: colors.white,
    paddingLeft: 10
  },
  borderButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightestGrey,
    marginHorizontal: 10
  },
  paddingBottom: {
    paddingBottom: 10
  },
  episodeLabel: {
    fontSize: 16,
    color: colors.white,
  }
})

export const CharacterDetailScreen = observer(({ navigation, route }) =>  {

  useEffect(() => {
    characterDetailStore.setInitialCharacterData(get(route, 'params.characterData', {}))
  }, [route])

  useEffect(() => {
    return () => {
      characterDetailStore.init()
    }
  }, [])

  const { characterDetailData, locationData } = characterDetailStore


  const renderName = () => {
    const { name } = characterDetailData as ICharacterData
    return (
      <View style = {styles.nameContainer}>
        <Text style = {styles.name}>
          {name}
        </Text>
      </View>
    )
  }

  const renderCharacterIcon = () => {
    const { image } = characterDetailData as ICharacterData || {}
    return (
      <View style = {styles.imgContainer}>
        <ImageWithLoaderComponent
          srcImage={image}
        />
      </View>
    )
  }

  const renderUserKeyWithValue = (key, value) => {
    return (
      <View style = {styles.rowContainer}>
        <Text style = {styles.keyLabel}>{key} -</Text>
        <Text style = {styles.valueLabel}>{value}</Text>
      </View>
    )
  }

  const renderUserDescription = () => {
    const { status, species, gender } = characterDetailData as ICharacterData || {}

    return (
      <View style = {styles.descriptionContainer}>
        <Text style = {styles.userDescriptionLabel}>User Description</Text>
        {renderUserKeyWithValue('Status', status)}
        {renderUserKeyWithValue('Species', species)}
        {renderUserKeyWithValue('Gender', gender)}
      </View>
    )
  }

  const renderOriginDescription = () => {
    const originDescription: ILocationData = get(locationData, `${LOCATION_TYPE.ORIGIN}`, {})
    if (isEmpty(originDescription)) {
      return null
    }
    const { name, type, dimension, residents = [] } = originDescription
    return (
      <View style = {styles.descriptionContainer}>
        <Text style = {styles.userDescriptionLabel}>Origin Description</Text>
        {renderUserKeyWithValue('Name', name)}
        {renderUserKeyWithValue('Type', type)}
        {renderUserKeyWithValue('Dimension', dimension)}
        {renderUserKeyWithValue('Total Residents', residents?.length || 0)}
      </View>
    )
  }

  const renderLocationDescription = () => {
    const locationDescription: ILocationData = get(locationData, `${LOCATION_TYPE.LOCATION}`, {})
    if (isEmpty(locationDescription)) {
      return null
    }
    const { name, type, dimension, residents = [] } = locationDescription
    return (
      <View style = {styles.descriptionContainer}>
        <Text style = {styles.userDescriptionLabel}>Location Description</Text>
        {renderUserKeyWithValue('Name', name)}
        {renderUserKeyWithValue('Type', type)}
        {renderUserKeyWithValue('Dimension', dimension)}
        {renderUserKeyWithValue('Total Residents', residents?.length || 0)}
      </View>
    )
  }

  const navigateToEpisodeDetailScreen = (episodeUrl) => {
    const episodeIdIndex = episodeUrl.lastIndexOf('/')
    const episodeId = episodeIdIndex !== -1 ? episodeUrl.substring(episodeIdIndex + 1) : ''
    navigation.navigate('EpisodeDetailScreen', {
      episodeId
    })
  }

  const renderEpisodeItem = ({item, index}) => {
    return (
      <TouchableOpacity style = {styles.borderButton} onPress={() => navigateToEpisodeDetailScreen(item)}>
        <Text style = {styles.episodeLabel}>{index + 1}</Text>
      </TouchableOpacity>
    )
  }

  const renderItemSeperator = () => {
    return (
      <View style = {styles.paddingBottom}/>
    )
  }

  const renderEpisodesList = () => {
    const { episode = [] } = characterDetailData as ICharacterData || {}
    return (
      <FlatList
        numColumns={6}
        ItemSeparatorComponent= {renderItemSeperator}
        data= {episode}
        renderItem = {renderEpisodeItem}
        keyExtractor = {(item, index) => item || index.toString()}
        columnWrapperStyle={{
          justifyContent: 'center',
        }}
      />
    )
  }

  return (
    <ScrollView style = {styles.mainContainer} contentContainerStyle = {{
      paddingTop: 20
    }}>
      {renderName()}
      {renderCharacterIcon()}
      {renderUserDescription()}
      {renderOriginDescription()}
      {renderLocationDescription()}
      <Text style = {[styles.userDescriptionLabel, styles.descriptionContainer ]}>Episodes</Text>
      {renderEpisodesList()}
    </ScrollView>
  )
})
