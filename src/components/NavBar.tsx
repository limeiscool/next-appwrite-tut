"use client";
import Link from "next/link"
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";



export default function NavBar() {
  
  const router = useRouter();
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
  return (
    
      <nav className="bg-zinc-800 py-5 flex justify-center align-middle rounded-b-md">
        <div className="flex justify-between items-center w-screen px-5">
          <div className="text-white font-bold text-xl">
            <Link href="/" className="text-rum-50 hover:text-rum-200">  
            Next.js App
            </Link>
          </div>
          <div>
            <button onClick={logout} className="text-rum-50 hover:text-gray-200">Logout</button>
            <Link href="/profile" className="text-rum-50 ml-4 rounded-lg py-2 px-3 bg-rum-500 hover:bg-rum-600">Profile</Link>
            <Toaster />
          </div>
        </div>
      </nav>
  )
}