import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, useSegments, useRouter } from 'expo-router'
import "../global.css"
import { AuthContextProvider, useAuth } from '../context/authContext'
import { MaterialIcons } from '@expo/vector-icons';

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments()
    const router = useRouter()

    useEffect(()=> {
        if(typeof isAuthenticated == 'undefined') return;
        const inApp = segments[0]=='(app)'; // if the user is in app group or not
        if(isAuthenticated && !inApp){
            router.replace('home') // if authed but not in private groups, send user there
        } else if(isAuthenticated == false) router.replace('signin')
    }, [isAuthenticated])

    return (<View className="flex-1">
            <View className="bg-indigo-500 pt-16 pb-4 px-4 flex flex-row justify-between">
                <Text className="text-xl text-white font-bold">OCode.dev</Text> 
                <TouchableOpacity onPress={()=> router.replace('signin')}>
                    <MaterialIcons name="account-circle" size={24} color="white" />
                </TouchableOpacity>
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

