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
    
      <nav className="bg-zinc-800 py-5 rounded-b-md flex items-center justify-center">
        <div className="flex justify-between px-5 w-full">
          <div className="text-white font-bold text-xl">
            <Link href="/" className="hover:text-spray-200">  
            <span className="text-spray-200">Ez</span>-Note
            </Link>
          </div>
          <div>
            <button onClick={logout} className="hover:text-gray-200">Logout</button>
            <Link href="/profile" className="ml-4 rounded-lg py-2 px-3 bg-spray-500 hover:bg-spray-600">Profile</Link>
            <Toaster />
          </div>
        </div>
      </nav>
  )
}