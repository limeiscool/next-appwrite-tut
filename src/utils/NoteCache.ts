import { NoteTypes } from "@/types/types";


let NoteCache : NoteTypes[] | undefined;
export const setNotesToCache = (notes:NoteTypes[]) => {
  console.log("Notes set to cache")
  NoteCache = notes;
}
export const getNotesFromCache = () => {
  return NoteCache;
}
export const addNoteToCache = (note:NoteTypes) => {
  if (NoteCache === undefined) {
    NoteCache = [];
  }
  NoteCache.push(note);
}
export const removeNoteFromCache = (noteId:string) => {
  if (!NoteCache) return;
  NoteCache = NoteCache.filter(note => note._id !== noteId);
}

export const clearCache = () => {
  NoteCache = undefined;
}
