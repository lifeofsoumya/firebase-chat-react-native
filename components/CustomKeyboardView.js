import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'

const ios = Platform.OS=='ios'

export default function CustomKeyboardView( {children, inChat} ) {
  let kBAViewConfig = {}
  let sViewConfig = {};
  if(inChat){
    kBAViewConfig= {keyboardVerticalOffset: 90}
    sViewConfig= {contentContainerStyle: {flex: 1}}
  }
  return (
    <KeyboardAvoidingView
        behavior={ios ? 'padding' : 'height '}
        style={{flex: 1}}
        {...kBAViewConfig}
    >
        <ScrollView
            style={{flex: 1}}
            bounces={false}
            showsVerticalScrollIndicator={false}
            {...sViewConfig}
        >
            {children}
        </ScrollView>
    </KeyboardAvoidingView>
  )
}