"use client";
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NavLogoBar from "@/components/NavLogoBar";

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
    <div className="min-h-screen relative flex justify-center items-center">
    
      <NavLogoBar />

      <div className="flex flex-col">

        <div className="flex flex-col mb-4">
          <div className="text-3xl text-center mb-2">{loading ? "Loading..." : "Signup"}</div>
          <div className="h-2 bg-spray-900 rounded-full" />
        </div>

        <div className="flex flex-col">
          <label className="mb-1" htmlFor="username">Username: </label>
          <input
          className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="text" name="username" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          />
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
          <button disabled={buttonDisabled} onClick={onSignup} className="p-2 border border-spray-600 bg-spray-950/40 rounded-lg mb-4 focus:ouline-none hover:border-spray-950">Signup 😎</button>
          <Link href="/login" className="text-spray-500 text-center hover:underline">(Already have an account? Login)</Link>
        </div>

        <Toaster />
      </div>

    </div>
  )
}
