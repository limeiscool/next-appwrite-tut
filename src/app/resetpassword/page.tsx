"use client";

import NavLogoBar from "@/components/NavLogoBar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matching, setMatching] = useState(false);
  const [bothPasswords, setBothPasswords] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputClassSnip = bothPasswords ? matching ? "border-green-500" : "border-rose-700" : "border-gray-300"

  const sendResetRequest = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/resetpassword', {token, password});
      console.log(res.data);
      toast.success("📧 Password was reset successfully")
      router.push('/login');
    } catch (error:any) {
      console.log(error.response.status + " " + error.response.data.error)
      toast.error(error.response.status + " " + error.response.data.error)
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    if (!urlToken) {
      router.push('/login');
    } else {
      setToken(urlToken);
    }
  }, [router]);

  useEffect(() => {
    if (newPassword && confirmPassword) {
      setBothPasswords(true);
      if (newPassword === confirmPassword) {
        setButtonDisabled(false);
        setPassword(newPassword);
        setMatching(true);
      } else {
        setButtonDisabled(true);
        setMatching(false);
      }
    } else {
      setBothPasswords(false);
      setButtonDisabled(true);
      setMatching(false);
    }
  }, [newPassword, confirmPassword]);

  

  


  return (<>{
    token &&
    <div className="min-h-screen relative flex justify-center items-center">

      <NavLogoBar />

      <div className="flex flex-col">

      <div className="felx flex-col mb-4">
        <h1 className="text-2xl text-center mb-2">Reset Password</h1>
        <div className="h-2 bg-spray-900 rounded-full" />
      </div>

        <input
          type="password"
          placeholder="New Password"
          className={inputClassSnip + " text-black p-2 border-4 rounded-lg mb-4 focus:outline-none"}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className={inputClassSnip + " text-black p-2 border-4 rounded-lg mb-4 focus:outline-none"}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className={(buttonDisabled ? "text-slate-600" : "hover:border-spray-600") + " p-2 border border-spray-400 rounded-lg mb-4 focus:ouline-none"}
          onClick={() => sendResetRequest()}
          disabled={buttonDisabled}
        >
          Reset Password
        </button>
        <Toaster />

      </div>
    </div>
  }</>)
}