import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import { get } from 'lodash'
import { episodeDetailStore } from '../store'
import { colors } from '../common'
import { IEpisodeDetail } from '../common/Interfaces'
import { ImageWithLoaderComponent } from '../components/ImageWithLoaderComponent'
import { log } from '../config'

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background
  },
  nameContainer: {
    paddingHorizontal: 10,
    borderBottomWidth: 4,
    borderColor: colors.lightestGrey
  },
  name: {
    fontSize: 20,
    color: colors.white,
    paddingBottom: 10
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
  descriptionContainer: {
    padding: 10
  },
  paddingBottom: {
    paddingBottom: 10
  },
  imgContainer: {
    width: 100,
    height: 100,
    borderRadius: 150,
    overflow: 'hidden',
  }
})

export const EpisodeDetailScreen = observer(({ navigation, route }) => {

  useEffect(() => {
    episodeDetailStore.getEpisodeDetailData(get(route, 'params.episodeId', ''))
    return () => {
      episodeDetailStore.init()
    }
  }, [route])

  const { episodeDetailData } = episodeDetailStore

  const renderName = () => {
    const { name } = episodeDetailData as IEpisodeDetail
    return (
      <View style = {styles.nameContainer}>
        <Text style = {styles.name}>
          {name}
        </Text>
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

  const renderDescription = () => {
    const { episode, air_date } = episodeDetailData as IEpisodeDetail || {}

    return (
      <View style = {styles.descriptionContainer}>
        {renderUserKeyWithValue('Episode', episode)}
        {renderUserKeyWithValue('Air date', air_date)}
      </View>
    )
  }


  return (
    <ScrollView style = {styles.mainContainer} contentContainerStyle = {{
      padding: 20
    }}>
      {renderName()}
      {renderDescription()}
    </ScrollView>
  )
})
