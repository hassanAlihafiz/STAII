import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log(request.headers)
  return new Response("Hello World!", {
    status: 200,
  })
}
