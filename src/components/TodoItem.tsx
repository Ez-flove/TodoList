import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import { DELETION_DELAY, SWIPE_THRESHOLD } from '../const/utils'
import { useAppDispatch } from '../store/hooks'
import { deleteTodo, markTodoForDeletion, toggleTodo, undoDeleteTodo } from '../store/todoSlice'
import { Todo } from '../types/todo'

interface TodoItemProps {
  item: Todo
}

const TodoItem = ({ item }: TodoItemProps) => {
  const dispatch = useAppDispatch()
  const translateX = useRef(new Animated.Value(0)).current
  const undoTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [countdown, setCountdown] = useState<number>(DELETION_DELAY)

  const handleToggle = (): void => {
    if (item.isDeleting) return
    dispatch(toggleTodo(item.id))
  }

  const handleDelete = (): void => {
    if (item.isDeleting) return
    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current)

    dispatch(markTodoForDeletion(item.id))

    translateX.setValue(0)
    setCountdown(DELETION_DELAY)

    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
        }

        return prev - 1
      })
    }, 1000)

    undoTimeoutRef.current = setTimeout(() => {
      dispatch(deleteTodo(item.id))
    }, DELETION_DELAY * 1000)
  }

  const handleUndo = (): void => {
    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current)
      undoTimeoutRef.current = null
    }

    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
      countdownIntervalRef.current = null
    }

    dispatch(undoDeleteTodo(item.id))
    setCountdown(DELETION_DELAY)
  }

  useEffect(() => {
    return () => {
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current)
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [])

  const panGesture = Gesture.Pan()
    .enabled(!item.isDeleting)
    .onChange(event => {
      if (event.translationX < 0) {
        translateX.setValue(event.translationX)
      }
    })
    .onEnd(event => {
      if (event.translationX < -SWIPE_THRESHOLD && !item.isDeleting) {
        handleDelete()
      } else if (!item.isDeleting) {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          damping: 7,
          stiffness: 100
        }).start()
      }
    })

  if (item.isDeleting) {
    return (
      <View style={[styles.container, styles.deletingContainer]}>
        <Text style={styles.undoText}>Deleting in {countdown}s...</Text>
        <TouchableOpacity onPress={handleUndo} style={styles.undoButton}>
          <Text style={styles.undoButtonText}>Undo</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
        <TouchableOpacity style={styles.checkbox} onPress={handleToggle}>
          <View style={[styles.checkboxInner, item.completed && styles.checkboxChecked]}>
            {item.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textContainer} onPress={handleToggle}>
          <Text style={[styles.text, item.completed && styles.textCompleted]}>{item.text}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <MaterialIcons name='delete' size={24} color='#8b8e92ff' />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  deletingContainer: {
    backgroundColor: '#ffebee'
  },
  checkbox: {
    marginRight: 12
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxChecked: {
    backgroundColor: '#007AFF'
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  textContainer: {
    flex: 1
  },
  text: {
    fontSize: 16,
    color: '#333'
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#999'
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8
  },
  undoText: {
    fontSize: 16,
    color: '#d32f2f',
    flex: 1
  },
  undoButton: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6
  },
  undoButtonText: {
    color: '#fff',
    fontWeight: '600'
  }
})

export default TodoItem
