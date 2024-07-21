import { View, Text, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MessageList from '../../components/chatComponents/MessageList';
import ChatInput from '../../components/chatComponents/ChatInput';
import CustomKeyboardView from "../../components/CustomKeyboardView"
import {useAuth} from "../../context/authContext"
import { getRoomId } from '../../utils/common';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ChatRoom() {
    const item = useLocalSearchParams(); // user with whom we'll chat
    const { user } = useAuth()
    const router = useRouter()
    const [messages, setMessages] = useState([])
    const textRef = useRef('');
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null)

    useEffect(()=> {
        CreateChatRoomIfNotExists()
        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        
        const q = query(messagesRef, orderBy('createdAt', 'asc'));
        // make a snapshot based on messages collection

        let unsub = onSnapshot(q, (snapshot)=> {
            let allMessages = snapshot.docs.map(doc => doc.data())
            setMessages([...allMessages])
        })

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', updateScrollViewToBottom)

        return ()=> {
            unsub();
            keyboardDidShowListener.remove(); // unmouting the keyboard open and scroll listener
        }
    }, [])

    async function CreateChatRoomIfNotExists() {
        let roomId = getRoomId(user?.userId, item?.userId);

        await setDoc(doc(db, "rooms", roomId), {
            roomId, 
            createdAt: Timestamp.fromDate(new Date())
        })
    } 

    function updateScrollViewToBottom() { // to scroll to bottom whenever messages do update
        setTimeout(()=> {
            scrollViewRef?.current?.scrollToEnd({animated: true})
        }, 300)
    }

    useEffect(()=> {
        updateScrollViewToBottom()
    }, [messages])

    async function handleSendMessage(){
        let message = textRef.current.trim();
        if(!message) return;
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, "rooms", roomId);
            const messagesRef = collection(docRef, "messages") // firebase allows you to have collections inside each document
            textRef.current = "";
            inputRef?.current?.clear();
            const newDoc = await addDoc(messagesRef, { // inside the document we're having collection of messages 
                userId: user?.userId,
                text: message,
                senderName: user?.userName,
                receiverName: item?.userName,
                seen: false,
                createdAt: Timestamp.fromDate(new Date()) 
            })

            // console.log(' new msg ', newDoc.id)
        } catch (err) {
            Alert.alert('Error', err.message)
        }
    }

  return (
    <CustomKeyboardView inChat={true}>
        <View className="flex-1 bg-white">
            <StatusBar style='dark' />
            <ChatRoomHeader user={item} router={router} />
            <View className="h-2 border-b border-neutral-200" />
            <View className="messages-background bg-neutral-100 overflow-visible flex-1">
                <View className="flex-1">
                    {messages?.length > 0 ? <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser = {user } /> : <View className="flex-1 justify-center items-center"><Text className="">No message history with {item?.userName}</Text></View>}
                </View>
                <View className="pt-2 input-field" style={{marginBottom: hp(3)}}>
                    <View className="flex flex-row gap-3 justify-center items-center rounded-full mx-10 w-10/12">
                        <TextInput 
                            ref={inputRef }
                            onChangeText={value => textRef.current = value}
                            placeholder='Enter a message...'
                            spellCheck={false}
                            style={{fontSize: hp(2)}}
                            className="border p-4 border-neutral-300 rounded-full w-full"
                        />
                        <TouchableOpacity onPress={()=> handleSendMessage()}>
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