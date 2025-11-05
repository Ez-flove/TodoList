import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { ReactElement } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ICON_COLOR, ICON_SIZE } from '../const/utils'
import { FilterType, Status } from '../types/todo'

interface EmptyStateProps {
  filter: FilterType
  hasSearchQuery?: boolean
}

interface EmptyMessage {
  emoji: ReactElement
  title: string
  subtitle: string
}

const EmptyState = ({ filter }: EmptyStateProps) => {
  const getMessage = (): EmptyMessage => {
    switch (filter) {
      case Status.ACTIVE:
        return {
          emoji: <MaterialIcons name='done-all' size={ICON_SIZE} color={ICON_COLOR} />,
          title: 'No tasks!',
          subtitle: 'You’ve completed all your work.'
        }
      case Status.DONE:
        return {
          emoji: <FontAwesome5 name='clipboard-list' size={ICON_SIZE} color={ICON_COLOR} />,
          title: 'No completed tasks yet',
          subtitle: 'Start getting things done!'
        }
      default:
        return {
          emoji: <MaterialIcons name='list-alt' size={ICON_SIZE} color={ICON_COLOR} />,
          title: 'No todos yet',
          subtitle: 'Add your first todo above.'
        }
    }
  }

  const { emoji, title, subtitle } = getMessage()

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
  }
})

export default EmptyState
