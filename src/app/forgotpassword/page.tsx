"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link"
import { sendEmail } from "@/helpers/mailer";






export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const sendForgotPassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/forgotpassword', {email});
      console.log(res.data);
      const { username } = res.data;
      console.log("sent " + username);
      toast.success("📧 " + username + " an Email was sent to " + email)
    } catch (error:any) {
      console.log(error.response.status + " " + error.response.data.error)
      toast.error(error.response.status + " " + error.response.data.error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (email) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Forgot Password</h1>
      <p>Provide your email below and we&apos;ll send you an message to reset your password</p>
      <br />
      {loading && <p>Loading...</p>}
      <label htmlFor="email">email</label>
      <input
       className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
       type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
      placeholder="email"
      />
      <button onClick={(buttonDisabled ? () => {} : sendForgotPassword)} className={(buttonDisabled ? "text-gray-600" : "text-white") + " p-2 border border-gray-300 rounded-lg mb-4 focus:ouline-none focus:border-gray-600"}>Send</button>
      <Toaster />
      <Link href="/login">Login</Link>
    </div>
  )
}