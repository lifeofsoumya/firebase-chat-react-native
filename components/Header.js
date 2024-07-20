import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'
import { useAuth } from '../context/authContext';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

export default function Header() {
    const router = useRouter();
    const { logout, user } = useAuth();
    const handleLogout = async (e) => {
        await logout()
      }
    return (
        <View className="bg-indigo-500 pt-16 pb-4 px-4 flex flex-row justify-between">
            <Text className="text-xl text-white font-bold">Chats</Text>
            <Menu className="">
                <MenuTrigger>
                    <MaterialIcons name="account-circle" size={24} color="white" />
                </MenuTrigger>
                <MenuOptions
                    customStyles={{
                        optionsContainer: {
                            borderRadius: 25,
                            borderCurve: 'continuous',
                            padding: 4,
                            marginTop: 30,
                            marginLeft: -10,
                            shadowOpacity: 0.1,
                            backgroundColor: 'white'
                        }
                    }}
                >
                    <Text className="text-zinc-600 px-2 pt-3 text-center text-lg">Hi, {user?.userName}</Text>
                    <CustomMenuOption text="Profile" icon={<Feather name="user" size={22} color="gray" />} />
                    <CustomMenuOption action={()=> router.replace('signin')} text="Sign in" />
                    <CustomMenuOption action={()=> handleLogout()} text="Log out" icon={<MaterialCommunityIcons name="logout" size={24} color="gray" />} customTextClass="text-red-600" />
                    <CustomMenuOption disabled={true} action={()=> handleLogout} text="Delete Account" customTextClass="text-red-300" />
                </MenuOptions>
            </Menu>
        </View>
    )
}

const CustomMenuOption  = ({text, action, value, icon, disabled, customTextClass }) => {
    return (
        <MenuOption
            onSelect={action}
            disabled={disabled}
        >
            <View className="flex flex-row justify-between px-3 py-1 items-center">
                <Text className={customTextClass}>{text}</Text>
                {icon ?? <AntDesign name="rightcircleo" size={22} color="gray" />}
            </View>
        </MenuOption>
    )
}