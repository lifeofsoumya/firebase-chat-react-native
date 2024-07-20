import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'

export default function Header() {
    const router = useRouter();
  return (
    <View className="bg-indigo-500 pt-16 pb-4 px-4 flex flex-row justify-between">
        <Text className="text-xl text-white font-bold">OCode.dev</Text> 
        <TouchableOpacity onPress={()=> router.replace('signin')}>
            <MaterialIcons name="account-circle" size={24} color="white" />
        </TouchableOpacity>
    </View>
  )
}