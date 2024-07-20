import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import Header from '../../components/Header'

export default function index() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          header: ()=> <Header />
        }}
      />

    </Stack>
  )
}

