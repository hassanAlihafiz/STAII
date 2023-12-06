import React from "react"

import { ThemeToggle } from "@/components/header/theme-toggle"
import NewsSection from "@/components/home/news"

export default function page() {
  return (
    <main className="container px-5 lg:px-4  flex justify-center overflow-hidden">
      <div className="lg:my-6 lg:mr-4 flex w-full xl:max-w-[798px]  flex-1 flex-col lg:px-2">
        <ThemeToggle />
        <NewsSection />
      </div>
    </main>
  )
}
