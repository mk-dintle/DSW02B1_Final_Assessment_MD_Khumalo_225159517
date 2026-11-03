import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// config copied from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyAh65gb7iJlR-e8yF71J0biIXMmdYlKw9c",
  authDomain: "clinic-bookings-14ea4.firebaseapp.com",
  projectId: "clinic-bookings-14ea4",
  storageBucket: "clinic-bookings-14ea4.firebasestorage.app",
  messagingSenderId: "283227182869",
  appId: "1:283227182869:web:2015a18f40afa25cb1bb1c"
};

const app = initializeApp(firebaseConfig);

// web uses normal auth, phones keep the session with AsyncStorage
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };
export const db = getFirestore(app);