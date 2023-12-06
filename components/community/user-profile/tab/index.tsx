"use client"

import React from "react"

interface TabsProps {
  activeTab: number
  setActiveTab: (value: number) => void
  data: any
}

function Tab({ activeTab, setActiveTab, data }: TabsProps) {
  const handleActiveTab = (value: number) => {
    setActiveTab(value)
  }
  return (
    <div className="overflow-auto">
      <div className="mt-6 flex gap-6 border-y border-brand-gray-20 dark:border-brand-gray-80 px-3 pt-5 max-sm:w-[600px]">
        <div
          onClick={() => handleActiveTab(1)}
          className={`pb-5 px-2 cursor-pointer ${
            activeTab === 1
              ? "border-b-4 border-brand-green-70 black-600 dark:text-white"
              : "text-brand-gray-60 dark:text-brand-gray-30"
          }`}
        >
          {data?.posts} Posts
        </div>
        <div
          onClick={() => handleActiveTab(2)}
          className={`pb-5 px-2 cursor-pointer ${
            activeTab === 2
              ? "border-b-4 border-brand-green-70 black-600 dark:text-white"
              : "text-brand-gray-60 dark:text-brand-gray-30"
          }`}
        >
          {data?.comments} Comments
        </div>
        <div
          onClick={() => handleActiveTab(3)}
          className={`pb-5 px-2 cursor-pointer ${
            activeTab === 3
              ? "border-b-4 border-brand-green-70 black-600 dark:text-white"
              : "text-brand-gray-60 dark:text-brand-gray-30"
          }`}
        >
          300 Watchlist
        </div>
        <div
          onClick={() => handleActiveTab(4)}
          className={`pb-5 px-2 cursor-pointer ${
            activeTab === 4
              ? "border-b-4 border-brand-green-70 black-600 dark:text-white"
              : "text-brand-gray-60 dark:text-brand-gray-30"
          }`}
        >
          Portfolio
        </div>
      </div>
    </div>
  )
}

export default Tab
