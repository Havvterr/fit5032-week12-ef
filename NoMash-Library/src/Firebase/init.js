// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCb0h0TVx67K2j_urrMUm5x8-Eq3Zqqcco',
  authDomain: 'week7-zehui-zhang.firebaseapp.com',
  projectId: 'week7-zehui-zhang',
  storageBucket: 'week7-zehui-zhang.appspot.com',
  messagingSenderId: '1009190896499',
  appId: '1:1009190896499:web:eb1f83ae920bbc0ec4bb06'
}

// Initialize Firebase
initializeApp(firebaseConfig)

const db = getFirestore()
export default db
