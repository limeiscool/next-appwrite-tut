import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/db/config";

connect();

export async function GET(request: NextRequest) {
  try {
    const userData = await getDataFromToken(request);
    const user = await User.findOne({_id: userData.id}).select("-password");
    return NextResponse.json({
      message: "User found",
      profile: user
    })
  } catch (error:any) {
    return NextResponse.json({
      error: error.message
    }, {status: 500})
  }
}