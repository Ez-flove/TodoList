import { Feather, FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { ICON_COLOR } from '../const/utils'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setSearchQuery } from '../store/todoSlice'

const SearchBar: React.FC = () => {
  const searchQuery = useAppSelector(state => state.todos.searchQuery)
  const dispatch = useAppDispatch()

  const handleClear = (): void => {
    dispatch(setSearchQuery(''))
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>
          <FontAwesome name='search' size={16} color={ICON_COLOR} />
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Search todo...'
          value={searchQuery}
          onChangeText={text => dispatch(setSearchQuery(text))}
          placeholderTextColor='#999'
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearText}>
              <Feather name='x' size={16} color={ICON_COLOR} />
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0
  },
  clearButton: {
    padding: 4,
    marginLeft: 8
  },
  clearText: {
    fontSize: 18,
    color: '#999',
    fontWeight: 'bold'
  }
})

export default SearchBar
