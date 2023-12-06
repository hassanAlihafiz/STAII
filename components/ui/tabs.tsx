import React from "react"

interface RoundTabsProps {
  activeTab: string
  handleActiveTab: (data: string) => void
  tabsData: string[]
  className?: string
}

function RoundTabs({
  activeTab,
  handleActiveTab,
  tabsData,
  className,
}: RoundTabsProps) {
  return (
    <div
      className={`max-md:overflow-x-auto max-md:whitespace-no-wrap max-md:pt-4 max-md:pb-0 max-md:h-20 ${className}`}
    >
      <div className="flex gap-1">
        {tabsData?.map((el: any) => (
          <div
            onClick={() => handleActiveTab(el)}
            className={`post-tab ${
              activeTab === el && "post-tab-active"
            } max-md:min-w-[91px] max-md:flex max-md:justify-center max-md:items-center`}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoundTabs
