"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { TiTimes } from "react-icons/ti";
import { NoteTypes } from "@/types/types";
import NavBar from "@/components/NavBar";
import getNoteData from "@/helpers/getNoteData";
import { updateCacheAdd, updateCacheRemove } from "@/helpers/updateCache";





export default function Home() {
  
  const [notes, setNotes] = useState<NoteTypes[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addNote = async () => {
    try {
      const res = await axios.post('/api/users/addnote', {title, body});
      const { message, savedNote } = res.data
      updateCacheAdd(savedNote);
      savedNote.Date = new Date(savedNote.Date);
      setNotes([savedNote, ...notes]);
      toast.success(message + ' 👍')
      setTitle("");
      setBody("");
    } catch (error:any) {
      console.log(error.response.status + " " + error.response.data.error)
      toast.error(error.response.status + " " + error.response.data.error)
    } finally {
      setShowModal(false);
    }
  }

  const removeNote = async (noteId:string) => {
    try {
      await axios.post('/api/users/removenote', {noteId});
      updateCacheRemove(noteId);
      setNotes(notes.filter(note => note._id !== noteId));
      toast.success('Note removed successfully! 👍')
    } catch (error:any) {
      console.log(error.response.status + " " + error.response.data.error)
      toast.error(error.response.status + " " + error.response.data.error)
    }
  }
  

  useEffect(() => {
    const modifyNoteDates = (notes:NoteTypes[]) => {
      notes.forEach((note:NoteTypes) => {
        note.Date = new Date(note.Date);
      })
      return notes;
    }
    const fetchData = async () => {
      try {
        const data = await getNoteData();
        setNotes(modifyNoteDates(data));
        console.log(modifyNoteDates(data)); 
      } catch (error:any) {
        console.log(error.response.status + " " + error.response.data.error)
        toast.error(error.response.status + " " + error.response.data.error)  
      }
    }
    fetchData();
  }, [])

  return (
   <div className="text-zinc-100 min-h-screen">
    <NavBar /> 
    <div className="">

        <div className="flex items-center justify-between px-4">
          <p className="text-md py-2 px-6 flex flex-col justify-center">
            Thoughts, Questions , or just need a reminder? Leave yourself a note below! 📨
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-spray-500 font-semibold px-4 py-2 rounded-md my-4">Add Note</button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900/60">
            <div className="bg-spray-700 rounded-lg p-8 max-w-lg flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold mb-4">Add Note</h3>
              <label htmlFor="modal-title" className="mb-2">Title:</label>
              <input
                type="text"
                id="modal-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-transparent border-b border-spray-400 focus:outline-none px-3 py-1 mb-4 w-full"
              />
              <label htmlFor="modal-body" className="mb-2">Body:</label>
              <textarea
                id="modal-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="bg-transparent border border-spray-400 focus:outline-none rounded-md px-3 py-1 mb-4 w-full"
              />
              <div className="flex gap-4 justify-end">
                <button disabled={!title || !body} onClick={addNote} className={(!title || !body ? "text-gray-600" : "hover:bg-spray-600")+" rounded-lg py-2 px-3 bg-spray-500"}>Add</button>
                <button onClick={() => {
                  setTitle("")
                  setBody("")
                  setShowModal(false)
                }} className="hover:text-gray-200">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="h-1 bg-spray-500" />

        <div className="flex justify-center items-center h-full px-8 py-10">
          <div className="w-screen grid grid-cols-2 gap-12 max-w-6xl">
            {notes.length > 0 ? notes.map((obj, i) => {
              return (
                <div key={i} className="flex">
                  <div className="w-3 rounded-l bg-spray-300/30" />
                  <div className="p-4 rounded-r bg-spray-950/85 w-full flex flex-col">
                    <div className="flex items-center relative">
                      <button onClick={() => {removeNote(obj._id)}} className="absolute right-0 top-0"><TiTimes /></button>
                      <p className="text-xl">{obj.title}</p>
                      <p className="text-sm text-gray-500 ml-3">{obj.Date.getMonth()+1 > 9 ? obj.Date.getMonth()+1 : `0${obj.Date.getMonth()+1}`}/{obj.Date.getDate() > 9 ? obj.Date.getDate() : `0${obj.Date.getDate()}`}/{obj.Date.getFullYear()} - {obj.Date.getHours() % 12 || 12}:{obj.Date.getMinutes() > 9 ? obj.Date.getMinutes() : `0${obj.Date.getMinutes()}`}{obj.Date.getHours() >= 12 ? "pm" : "am"}</p>
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

