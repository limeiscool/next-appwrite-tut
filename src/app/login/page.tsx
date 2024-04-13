"use client";
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
      console.log("👀 A user has logged in!")
      toast.success("😊 Login successful!", res.data)
      router.push("/profile");
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
       className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
       type="text" name="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
      placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
       className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
       type="text" name="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
      placeholder="password"
      />
      <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:ouline-none focus:border-gray-600">Login</button>
      <Toaster />
      <Link href="/signup" className="text-blue-500 hover:underline" >(Don&apos;t have an account? SignUp)</Link>
    </div>
  )
}