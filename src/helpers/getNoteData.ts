import { addNoteToCache, getNotesFromCache, removeNoteFromCache, setNotesToCache } from "@/utils/NoteCache";
import axios from "axios";
import { NoteTypes } from "@/types/types";

export default async function getNoteData() {
  const CachedNotes : NoteTypes[] | undefined = getNotesFromCache();
  if (CachedNotes) {
    console.log("Loaded from cache")
    return CachedNotes;
  }

  const LocalNotes = localStorage.getItem('notesData');
  if (LocalNotes) {
    console.log("Loaded from local storage")
    const parsedLocalNotes : NoteTypes[] = JSON.parse(LocalNotes);
    setNotesToCache(parsedLocalNotes);
    return parsedLocalNotes;
  }

  const res = await axios.get('/api/users/getnotes');
  const { notes } = res.data;
  const newNoteArr : NoteTypes[] = notes.reverse();
  console.log("Loaded from database setting cache and local storage")
  localStorage.setItem('notesData', JSON.stringify(newNoteArr));
  setNotesToCache(newNoteArr);
  return newNoteArr;
}