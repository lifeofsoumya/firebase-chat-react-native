import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from 'firebase/firestore';
import Config from "react-native-config";
// const {EXPO_API_KEY, EXPO_AUTH_DOMAIN, EXPO_PROJECT_ID, EXPO_STORAGE_BUCKET, EXPO_MESSAGING_SENDER_ID, EXPO_APP_ID } = Config

const firebaseConfig = {
    apiKey: Config.EXPO_API_KEY,
    authDomain: Config.EXPO_AUTH_DOMAIN,
    projectId: Config.EXPO_PROJECT_ID,
    storageBucket: Config.EXPO_STORAGE_BUCKET,
    messagingSenderId: Config.EXPO_MESSAGING_SENDER_ID,
    appId: Config.EXPO_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app)

export const db = getFirestore(app);

export const userRef = collection(app, 'users')
export const roomRef = collection(app, 'rooms')

