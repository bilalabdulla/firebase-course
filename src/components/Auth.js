import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { useState } from "react"
import { auth, googleProvider } from "../config/firebase"


export const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err)
        }
        
    }
    const signInGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.error(err)
        }
    }
    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="password" type="password" 
            onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={signIn}>Sign in</button>
            <button onClick={signInGoogle}> Sign in google</button>
            <button onClick={logOut}>Log out</button>
        </div>
    )
}