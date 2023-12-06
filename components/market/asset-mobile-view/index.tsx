import React, { useState } from "react"

import { StackTable } from "@/components/ui/stack-table"
import RoundTabs from "@/components/ui/tabs"
import FilterDrawer from "@/components/drawer/filter-drawer"

interface AssetMobileViewProps {
  data?: any
  showTabs?: boolean
  columns: any[]
}
const AssetMobileView: React.FC<AssetMobileViewProps> = ({
  data,
  showTabs,
  columns,
}) => {
  const [activeTab, setActiveTab] = useState("All")
  const tabsData = [
    "All",
    "Stocks",
    "Indicies",
    "Comments",
    "My Posts",
    "People",
  ]
  const handleActiveTab = (value: string) => {
    setActiveTab(value)
  }
  return (
    <div>
      {showTabs && (
        <div className="w-[calc(100%_-_40px)] flex gap-2 relative ">
          <div className="w-full ">
            <RoundTabs
              activeTab={activeTab}
              handleActiveTab={handleActiveTab}
              tabsData={tabsData}
              className="max-md:!pt-px max-md:!h-12 scroll-hidden"
            />
          </div>
          <div className="flex justify-end">
            <FilterDrawer />
          </div>
        </div>
      )}

      <div>
        <StackTable columns={columns} data={data} />
      </div>
    </div>
  )
}

export default AssetMobileView
