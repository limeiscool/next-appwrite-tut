
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
import User from "@/models/userModel";

connect()


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, body } = reqBody;
    console.log(title, body);
    console.log("This POST has not added to database yet")
    return NextResponse.json({
      message: "Note added successfully"
    })
  } catch (error:any) {
    return NextResponse.json({
      error: error.message
    }, {status: 500})
  }
}