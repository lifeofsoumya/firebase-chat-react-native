import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useContext, useState } from "react";
import { auth, db } from "../firebaseConfig";
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
                updateUserData(user?.uid)
            }
            else setIsAuthenticated(false)
        })
        return unSub
    }, [])

    const updateUserData = async(userId) => {
        const userDataRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDataRef)

        if(userDocSnapshot.exists()){
            let data = userDocSnapshot.data();
            setUser({...user, userName: data.userName, userId: data.userId, email: data.email})
        }
    }

    const login = async(email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            return { success: true }
        } catch (error) {
            if(error.message == 'Firebase: Error (auth/invalid-email).') return { success: false, message: "Enter valid email"}
            if(error.message == 'Firebase: Error (auth/invalid-credential).') return { success: false, message: "Invalid credential"}
            return { success: false, message: error.message }
        }
    }

    const logOut = async() => {
        try {
            await signOut(auth)
            setIsAuthenticated(undefined);
            setUser(null)
            return { success: true }
        } catch (error) {
            return { success: false, message: error.message}
        }
    }

    const register = async(email, password, userName, profilePic) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password) 
            console.log('res user', res?.user)

            await setDoc(doc(db, "users", res?.user?.uid), {
                userName,
                email,
                userId: res?.user?.uid
            })
            return { success: true, data: res?.user}
        } catch (error) {
            if(error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') return { success: false, message: "Password should be at least 6 characters"}
            if(error.message == 'Firebase: Error (auth/invalid-email).') return { success: false, message: "Enter valid email"}
            if(error.message == 'Firebase: Error (auth/email-already-in-use).') return { success: false, message: "Email already in use"}
            return { success: false, message: error.message}
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout: logOut, register}}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);
    if(!value) throw new Error("useAuth must be wrapped inside AuthContextProvider")
    return value;
}