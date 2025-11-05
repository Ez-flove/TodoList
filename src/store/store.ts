import { configureStore } from '@reduxjs/toolkit'

import todoReducer, { saveTodosToStorage } from './todoSlice'

const store = configureStore({
  reducer: {
    todos: todoReducer
  }
})

store.subscribe(() => {
  store.dispatch(saveTodosToStorage())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
