"use client";
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NavLogoBar from "@/components/NavLogoBar";

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "", 
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/login', user);
      console.log("👀 A user has logged in!");
      toast.success("😊 Login successful!", res.data)
      router.push("/");
    } catch (error:any) {
      console.log("Login error: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
  <div className="min-h-screen relative flex justify-center items-center">

    <NavLogoBar /> 

    <div className="flex flex-col">

      <div className="felx flex-col mb-4">
        <h1 className="text-2xl text-center mb-2">Login</h1>
        <div className="h-2 bg-spray-900 rounded-full" />
      </div>

      <div className="flex flex-col">
        <label className="mb-1" htmlFor="email">Email: </label>
        <input
        className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text" name="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1" htmlFor="password">Password: </label>
        <input
        className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text" name="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        />
      </div>

      <div className="flex flex-col mt-2">
        <button onClick={onLogin} className="p-2 border border-spray-600 bg-spray-950/40 rounded-lg mb-4 focus:ouline-none hover:border-spray-950">Login</button>
        <Link href="/signup" className="text-spray-500 text-center hover:underline" >(Don&apos;t have an account? SignUp)</Link>
        <Link href="/forgotpassword" className="text-spray-500 text-center hover:underline" >Forgot Password</Link>
      </div>

      <Toaster />
    </div>
    
  </div>
  )
}