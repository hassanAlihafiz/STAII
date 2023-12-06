import path from "path"
import { NextRequest, NextResponse } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

const auth_routes = [
  "/login",
  "/forgot-password",
  "/sign-up",
  "/sign-up/verify-email",
  "/sign-up/:path*",
  "/reset-password",
]

const unprotected_routes = ["/privacy-policy", "/terms-of-service", "/meet"]

const allowedRoutes = [
  "/home",
  "/sign-up/verification",
  "/sign-up/address",
  "/transfer",
  "/transfer/deposite",
  "/transfer/withdraw",
  "/robo-analyzer/financial-goal",
  "/robo-analyzer/annual-income",
  "/robo-analyzer/monthly-expenses",
  "/robo-analyzer/net-worth",
  "/robo-analyzer/investing-experience",
  "/robo-analyzer/investing-duration",
  "/robo-analyzer/risk-tolerance",
  "/robo-analyzer/investment-loss",
  "/robo-analyzer/martial-status",
  "/robo-analyzer/employment-status",
  "/robo-analyzer/dependents",
  "/robo-analyzer/analyze",
  "/robo-analyzer/investment-recommendation",
]
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isUnprotectedRoute = unprotected_routes.includes(req.nextUrl.pathname)
  console.log(req.nextUrl.pathname)
  const allowedRoute = true //allowedRoutes.includes(req.nextUrl.pathname)
  const isAuthRoute = auth_routes.includes(req.nextUrl.pathname)
  console.log({ allowedRoute, isAuthRoute, user })
  if (user) {
    const { data: res, error } = await supabase
      .from("ib_profile")
      .select("*")
      .eq("uid", user.id)
      .single()
    console.log(res, isAuthRoute, allowedRoute)

    if (isAuthRoute || !allowedRoute) {
      if (res?.uid) return NextResponse.redirect(new URL("/home", req.url))
      console.log("redirecting to verify")
      if (req.nextUrl.pathname === "/reset-password")
        return NextResponse.redirect(new URL("/reset-password", req.url))
      return NextResponse.redirect(new URL("/sign-up/verification", req.url))
    }
  } else {
    if (!isUnprotectedRoute && !isAuthRoute)
      return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: [
    "/",
    "/account/:path*",
    "/script/:path*",
    "/market/:path*",
    "/portfolio/:path*",
    "/transfer/:path*",
    "/login",
    "/forgot-password",
    "/sign-up/:path*",
    "/sign-up",
    "/meeting",
    // "/meeting/:path*",
    "/home",
    "/robo-analyzer/:path*",
    "/community/:path*",
    // "/reset-password",
  ],
}
