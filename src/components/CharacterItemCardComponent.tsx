import React, { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../common'
import { CARD_HEIGHT } from '../common/constant'
import { ICharacterData } from '../common/Interfaces'
import { log } from '../config'
import { ImageWithLoaderComponent } from './ImageWithLoaderComponent'

interface IProps {
  characterItem: ICharacterData
  onPressCard?: (characterData) => void
}

const styles = StyleSheet.create({
  imgContainer: {
    // width: 150,
    height: CARD_HEIGHT - 2,
    overflow: 'hidden',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: 'transparent',
    flex: 4
    // borderRadius: 5
  },
  cardContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: colors.lightBlack,
    borderRadius: 5,
    borderColor: 'transparent',
    overflow: 'hidden',
    flex: 10,
    height: CARD_HEIGHT
  },
  infoContainer: {
    padding: 5,
    paddingHorizontal: 10,
    flex: 7
  },
  nameLabel: {
    fontSize: 20,
    color: '#f5f5f5',
    width: '100%',
    // flexWrap: 'wrap',
    // flexShrink: 1,
    // flex: 1
  },
  content: {
    fontSize: 16,
    color: colors.white
  },
  small: {
    fontSize: 14,
    color: '#f5f5f5'
  },
  locationHeading: {
    fontSize: 16,
    color: '#9e9e9e'
  }
})

const characterItemCardComponent = (props: IProps) => {
  log('CharacterItemCardComponentCharacterItemCardComponent', props)
  const { characterItem, onPressCard } = props
  const renderCharacterIcon = () => {
    const { image } = characterItem as ICharacterData || {}
    return (
      <View style = {styles.imgContainer}>
        <ImageWithLoaderComponent
          srcImage={image}
        />
      </View>
    )
  }

  const renderCharacterNameAndStatus = () => {
    const { name, species, status, gender, location } = characterItem as ICharacterData || {}
    return (
      <View style = {{
        justifyContent: 'space-between',
        flex: 1,
      }}>
        <View style = {{
          // flex: 1
        }}>
          <Text style = {styles.nameLabel} numberOfLines = {1} ellipsizeMode = {'tail'}>
            {name}
          </Text>
          <Text style = {styles.content}>
            {status} - {species}
          </Text>
          <Text style = {styles.small}>
          Gender - {gender}
          </Text>
        </View>
        <View>
          <Text style = {styles.locationHeading}>
          Last known location:
          </Text>
          <Text style = {styles.small}>
            {location?.name}
          </Text>
        </View>
      </View>
    )
  }

  const renderCharacterInfo = () => {
    return (
      <View style = {styles.infoContainer}>
        {renderCharacterNameAndStatus()}
      </View>
    )
  }

  return (
    <TouchableOpacity style = {styles.cardContainer} onPress = {() => onPressCard(characterItem)}>
      {renderCharacterIcon()}
      {renderCharacterInfo()}
    </TouchableOpacity>
  )
}

const arePropsEqual = (prevProps, currentProps) => {
  log('arePropsEqualarePropsEqual', prevProps, currentProps)
  return prevProps.characterItem.id === currentProps.characterItem.id
}

const CharacterItemCardComponent = memo(characterItemCardComponent, arePropsEqual)

export {
  CharacterItemCardComponent
}
