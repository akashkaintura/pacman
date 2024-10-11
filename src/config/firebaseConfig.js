import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAfHdy7Y6dQb-ybBImLxq0ZoktAC68KWCE",
    authDomain: "akash-pacman.firebaseapp.com",
    projectId: "akash-pacman",
    storageBucket: "akash-pacman.appspot.com",
    messagingSenderId: "726007465089",
    appId: "1:726007465089:web:0cb224f9c6869678723980",
    measurementId: "G-QZB0RDXYL5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export { auth, db, googleProvider, appleProvider };
