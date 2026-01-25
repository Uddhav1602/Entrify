'use client';
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage(){

    const router = useRouter();
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
    return (
        <div className="flex flex-col items-center justify-center text-2xl w-full h-full p-4">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <hr />

            <button className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
                    onClick={logout}
                >
                    Logout
            </button>

        </div>
    )
}