
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";



export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();
    const { title, body } = reqBody;
    const userData = await getDataFromToken(request);
    const user = await User.findOne({_id: userData.id}).select("-password");
    if (!user) {
      return NextResponse.json({
        error: "User not found"
      }, {status: 400})
    }
    
    const newNote = {
      title,
      body,
      date: new Date()
    }

    user.notes.push(newNote);
    await user.save();
    const savedNote = user.notes.slice(-1)[0];
    console.log(title, body);
     
    return NextResponse.json({
      message: "Note added successfully!",
      savedNote: savedNote
    })
  } catch (error:any) {
    return NextResponse.json({
      error: error.message
    }, {status: 500})
  }
}