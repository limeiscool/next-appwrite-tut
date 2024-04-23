"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(false);
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);
  


  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post('/api/users/verifyemail', {token});
        setVerified(true);
        toast.success(res.data.message)
        console.log(res.data.message)
        router.push('/login');
      } catch (error:any) {
        toast.error(error.response.data.error)
        console.log(error.response.data.error)
        setError(true);
        router.push('/login');
      }
    }

    const token = searchParams.get("token");
    if (token) {
      console.log("🚀 ~ file: page.tsx:VerifyEmailPage ~ useEffect ~ token:", token)
      setToken(true);
      verifyEmail();
    } else {
      toast.error("No token")
      console.log("No token")
      router.push('/login');
    }

    
  }, [searchParams, router])

  

  return (<> { token ? error ? (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <p className="text-sm text-slate-500">Error Invalid token! redirecting...</p>
      </div>
    ) : verified ? (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <p className="text-sm text-slate-500">Email Verified! redirecting...</p>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <p className="text-sm text-slate-500">Verifying Email, please wait...</p>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <p className="text-sm text-slate-500">No token!</p>
      </div>
    )}
    <Toaster />
  </>)

}