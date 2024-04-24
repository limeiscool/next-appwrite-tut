import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";





export async function GET(request: NextRequest) {
  await connect();
  try {
    const userData = await getDataFromToken(request);
    const user = await User.findOne({_id: userData.id}).select("-password");
    if (!user) {
      return NextResponse.json({
        error: "User not found"
      }, {status: 400})
    }
    return NextResponse.json({
      notes: user.notes
    })
  } catch (error:any) {
    return NextResponse.json({
      error: error.message
    }, {status: 500})
  }

}