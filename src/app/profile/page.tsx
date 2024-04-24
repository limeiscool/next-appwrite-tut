"use client";
import NavBar from "@/components/NavBar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import { UserDetailTypes } from "@/types/types";
import getNoteData from "@/helpers/getNoteData";
import Link from "next/link";




export default function ProfilePage() {

  const [user, setUser] = useState<UserDetailTypes>({
    _id: "",
    username: "",
    email: "",
    isVerified: false,
    noteCount: 0,
  });

  const resendVerificationEmail = async () => {
    try {
      const res = await axios.post('/api/users/resendverify', {email: user.email, id: user._id});
      toast.success(res.data.message)
    } catch (error:any) {
      console.log(error.response.status + " " + error.response.data.error)
      toast.error(error.response.status + " " + error.response.data.error) 
    }
  }
  

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/api/users/me');
        const {id , email, username, isVerified} = res.data.userDetails;
        const notes = await getNoteData();
        const userObj = {
          _id: id,
          username: username,
          email: email,
          isVerified: isVerified,
          noteCount: notes.length
        }
        setUser(userObj);
      } catch (error:any) {
       console.log(error.response.status + " " + error.response.data.error)
       toast.error(error.response.status + " " + error.response.data.error) 
      }
    } 

    getDetails();
    
  }, []);

  return (
    <div className="min-h-screen">
    <NavBar />
    <div className="flex flex-col items-center justify-center py-2">
      <h1>Profile</h1>
      <div>
        <p>Username: {user.username}</p>
        <p>Profile ID: {user._id}</p>
        <p>Email: {user.email}</p>
        <p>Note Count: {user.noteCount}</p>
        <p>Verified: {user.isVerified ? "Yes" : "No"}</p>
        {!user.isVerified && <button disabled={user.isVerified} onClick={resendVerificationEmail} className="text-spray-600 hover:underline">resend verification email</button>}
      </div>
      <div>
        <Link className="text-red-500 hover:underline" href={`/profile/${user._id}`}>Account actions</Link>
      </div>
      <Toaster />
    </div>
    </div>
  )
}