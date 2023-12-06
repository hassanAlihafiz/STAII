"use client"

import React, { useState } from "react"
import Image from "next/image"

import "@/styles/common-page.css"
import { Button } from "@/components/ui/button"
import RoundTabs from "@/components/ui/tabs"
import AddPost from "@/components/community/add-post"
import Tabs from "@/components/market/tab"
import SelectTradeModal from "@/components/modal/script/select-trade"

const SpecificCommunity = () => {
  const [activeTab, setActiveTab] = useState("All")
  const tabsData = ["All", "Original", "Links", "Media", "My Posts", "People"]
  const handleActiveTab = (value: string) => {
    setActiveTab(value)
  }

  return (
    <>
      <main className="mx-auto max-w-7xl !pb-16 max-md:!pb-0">
        <div className="lg:flex items-start gap-6 xl:gap-8">
          {/* left */}
          <div className="flex-1 px-6 dark:bg-brand-blue-120 max-md:dark:bg-transparent rounded-xl max-md:p-0">
            <div className="mt-3 lg:mt-6">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6  pb-6 border-b border-brand-gray-20 dark:border-brand-gray-90 max-md:mb-2">
                <div className="flex-[3]">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full border border-brand-gray-20">
                      <Image
                        src="/images/market/apple.svg"
                        width={40}
                        height={40}
                        alt=""
                      />
                    </div>
                    <div>
                      <p>
                        <span className="black-600 text-base dark:text-white">
                          Apple
                        </span>{" "}
                        <span className="text-brand-gray-50 text-base">
                          APPL
                        </span>
                      </p>
                      <div className="flex gap-2 items-end text-brand-gray-50 text-sm">
                        23k followers
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-end whitespace-nowrap gap-3">
                    <Button
                      variant="ghost"
                      className="w-fit h-[40px] inline-flex items-center rounded-xl text-sm font-semibold px-5"
                    >
                      Follow Asset
                    </Button>
                  </div>
                </div>
              </div>
              <AddPost showOnmobileView />
              <RoundTabs
                activeTab={activeTab}
                handleActiveTab={handleActiveTab}
                tabsData={tabsData}
              />
              <Tabs activeTab={activeTab} />
            </div>
          </div>
          <div className="md:hidden  w-full fixed bg-white top-[588px] flex justify-between items-center gap-4 border-t border-brand-gray-20 dark:border-brand-blue-90 -ml-4 -mr-4 py-4 px-5">
            <div className="w-full">
              <div className="text-brand-gray-50 text-sm">Today’s volume</div>
              <div className="black-600 text-base dark:text-white">
                32,387.99
              </div>
            </div>
            <div className="w-full">
              <SelectTradeModal />
            </div>
          </div>
          {/* right */}
        </div>
      </main>
    </>
  )
}

export default SpecificCommunity
