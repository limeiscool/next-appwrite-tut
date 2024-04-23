import { Stringifier } from "postcss";




export interface NoteTypes {
    _id: string;
    title: string;
    body: string;
    Date: Date
  }

  export interface UserDetailTypes {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    noteCount: number;
  }

