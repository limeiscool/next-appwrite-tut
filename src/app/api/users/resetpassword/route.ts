import { connect } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";


export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();
    const { token, password} = reqBody;
    const user = await User.findOne({forgotPasswordToken: token, 
      forgotPasswordTokenExpires: {
        $gt: Date.now()
      }
    })
    if (!user) {
      return NextResponse.json({
        error: "Invalid token"
      }, {status: 400})
    }
    if (bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({
        error: "New password cannot be the same as old password"
      }, {status: 400})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpires = undefined;
    await user.save();
    return NextResponse.json({
      message: "Password reset successfully"
    })
  } catch (error:any) {
    return NextResponse.json({
      error: error.message
    }, {status: 500})
  }
}