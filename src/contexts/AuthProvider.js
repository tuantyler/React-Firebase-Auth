import React, {useState, useEffect} from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuthContext(){
    return React.useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])
    
    function signUp(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function logout() {
        return auth.signOut()
    }
    return (
        <AuthContext.Provider value={{currentUser, signUp , login, logout, resetPassword, updateEmail, updatePassword}}>
            {children}
        </AuthContext.Provider>
    )
}
