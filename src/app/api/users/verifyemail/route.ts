import { connect } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connect();


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({veryifyToken: token, 
      verifyTokenExpires: {
        $gt: Date.now()
      }
    })

    if (!user) {
      return NextResponse.json({
        error: "Invalid token"
      }, {status: 400})
    }
    console.log("🚀 User: " + user.username + " has verified their email")
    user.isVerified = true;
    user.veryifyToken = undefined;
    user.veryifyTokenExpires = undefined;
    await user.save();
    return NextResponse.json({
      message: "Email verified successfully",
      success: true
    })


  } catch (error:any) {
   return NextResponse.json({
    error: error.message
   }, {status: 500}) 
  }
}