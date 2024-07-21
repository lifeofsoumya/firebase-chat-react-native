import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ChatList({ users, currentUser }) {
  const router = useRouter(); // declaring router here and passing it - bcz everytime router everytime chatItem renders it'll declare router
  return (
    <View className="">
      <FlatList 
        data={users}
        contentContainerStyle={{ paddingVertical: 5}}
        keyExtractor={item => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index})=> <ChatItem currentUser={currentUser} item={item} noBorder={index === users.length - 1} router={router} />}
        className="h-screen"
      />
    </View>
  )
}

const ChatItem = ({item, noBorder, router, currentUser}) => {

  const [lastMessage, setLastMessage] = useState(undefined);

  useEffect(()=> {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    let unsub = onSnapshot(q, (snapshot)=> {
        let allMessages = snapshot.docs.map(doc => doc.data())
        console.log(allMessages[0], 'all tmesssages')
        setLastMessage(allMessages[0] ? allMessages[0] : null);
    })
    console.log(lastMessage, 'lastmesssages')
    return unsub 
}, [])

  const openChatRoom = () => {
    router.push({pathname: '/chatRoom', params: item})
  }

  function renderLastMsg() {
    if (lastMessage === undefined) {
      return 'Loading...';
    } else if (lastMessage) {
      return currentUser?.userId === lastMessage?.userId ? "You: " + lastMessage?.text : lastMessage?.text;
    } else {
      return 'Say hi 👋';
    }
  }
  function renderLastMsgTime(){
    return '8:00'
  }
  return (
    <TouchableOpacity
      onPress={openChatRoom}
      className={`flex flex-row justify-between mx-4 gap-4 items-center my-3 pb-4 ${!noBorder ? 'border-b border-b-neutral-200' : ''} `}
    >
      <View className="flex flex-row gap-3 items-center justify-center">
        <Ionicons name="chatbox-ellipses-outline" size={28} color="gray" />
        <View>
          <Text className="font-semibold">{item.userName}</Text>
          <Text className="font-light">{String(renderLastMsg()).substring(0, 26)}</Text>
        </View>
      </View>
      <Text>{renderLastMsgTime()}</Text>
    </TouchableOpacity>
  )
}