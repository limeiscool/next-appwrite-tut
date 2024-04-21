"use client";
import NavBar from "@/components/NavBar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, {Toaster} from "react-hot-toast";




export default function ProfilePage() {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    notes: [],
  });
  // TODO
  // getUserDetails on load
  // use the user profile to display userinfo on the page
  // maybe something simple like username email and note count

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get('/api/users/me');
        console.log(res.data.profile);
        setUser(res.data.profile);
      } catch (error:any) {
        console.log(error.response.status + " " + error.response.data.error)
        toast.error(error.response.status + " " + error.response.data.error)
      }
    }
    if (!user._id) {
      getUserDetails();
    }
    
  }, [user]);

  return (
    <div className="min-h-screen">
    <NavBar />
    <div className="flex flex-col items-center justify-center py-2">
      <h1>Profile</h1>
      <div>
        <p>Username: {user.username}</p>
        <p>Profile ID: {user._id}</p>
        <p>Email: {user.email}</p>
        <p>Note Count: {user.notes.length}</p>
      </div>
      <Toaster />
    </div>
    </div>
  )
}