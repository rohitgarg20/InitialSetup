import React, { useEffect, useRef, useState } from 'react'
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import MapView, { Marker } from 'react-native-maps'

import { log } from '../config'
import { DUMMY_DATA, MAP_DARK_MODE } from '../common/constant'

const ITEM_HEIGHT = 50

const styles = StyleSheet.create({
  searchBoxOuterContainer: {
    width: '100%',
    zIndex: 9999999,
    paddingHorizontal: '10%',
    backgroundColor: 'black',
    paddingTop: 20
  },
  searchBoxContainer: {
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  searchListContainer: {
    position: 'absolute',
    // top: 118,
    zIndex: 9999999999999999999999999,
    backgroundColor: 'white',
    left: '10%',
    right: '10%',
    // borderBottomWidth: 1,
    borderColor: 'grey',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // overflow: 'hidden'
  },
  itemListsContainer: {
    maxHeight: 240,
    top: 50 + 20,
    zIndex: 99999,
    position: 'absolute',
    left: '0%',
    right: '0%',
    backgroundColor: 'white',
    // overflow: 'hidden',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  searchedList: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'grey',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // zIndex: 9999,
    // height: '100%'
  },
  listItemSeperator: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderLeftWidth: 1,
  },
})

const mainScreen = () => {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  })

  const [markers, setMarkers] = useState([])
  const [searchValue, updateSearchValue ] = useState('')


  const animatedHeightValue: any = useRef(new Animated.Value(1))
  const searchSuggestionViewOpacity: any = useRef(new Animated.Value(0))

  useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'always'
    })
    Geolocation.getCurrentPosition(info => {
      log('getCurrentPositiongetCurrentPosition', info)
      const { coords } = info || {}
      const { latitude, longitude } = coords || {}
      setPosition({
        latitude,
        longitude,
        latitudeDelta:  0.0922,
        longitudeDelta: 0.01
      })
      const markersList = [
        {
          cord: {
            latitude: latitude + 0.003,
            longitude: longitude + 0
          },
          title: 'A',
          description: 'first marker'
        },
        {
          cord: {
            latitude: latitude + 0,
            longitude: longitude + 0.003
          },
          title: 'B',
          description: 'second marker'
        },
        {
          cord: {
            latitude: latitude + 0.003,
            longitude: longitude + 0.003
          },
          title: 'C',
          description: 'third marker'
        }
      ]
      setMarkers(markersList)
    })

  }, [])

  const onRegionChange = (params) => {
    log('onRegionChangeonRegionChange', params)
  }

  const onChangeSearchText = (value) => {
    updateSearchValue(value)
    if (value.length > 3 ) {
      animatedHeightValue.current.setValue(0)
      searchSuggestionViewOpacity.current.setValue(1)
    } else {
      animatedHeightValue.current.setValue(1)
      searchSuggestionViewOpacity.current.setValue(0)
    }
  }

  const renderSearchComponent = () => {
    return (
      <View style={styles.searchBoxContainer}>
        <TextInput
          placeholder='Search Here'
          value= {searchValue}
          onChangeText = {onChangeSearchText}
        />
      </View>

    )
  }

  const renderChapterConceptListItem = (item) => {
    const { name } = item || {}
    return (
      <TouchableOpacity onPress={() => {
        animatedHeightValue.current.setValue(1)
        searchSuggestionViewOpacity.current.setValue(0)
      }}>
        <Text style = {{
          padding: 10
        }}>{name}</Text>
      </TouchableOpacity>
    )
  }


  const renderSearchListView = () => {
    return (
      <FlatList
        // keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        style={styles.searchedList}
        ItemSeparatorComponent={() => <View style={styles.listItemSeperator} />}
        ListFooterComponent={() => <View style={styles.listItemSeperator} />}
        data={DUMMY_DATA}
        renderItem={({ item }) => renderChapterConceptListItem(item)}
        initialNumToRender={11}
        // nestedScrollEnabled={true}
        // keyExtractor={(item, index) => item.key}
        // listKey={'chapterConceptSearchList'}
        // contentContainerStyle = {{
        //   maxHeight: 100
        // }}
      />
    )
  }

  const renderSearchTextBoxContainer = () => {
    return <View style = {{
      zIndex: 9999
    }}>
      <View style={styles.searchBoxOuterContainer}>
        {renderSearchComponent()}
      </View>
      <Animated.View style={[styles.searchListContainer, {
        opacity: searchSuggestionViewOpacity.current,
        transform: [{
          translateY: animatedHeightValue.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -500],
            extrapolate: 'clamp'
          })
        }]
      }]}>
        <View style={styles.itemListsContainer}>
          { renderSearchListView()}
        </View>
      </Animated.View>
    </View >
  }

  const renderToggleModeButton = () => {

  }
  return (
    <View style = {{
      flex: 1

    }}>
      {renderSearchTextBoxContainer()}
      <MapView
        initialRegion = {position}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        loadingEnabled = {true}
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee"
        style = {{
          flex: 1,
          zIndex: -1
        }}
        showsPointsOfInterest = {false}
        onRegionChange = {onRegionChange}
        customMapStyle = {MAP_DARK_MODE}
        region = {position}
      >
        {
          markers.length > 0 && (
            markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.cord}
                title={marker.title}
                description={marker.description}
                style = {{
                  height: 100,
                  width: 100,
                  backgroundColor: 'red'
                }}
              />
            ))
          )
        }
      </MapView>
    </View>
  )
}

export {
  mainScreen as MainScreen
}
