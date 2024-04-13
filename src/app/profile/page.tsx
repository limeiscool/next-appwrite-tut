"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, {Toaster} from "react-hot-toast";




export default function ProfilePage() {
  const router = useRouter();
  const [data, setdata] = useState(false)
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful! 👋')
      router.push('/login');
    } catch (error:any) {
      console.log("Logout error: ", error.message);
      toast.error(error.message);
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setdata(res.data.profile._id);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2>
        {data
        ? <Link className="hover:text-blue-700" href={`/profile/${data}`}>{data}</Link>
        : <button
        onClick={getUserDetails}
        className={"bg-blue-500 mt-2 hover:bg-blue-700" + "text-white font-bold py-1 px-4 rounded"}>Get User Details</button>
        }
      </h2>
      <hr />
      <button
      onClick={logout}
      className={"bg-blue-500 mt-2 hover:bg-blue-700" + "text-white font-bold py-1 px-4 rounded"}>Logout</button>
      <Toaster />
    </div>
  )
}