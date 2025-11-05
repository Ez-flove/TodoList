import { useCallback, useEffect, useState } from 'react'
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, View } from 'react-native'

import EmptyState from '../components/EmptyState'
import FilterTabs from '../components/FilterTabs'
import SearchBar from '../components/SearchBar'
import TodoInput from '../components/TodoInput'
import TodoItem from '../components/TodoItem'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loadTodosFromStorage } from '../store/todoSlice'
import { Status, Todo } from '../types/todo'

const HomeScreen = () => {
  const dispatch = useAppDispatch()
  const { items, filter, searchQuery } = useAppSelector(state => state.todos)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  useEffect(() => {
    dispatch(loadTodosFromStorage())
  }, [dispatch])

  const getFilteredTodos = (): Todo[] => {
    let filtered: Todo[]
    switch (filter) {
      case Status.ACTIVE:
        filtered = items.filter(item => !item.completed)
        break
      case Status.DONE:
        filtered = items.filter(item => item.completed)
        break
      default:
        filtered = items
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item => item.text.toLowerCase().includes(query))
    }

    return filtered
  }

  const filteredTodos = getFilteredTodos()

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await dispatch(loadTodosFromStorage())
    setTimeout(() => setRefreshing(false), 500)
  }, [dispatch])

  const renderItem: ListRenderItem<Todo> = ({ item }) => <TodoItem item={item} />

  const keyExtractor = (item: Todo): string => item.id

  return (
    <View style={styles.container}>
      <TodoInput />
      <SearchBar />
      <FilterTabs />
      <FlatList
        data={filteredTodos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyState filter={filter} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  list: {
    flex: 1
  }
})

export default HomeScreen
