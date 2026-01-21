"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



export default function SignUpPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        username:"",
        password:""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log("Signup successful", response.data);
            router.push('/login');
        } catch (error: any){
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center text-2xl w-full h-full p-4">
            <h1>{loading ? "Processing" : "Sign Up"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input 
                className="p-2 border-s-white border-2 rounded-lg m-2 max-w-full"
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})} 
                placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <input 
                className="p-2 border-s-white border-2 rounded-lg m-2 max-w-full"
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})} 
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input 
                className="p-2 border-s-white border-2 rounded-lg m-2 max-w-full"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})} 
                placeholder="password"
            />
            <button 
                onClick={onSignup}
                className="p-2 border-s-white border-2 rounded-lg m-2 max-w-full"
            >{buttonDisabled ? "No Signup" : "Signup"}</button>
            <Link href='/login'>Visit to Login</Link>
        </div>
    )
}