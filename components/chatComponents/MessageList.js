import { View, Text, ScrollView } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React from 'react'

export default function  MessageList({messages, currentUser, scrollViewRef}) {
  return (
    <ScrollView ref={scrollViewRef } showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop: 10}}>
      {messages.map((message, index)=> {
        return <MessageItem key={index} message={message} currentUser={currentUser}/>
      })}
    </ScrollView>
  )
}

const MessageItem = ({message, currentUser}) => {
    if(currentUser?.userId == message?.userId){
        return (
            <View className="flex justify-end mb-3 mr-5"> 
                <View style={{maxWidth: wp(80)}} className="flex self-end bg-white border border-neutral-200/70 py-3 px-5 rounded-t-xl rounded-bl-xl">
                    <Text className="text-black" style={{fontSize: hp(1.87)}}>{message?.text}</Text>
                </View>
            </View>
        )
    } else {
        return (
            <View className="flex justify-start mb-3 ml-5"> 
                <View style={{maxWidth: wp(80)}} className="flex self-start bg-indigo-100 border border-neutral-200/70 py-3 px-5 rounded-t-xl rounded-br-xl">
                    <Text className="text-zinc-900" style={{fontSize: hp(1.87)}}>{message?.text}</Text>
                </View>
            </View>
        )
    }
}