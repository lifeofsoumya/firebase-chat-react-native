import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useContext, useState } from "react";
import { auth } from "../firebaseConfig";
import { getDoc, setDoc, doc } from "firebase/firestore";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(()=> {
        const unSub = onAuthStateChanged(auth, (user)=> {
            if(user) {
                setIsAuthenticated(true);
                setUser(user)
            }
            else setIsAuthenticated(false)
        })
        return unSub
    }, [])

    const login = async(email, password) => {
        try {
            
        } catch (error) {
            
        }
    }

    const logOut = async() => {
        try {
            
        } catch (error) {
            
        }
    }

    const register = async(email, password, name, profilePic) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password) 
            console.log('res user', res?.user)
        } catch (error) {
            
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logOut, register}}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);
    if(!value) throw new Error("useAuth must be wrapped inside AuthContextProvider")
    return value;
}