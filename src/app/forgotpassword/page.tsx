"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link"
import { sendEmail } from "@/helpers/mailer";
import NavLogoBar from "@/components/NavLogoBar";






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
    <div className="min-h-screen relative flex justify-center items-center">

      <NavLogoBar />

      <div className="flex flex-col">

        <div className="flex flex-col mb-4">
          <h1 className="text-3xl text-center mb-2">Forgot Password</h1>
          <p className="text-sm mb-3">Provide your email below an email will be sent to you shortly 📨</p>
          <div className="h-2 bg-spray-900 rounded-full" />
        </div>

        <div className="mx-auto flex flex-col">
          <label className="mb-1 w-full" htmlFor="email">Email: </label>
          <input
          className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-4 mt-2 h-2 bg-spray-900 rounded-full" />
          <button disabled={buttonDisabled} onClick={sendForgotPassword} className="mx-auto py-2 px-10 border border-spray-600 bg-spray-950/40 rounded-lg mb-4 focus:ouline-none hover:border-spray-950">Send</button>
          <Toaster />
          <Link className="text-spray-500 text-center hover:underline" href="/login">Go back to Login</Link>
          <Link className="text-spray-500 text-center hover:underline" href="/signup">(Don&apos;t have an account? Signup)</Link>
        </div>

      </div>
    </div>
  )
}