"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";
import toast from "react-hot-toast";



export default function SignUpPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password:"",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login Successful");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])


    return (
        <div className="flex flex-col items-center justify-center text-2xl w-full h-full p-4">
            <h1>{loading ? "Processing..." : "Login"}</h1>
            <hr />
            
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
                onClick={onLogin}
                className="p-2 border-s-white border-2 rounded-lg m-2 max-w-full"
            >SignUp</button>
            <Link href='/signup'>Visit to Signup</Link>
        </div>
    )
}