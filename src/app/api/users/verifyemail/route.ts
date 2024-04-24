import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";




export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({verifyToken: token, 
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
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    await user.save();
    const reqCookie = request.cookies.get("token")?.value || "";
    if (reqCookie) {
      request.cookies.delete("token");
    }
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
      isVerified: user.isVerified
    }
    const jwtToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "12h"});
    const res = NextResponse.json({
      message: "Email verified successfully!",
      success: true
    })
    res.cookies.set("token", jwtToken, {
      httpOnly: true,
    })
    return res;
  } catch (error:any) {
   return NextResponse.json({
    error: error.message
   }, {status: 500}) 
  }
}