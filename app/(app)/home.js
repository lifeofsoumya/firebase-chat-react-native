import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import ChatList from "../../components/ChatList"
import Loader from '../../components/Loader';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';

export default function Home() {
  const { logout, user } = useAuth();
  const [ users, setUsers ] = useState([])

  async function getUsers(){
    console.log('inside get users')
    const q = query(usersRef, where("userId", "!=", user?.uid));
    const querySnapShot = await getDocs(q);
    let data = [];
    querySnapShot.forEach(doc => {
      data.push({...doc.data()})
    })
    setUsers(data);
  }

  useEffect(()=> {
    if(user?.uid){
      getUsers();
    }
  }, [user])

  return (
    <View> 
      <StatusBar style='light' />
      {
        users.length > 0 ? (
            <ChatList users={users} currentUser={user}/>
        ) : (
          <View className="flex-1 items-center" style={{top: hp(30)}}>
            <Loader size={hp(10)} />
          </View>
        )
      }
    </View>
  )
}