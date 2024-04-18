"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import NavBar from "@/components/NavBar";





export default function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNote = async () => {
    try {
      await axios.post('/api/users/addnote', {title, body});
      toast.success('Note added successfully! 👍')
    } catch (error:any) {
      console.log(error.response.status + " " + error.response.data.error)
      toast.error(error.response.status + " " + error.response.data.error)
    }
  }

  useEffect(() => {
    const getNotes = () => {
      console.log("This async function has not been set yet, needs data from cookies");
    }

    getNotes();
  }, [])
   
  return (
   <div className="text-zinc-100 min-h-screen">
    <NavBar /> 
    <div className="">
        <p className="text-md py-2 px-6 flex flex-col justify-center">
          Thoughts, Questions , or just need a reminder? Leave yourself a note below! 📨
        </p>
        <div className="flex justify-between items-center px-20 py-2">
          <div>
            <label htmlFor="title">Title: </label>
            <input onChange={(e) => setTitle(e.target.value)} className="text-white border-b border-spray-400 focus:border-spray-100 focus:outline-none px-4 py-1 bg-transparent max-w-28" type="text" name="title" id="title" />
          </div>
          <div>
            <label htmlFor="body">Message: </label>
            <input onChange={(e) => setBody(e.target.value)} className="text-white select-none border-b border-spray-400 focus:border-spray-100 focus:outline-none px-4 py-1 bg-transparent max-w-xlg" type="text" name="body" id="body" />
          </div>
          <button onClick={addNote} className="border rounded border-spray-400 px-4 py-1">Add</button>
        </div>
        <div className="h-1 bg-spray-400 shadow-spray-200" />
        <div className="flex justify-center items-center h-full px-8 py-10">
          <div className="w-screen grid grid-cols-3 gap-8 items-center">
            {Array.from({length: 20}).map((_, i) => {
              return (
                <div key={i} className="aspect-square border-2 rounded-md border-rum-500 flex">
                  <div className="w-1 rounded bg-spray-300" />
                  <div className="p-8 bg-spray-950/85 w-full">IM A  BEAST!</div>
                </div>
              )
            })}
          </div>
        </div>
    </div>
   </div> 
  );
}

