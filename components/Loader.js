import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

export default function Loader({size}) {
  return (
    <View style={{height: size, aspectRatio: 1}}>
      <LottieView source={require('../assets/static/lottie-loader.json')} style={{flex: 1}} autoPlay loop />
    </View>
  )
}