import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, useSegments } from 'expo-router'
import "../global.css"
import { AuthContextProvider, useAuth } from '../context/authContext'

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments()

    useEffect(()=> {

    }, [isAuthenticated])

    return (<View className="flex-1">
            <View className="bg-indigo-500 pt-16 pb-4 px-4">
                <Text className="text-center text-xl text-white font-bold">OCode.dev</Text>
            </View>
            <Slot />
        </View>)
}

export default function index() {
  return (
    <AuthContextProvider>
        <MainLayout />
    </AuthContextProvider>
  )
}

