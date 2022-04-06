import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../common'
import { icons } from '../common/icons'
import { CustomText } from './CustomText'
import { IconButtonWrapper } from './IconButtonWrapper'

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userIcon: {
    height: 25,
    width: 25,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: colors.whiteSmock
  },
  serachField: {
    borderWidth: 1,
    flex: 1,
    maxWidth: 150,
    marginLeft: 12,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderColor: colors.borderColor
  }
})

export class HeaderCardComponent extends Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <IconButtonWrapper
              iconImage={icons.SIGN_IN}
              iconHeight={20}
              iconWidth={20}
            />
          </TouchableOpacity>
          <View style={styles.serachField}>
            <IconButtonWrapper
              iconImage={icons.SEARCH_ICON}
              iconHeight={14}
              iconWidth={14}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <IconButtonWrapper
              iconImage={icons.MESSAGE_ICON}
              iconHeight={15}
              iconWidth={15}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 15 }}>
            <IconButtonWrapper
              iconImage={icons.BELL_ICON}
              iconHeight={15}
              iconWidth={15}
            />
          </TouchableOpacity>
          <View style={styles.userIcon}>
            <IconButtonWrapper
              iconImage={icons.PERSON}
              iconHeight={24}
              iconWidth={24}
            />
          </View>
        </View>
      </View>
    )
  }
}
