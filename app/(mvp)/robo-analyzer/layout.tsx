import React from "react"

import "@/styles/form.css"
import "@/styles/common-page.css"

interface RoboAnalyzerProps {
  children: React.ReactNode
}

function RoboAnalyzerLayout({ children }: RoboAnalyzerProps) {
  return (
    <div className="lg:min-h-screen w-full place-items-center py-4 md:grid">
      {children}
    </div>
  )
}

export default RoboAnalyzerLayout
