import {connect} from "@/db/config";
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();
    const {email, id} = reqBody;
    const user = await User.findOne({email});
    if (user.isVerified) {
      return NextResponse.json({
        error: "User already verified, please refresh your page"
      }, {status: 400})
    }
    await sendEmail({email, emailType: "VERIFY", userId: id});
    return NextResponse.json({
      message: "Verification email sent!"
    })
    
  } catch (error:any) {
    return NextResponse.json({
      error: error.message
    })
  }
}