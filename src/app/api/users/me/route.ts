import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

  try {
    const userData = getDataFromToken(request);
    return NextResponse.json({userDetails: userData})
  } catch (error:any) {
    return NextResponse.json({
      error: error.message
    }, {status: 500})
  }
}