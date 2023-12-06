"use client"

import { AuthHeader } from "@/components/header/auth-header"
import Logo from "@/components/header/logo"

import "@/styles/form.css"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname()
  const restrictedUrl = ["/news"]
  const isShow = restrictedUrl.includes(pathname)
  return (
    <main className=" flex  min-h-screen flex-col items-center bg-gray-50 dark:bg-[#101520]">
      {!isShow && <AuthHeader />}
      <div className="lg:min-h-screen w-full place-items-center py-4 md:grid">
        {children}
      </div>
      {isShow && (
        <>
          <footer className="p-3 lg:mr-4 flex justify-center items-center w-full xl:max-w-[798px] h-[100px] max-md:flex-col max-md:gap-4">
            <div className="flex-col gap-4 items-center">
              <div className="text-[12px] font-semibold px-8">Powered by </div>

              <Logo url="https://socialtrader.ai" />
            </div>
          </footer>
        </>
      )}
    </main>
  )
}
