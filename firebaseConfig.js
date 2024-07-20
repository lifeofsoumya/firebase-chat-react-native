import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from 'firebase/firestore';
import Config from "react-native-config";
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import { localFirebaseConfig } from "./constants/localConfig";
// const {EXPO_API_KEY, EXPO_AUTH_DOMAIN, EXPO_PROJECT_ID, EXPO_STORAGE_BUCKET, EXPO_MESSAGING_SENDER_ID, EXPO_APP_ID } = Config

const firebaseConfig = localFirebaseConfig // find the same in https://console.firebase.google.com/u/0/project
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');

