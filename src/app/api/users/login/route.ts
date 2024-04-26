import {connect} from "@/db/config";
import User from "@/models/userModel.js"
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // Find user by email
    const user = await User.findOne({email});
    if (!user) {
      return NextResponse.json({
        error: "No account exisits with this email"
      }, {status: 400})
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        error: "Invalid credentials"
      }, {status: 400})
    }

    // Generate JWT token
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
      isVerified: user.isVerified
    }
    const jwtToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "12h"});

    const res = NextResponse.json({
      message: "Login successful",
      success: true,
    })

    res.cookies.set("token", jwtToken, {
      httpOnly: true,
    })

    return res;
    
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, {status: 500});
  }
}