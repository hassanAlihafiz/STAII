import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams?.get("next")
  console.log({ code }, "---------------redirected here-----------")
  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      await supabase.auth.exchangeCodeForSession(code)
    } catch (error) {
      console.error(error)
      return NextResponse.redirect(
        new URL("/forgot-password#error=invalid or expired link", request.url)
      )
    }
  }
  if (next) return NextResponse.redirect(new URL(next, request.url))
  return NextResponse.redirect(new URL("/", request.url))
}
