import { clearCache } from "@/utils/NoteCache";

export default function clearAllCaches() {
  clearCache();
  localStorage.removeItem('notesData');
}