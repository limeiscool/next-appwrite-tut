import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {email, id} = reqBody;
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