import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, useSegments, useRouter } from 'expo-router'
import "../global.css"
import { AuthContextProvider, useAuth } from '../context/authContext'
import { MenuProvider } from 'react-native-popup-menu'

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
            <Slot />
        </View>)
}

export default function index() {
  return (
    <MenuProvider>
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    </MenuProvider>
  )
}

