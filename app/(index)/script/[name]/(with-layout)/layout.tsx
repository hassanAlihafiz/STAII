"use client"

import React from "react"
import { useParams, usePathname } from "next/navigation"

import SpecificAssetNavHeader from "@/components/market/specific-asset-header"
import SpecificAssetSideBar from "@/components/market/specific-asset/side-bar"

const SpecificAssetPage = ({ children }: { children: React.ReactElement }) => {
  const pathname = usePathname()
  const params = useParams()
  const isNavbarHide = [`/script/${params?.name}/price-alert`]
  const ShouldHideNavbar = isNavbarHide.includes(pathname)
  return (
    <section className="w-full px-4 max-w-[1200px] mx-auto pt-10">
      {!ShouldHideNavbar && <SpecificAssetNavHeader />}
      <main className="mx-auto max-w-7xl pt-1 !pb-16 max-md:!pb-0">
        <div className="lg:flex items-start gap-6 xl:gap-8 mt-4">
          <div className={`flex-1 `}>{children}</div>
          {!ShouldHideNavbar && (
            <div className="hidden lg:block max-w-xs xl:max-w-sidebar w-full sticky top-6 ">
              <SpecificAssetSideBar />
            </div>
          )}
        </div>
      </main>
    </section>
  )
}

export default SpecificAssetPage
