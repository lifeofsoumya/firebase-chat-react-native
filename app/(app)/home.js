import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function home() {
  const { logout, user } = useAuth();
  const handleLogout = async (e) => {
    await logout()
  }
  return (
    <View> 
      <Text>Protected Route</Text>
      <Text>{user?.userName}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}