import { connect } from "@/db/config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";





export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();
    const {id} = reqBody;
    const user = await User.findOneAndDelete({_id: id}).select("-password");
    if (!user) {
      return NextResponse.json({
        error: "User not found"
      }, {status: 400})
    }
    return NextResponse.json({
      message: "Account deleted successfully"
    })
  } catch (error:any) {
    return NextResponse.json({
      error: error.message
    }, {status: 500})
  }
}