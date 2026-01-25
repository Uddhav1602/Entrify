'use client';
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { get } from "http";

export default function ProfilePage(){

    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout Successful");
            router.push('/login');
        } catch (error:any) {
            console.log(error.message);
            toast.error("Something went wrong during logout");
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
    }

    return (
        <div className="flex flex-col items-center justify-center text-2xl w-full h-full p-4">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <hr />
            <h2 >{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>

            <button className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 mt-4"
                onClick={logout}
                >Logout
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white rounded px-4 py-2 mt-4"
                onClick={getUserDetails}
                >GetUserDetails
            </button>

        </div>
    )
}