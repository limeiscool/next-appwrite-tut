import axios from "axios";
import { NoteTypes } from "@/types/types";

export default async function getNoteData() {

  const LocalNotes = localStorage.getItem('notesData');
  if (LocalNotes) {
    console.log("Loaded from local storage")
    const parsedLocalNotes : NoteTypes[] = JSON.parse(LocalNotes);
    return parsedLocalNotes;
  }

  const res = await axios.get('/api/users/getnotes');
  const { notes } = res.data;
  const newNoteArr : NoteTypes[] = notes.reverse();
  console.log("Loaded from database setting cache and local storage")
  localStorage.setItem('notesData', JSON.stringify(newNoteArr));
  return newNoteArr;
}