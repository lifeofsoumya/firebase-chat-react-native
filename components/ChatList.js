import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

export default function ChatList({ users }) {
  const router = useRouter(); // declaring router here and passing it - bcz everytime router everytime chatItem renders it'll declare router
  return (
    <View className="">
      <FlatList 
        data={users}
        contentContainerStyle={{ paddingVertical: 5}}
        keyExtractor={item => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index})=> <ChatItem item={item} noBorder={index === users.length - 1} router={router} />}

      />
    </View>
  )
}

const ChatItem = ({item, noBorder, router}) => {
  const openChatRoom = () => {
    router.push({pathname: '/chatRoom', params: item})
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
          <Text className="font-light">{String('Last Message from Soumya Mondal ').substring(0, 26)}</Text>
        </View>
      </View>
      <Text>8:00</Text>
    </TouchableOpacity>
  )
}