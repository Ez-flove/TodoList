import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FilterType, Status, Todo, TodosState } from '../types/todo'
import { AppDispatch, RootState } from './store'

const STORAGE_KEY = '@todos'

const initialState: TodosState = {
  items: [],
  filter: Status.ALL,
  searchQuery: ''
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString()
      }
      state.items.unshift(newTodo)
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(item => item.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    markTodoForDeletion: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(item => item.id === action.payload)
      if (todo) {
        todo.isDeleting = true
      }
    },
    undoDeleteTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(item => item.id === action.payload)
      if (todo) {
        todo.isDeleting = false
      }
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    loadTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload
    }
  }
})

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  loadTodos,
  markTodoForDeletion,
  undoDeleteTodo,
  setSearchQuery
} = todoSlice.actions

export const saveTodosToStorage = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const { items } = getState().todos
    const todosToSave = items.filter(item => !item.isDeleting)

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todosToSave))
  } catch (error) {
    console.error('Error saving todos:', error)
  }
}

export const loadTodosFromStorage = () => async (dispatch: AppDispatch) => {
  try {
    const todosJson = await AsyncStorage.getItem(STORAGE_KEY)
    if (todosJson) {
      const todos: Todo[] = JSON.parse(todosJson)
      const cleanTodos = todos.map(todo => ({ ...todo, isDeleting: false }))
      dispatch(loadTodos(cleanTodos))
    }
  } catch (error) {
    console.error('Error loading todos:', error)
  }
}

export default todoSlice.reducer
