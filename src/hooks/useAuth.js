import { useState, useEffect } from 'react';
import { appleProvider, auth, googleProvider } from '../config/firebaseConfig';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
    const loginWithApple = () => signInWithPopup(auth, appleProvider);
    const logout = () => auth.signOut();

    return { user, loginWithGoogle, loginWithApple, logout };
};

export default useAuth;
