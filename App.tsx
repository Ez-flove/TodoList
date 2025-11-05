import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import HomeScreen from './src/screens/HomeScreen'
import store from './src/store/store'

function AppContent() {
  const insets = useSafeAreaInsets()

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>My Todo List</Text>
      </View>
      <HomeScreen />
    </GestureHandlerRootView>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  }
})
