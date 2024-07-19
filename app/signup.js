import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Octicons, Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router"
import Loader from '../components/Loader';
import CustomKeyboardView from '../components/CustomKeyboardView';

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const usernameRef = useRef(null)
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleRegister = async()=> {
        if(!emailRef.current || !passwordRef.current || !usernameRef.current) return Alert.alert('Unable to proceed', 'Please fill all the fields')
        setLoading(true);
    }

  return (
    <CustomKeyboardView>
        <StatusBar style='dark' />
        <View className="flex-1 gap-10" style={{paddingTop: hp(6), paddingHorizontal: hp(4)}}>
            <View className="items-center">
                <Image source={require('../assets/images/signin_image.png')} style={{height: hp(25), width: wp(70) }} />
            </View>
            <View className="flex-1 gap-4">
                {/* <Text className="text-center font-bold text-indigo-400 pb-4" style={{fontSize: hp(2)}}>Sign in</Text> */}
                <View className="flex flex-row gap-5 items-center bg-neutral-100 px-4 py-5 rounded-xl">
                    <Feather name="user" size={hp(2.4)} color="gray" />
                    <TextInput
                        onChangeText={value=> usernameRef.current=value}
                        style={{fontSize: hp(2)}}
                        className="flex-1 font-semibold text-neutral-600"
                        placeholder='Username'
                        placeholderTextColor={"gray"}
                    />
                </View>
                <View className="flex flex-row gap-5 items-center bg-neutral-100 px-4 py-5 rounded-xl">
                    <Octicons name="mail" size={hp(2.4)} color="gray" />
                    <TextInput
                        onChangeText={value=> emailRef.current=value}
                        style={{fontSize: hp(2)}}
                        className="flex-1 font-semibold text-neutral-600"
                        placeholder='Email address'
                        placeholderTextColor={"gray"}
                    />
                </View>
                <View className="flex flex-row gap-5 items-center bg-neutral-100 px-4 py-5 rounded-xl">
                    <Feather name="lock" size={hp(2.4)} color="gray" />
                    <TextInput
                        onChangeText={value=> passwordRef.current=value}
                        style={{fontSize: hp(2)}}
                        className="flex-1 font-semibold text-neutral-600"
                        placeholder='Password'
                        placeholderTextColor={"gray"}
                        secureTextEntry={true}
                    />
                </View>
                
                {loading ? <View className="flex items-center"><Loader size={hp(8)} /></View> : 
                <TouchableOpacity onPress={handleRegister} className="bg-indigo-500 py-4 rounded-xl mt-5">
                    <Text className="text-white font-bold text-center" style={{fontSize: hp(2.4)}}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
                }
                <View className="flex justify-center flex-row">
                    <Text>Already have an account? </Text>
                    <Pressable onPress={()=> router.push('signin')}>
                        <Text className="font-bold text-indigo-500">Sign in</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </CustomKeyboardView>
  )
}