"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    if (!urlToken) {
      router.push('/login');
    } else {
      setToken(urlToken);
    }
  }, [router]);

  // NEED TO MAKE FORM !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  return (<>{
    token &&
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Reset Password</h1>
    </div>
  }</>)
}