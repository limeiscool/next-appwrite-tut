import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = NextResponse.json({
      message: "Logout successful",
      success: true,
    })
    res.cookies.delete("token");
    return res;
  } catch (error:any) {
    return NextResponse.json({
      error: error.message
    }, {status: 500})
  }
}