'use client'
import React from "react";
import { useParams } from "next/navigation";

export default function UserProfile({params}: {params: {id: string}}){
    return (
        <div className="flex flex-col items-center justify-center text-2xl w-full h-full p-4">
            <h1>UserProfile</h1>
            <hr />
            <p className="text-4xl">Profile: 
                <span className="text-blue-500 bg-white">{params.id}</span>
            </p>

        </div>
    )
}