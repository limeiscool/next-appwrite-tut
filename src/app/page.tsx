"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { NoteTypes } from "@/types/types";
import NavBar from "@/components/NavBar";





export default function Home() {
  
  const [notes, setNotes] = useState<NoteTypes[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [noteAdded, setNoteAdded] = useState(false);

  const addNote = async () => {
    try {
      await axios.post('/api/users/addnote', {title, body});
      toast.success('Note added successfully! 👍')
      setNoteAdded(true);
      setTitle("");
      setBody("");
    } catch (error:any) {
      console.log(error.response.status + " " + error.response.data.error)
      toast.error(error.response.status + " " + error.response.data.error)
    }
  }

  const removeNote = async (noteId:string) => {
    try {
      console.log(noteId);
      await axios.post('/api/users/removenote', {noteId});
      toast.success('Note removed successfully! 👍')
      setNoteAdded(true);
    } catch (error:any) {
      console.log(error.response.status + " " + error.response.data.error)
      toast.error(error.response.status + " " + error.response.data.error)
    }
  }
  

  useEffect(() => {
    const getNotes = async () => {
     try {
      const res = await axios.get('/api/users/getnotes');
      const { notes } = res.data;
      const newNoteArr : NoteTypes[] = notes.map((note : NoteTypes) => {
        return {
          _id: note._id,
          title: note.title,
          body: note.body,
          Date: new Date(note.Date)
        }
      })
      setNotes(newNoteArr.reverse());
      setNoteAdded(false);
     } catch (error:any) {
      console.log(error.response.status + " " + error.response.data.error)
      toast.error(error.response.status + " " + error.response.data.error)
     } 
    }

    getNotes();
  }, [noteAdded])

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
            <input onChange={(e) => setTitle(e.target.value)} value={title} className="text-white border-b border-spray-400 focus:border-spray-100 focus:outline-none px-4 py-1 bg-transparent max-w-28" type="text" name="title" id="title" />
          </div>
          <div>
            <label htmlFor="body">Message: </label>
            <input onChange={(e) => setBody(e.target.value)} value={body} className="text-white select-none border-b border-spray-400 focus:border-spray-100 focus:outline-none px-4 py-1 bg-transparent max-w-xlg" type="text" name="body" id="body" />
          </div>
          <button onClick={addNote} className="border rounded border-spray-400 px-4 py-1">Add</button>
        </div>
        <div className="h-1 bg-spray-400 shadow-spray-200" />
        <div className="flex justify-center items-center h-full px-8 py-10">
          <div className="w-screen grid grid-cols-2 gap-8 max-w-4xl">
            {notes.length > 0 ? notes.map((obj, i) => {
              return (
                <div key={i} className="aspect-square border-2 rounded-lg border-rum-500 flex">
                  <div className="w-4 rounded bg-spray-300/60" />
                  <div className="p-4 bg-spray-950/85 w-full flex flex-col">
                    <div className="flex items-center relative">
                      <button onClick={() => {removeNote(obj._id)}} className="absolute right-0 top-0"><AiFillDelete /></button>
                      <p className="text-xl">{obj.title}</p>
                      <p className="text-sm text-gray-500 ml-3">{obj.Date.getMonth()+1}/{obj.Date.getDate()}/{obj.Date.getFullYear()} - {obj.Date.getHours() % 12 || 12}:{obj.Date.getMinutes()}{obj.Date.getHours() >= 12 ? "pm" : "am"}</p>
                    </div>
                    <div>
                      <p>{obj.body}</p>
                    </div>
                  </div>
                </div>
              )
            }) : <p>No notes yet</p>}
          </div>
        </div>
    </div>
    <Toaster />
   </div> 
  );
}

