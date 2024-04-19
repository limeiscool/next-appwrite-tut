import { connect } from "@/db/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();




export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {noteId } = reqBody;
    const userData = await getDataFromToken(request);
    const user = await User.findOne({_id: userData.id}).select("-password");
    if (!user) {
      return NextResponse.json({
        error: "User not found"
      }, {status: 400})
    }

    user.notes.id(noteId).deleteOne();
    await user.save();
    return NextResponse.json({
      message: "Note removed successfully"
    })
  } catch (error:any) {
   return NextResponse.json({
    error: error.message
   }, {status: 500}) 
  }
}