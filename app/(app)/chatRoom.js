import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MessageList from '../../components/chatComponents/MessageList';
import ChatInput from '../../components/chatComponents/ChatInput';
import CustomKeyboardView from "../../components/CustomKeyboardView"

export default function ChatRoom() {
    const item = useLocalSearchParams();
    const router = useRouter()
    const [messages, setMessages] = useState([])
  return (
    <CustomKeyboardView inChat={true}>
        <View className="flex-1 bg-white">
            <StatusBar style='dark' />
            <ChatRoomHeader user={item} router={router} />
            <View className="h-2 border-b border-neutral-200" />
            <View className="messages-background bg-neutral-100 overflow-visible flex-1">
                <View className="flex-1">
                    <MessageList messages={messages} />
                </View>
                <View className="pt-2 input-field" style={{marginBottom: hp(3)}}>
                    <View className="flex flex-row gap-3 justify-center items-center rounded-full mx-10 w-10/12">
                        <TextInput 
                            placeholder='Enter a message...'
                            spellCheck={false}
                            style={{fontSize: hp(2)}}
                            className="border p-4 border-neutral-300 rounded-full w-full"
                        />
                        <TouchableOpacity onPress={()=> Alert.alert('boom', 'boom')}>
                            <Ionicons name="send" size={32} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </CustomKeyboardView>
  )
}

const ChatRoomHeader = ({ user, router }) => {
    return (<Stack.Screen 
            options={{
                title: user.userName,
                headerShadowVisible: false,
                headerLeft: () => <View>
                    <TouchableOpacity onPress={()=> router.back()}>
                        <Entypo name="chevron-left" size={hp(3.3)} color="gray" />
                    </TouchableOpacity>
                </View>,
                headerRight: () => <View>
                    <MaterialIcons name="call" size={24} color="gray" />
                </View>
            }} />
        )
}