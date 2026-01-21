"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {axios} from "axios";



export default function SignUpPage(){
    const [user, setUser] = React.useState({
        email:"",
        password:"",
    })

    const onLogin = async () => {

    }


    return (
        <div className="flex flex-col items-center justify-center text-2xl w-full h-full p-4">
            <h1>Login</h1>
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