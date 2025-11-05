import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFilter } from '../store/todoSlice'
import { FilterType, Status } from '../types/todo'

interface Tab {
  key: FilterType
  label: string
}

const FilterTabs = () => {
  const filter = useAppSelector(state => state.todos.filter)
  const dispatch = useAppDispatch()

  const tabs: Tab[] = [
    { key: Status.ALL, label: 'All' },
    { key: Status.ACTIVE, label: 'Active' },
    { key: Status.DONE, label: 'Done' }
  ]

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, filter === tab.key && styles.tabActive]}
          onPress={() => dispatch(setFilter(tab.key))}
        >
          <Text style={[styles.tabText, filter === tab.key && styles.tabTextActive]}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  tabActive: {
    borderBottomColor: '#007AFF'
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500'
  },
  tabTextActive: {
    color: '#007AFF',
    fontWeight: '600'
  }
})

export default FilterTabs
