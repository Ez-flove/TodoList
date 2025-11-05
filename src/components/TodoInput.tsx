import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { useAppDispatch } from '../store/hooks'
import { addTodo } from '../store/todoSlice'

const TodoInput = () => {
  const [text, setText] = useState<string>('')
  const dispatch = useAppDispatch()

  const handleAdd = (): void => {
    const trimmedText = text.trim()

    if (!trimmedText) {
      Alert.alert('Error', 'Please enter a todo item!')

      return
    }

    dispatch(addTodo(trimmedText))
    setText('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Enter a new todo...'
        value={text}
        onChangeText={setText}
        returnKeyType='done'
        multiline={true}
        textAlignVertical='top'
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 16,
    paddingVertical: 10,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})

export default TodoInput
