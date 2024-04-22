import { addNoteToCache, removeNoteFromCache } from "@/utils/NoteCache";
import { NoteTypes } from "@/types/types";

export const updateCacheAdd = (note:NoteTypes) => {
  const LocalCache: NoteTypes[] = JSON.parse(localStorage.getItem('notesData') || '[]');
  LocalCache.unshift(note);
  localStorage.setItem('notesData', JSON.stringify(LocalCache));
  addNoteToCache(note);
}

export const updateCacheRemove = (noteId:string) => {
  const LocalCache: NoteTypes[] = JSON.parse(localStorage.getItem('notesData') || '[]');
  LocalCache.splice(LocalCache.findIndex(note => note._id === noteId), 1);
  localStorage.setItem('notesData', JSON.stringify(LocalCache));
  removeNoteFromCache(noteId);
}