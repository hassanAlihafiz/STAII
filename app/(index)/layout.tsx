"use client"

import MobileNavigation from "@/components/footer/mobile-navigatoin"
import { SiteHeader } from "@/components/header/site-header"

import "@/styles/form.css"
import "@/styles/common-page.css"
import { useEffect } from "react"
import { useParams, usePathname } from "next/navigation"
import { fetchCommunities } from "@/async-functions/community"
import { useAppDispatch, useAppSelector } from "@/store"

import Footer from "@/components/footer/footer"

interface IndexLayoutProps {
  children: React.ReactNode
}

export default function IndexLayout({ children }: IndexLayoutProps) {
  const params = useParams()
  const pathname = usePathname();
  const dispatch = useAppDispatch()
  const restrictedURL = [`/meet/${params?.id}`]
  const isHeaderShow = restrictedURL.includes(pathname)
  const communities = useAppSelector((state) => state.community.communityData)
  const token = useAppSelector((state) => state.user.token)
  useEffect(() => {
    if (!communities && token) {
      fetchCommunities(token)(dispatch)
    }
  }, [communities, token])
  return (
    <div className="relative flex min-h-screen flex-col">
      {!isHeaderShow && <SiteHeader />}
      {/* <OfflineAlert /> */}
      <div className="flex-1 pb-[130px] md:pb-100 lg:pb-0 max-md:pb-[100px]">
        {children}
      </div>
      {!isHeaderShow && (
        <>
          <Footer />
          <MobileNavigation />
        </>
      )}
    </div>
  )
}
