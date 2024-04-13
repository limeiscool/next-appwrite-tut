"use client";
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "", 
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/signup', user)
      console.log("Signed up!", res.data)
      router.push("/login");
    } catch (error:any) {
      console.log("Sign up error: ", error);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading..." : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
       className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
       type="text" name="username" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
      placeholder="username"
      />
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
      <button onClick={onSignup} className={(buttonDisabled ? "text-gray-600" : "text-white") + " p-2 border " + (buttonDisabled ? "border-gray-600" : "border-gray-300") + " rounded-lg mb-4 focus:ouline-none focus:border-gray-600"}>Signup 😎</button>
      <Toaster />
      <Link href="/login" className="text-blue-500 hover:underline" >(Already have an account? Login)</Link>
    </div>
  )
}
