import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import ChartTimeFrame from "@/components/chart/TimeFrame"
import SelectTradeModal from "@/components/modal/script/select-trade"

interface HistoricalMobileViewProps {
  data: any[]
}

const HistoricalMobileView: React.FC<HistoricalMobileViewProps> = ({
  data,
}) => {
  const [activeTimeFrame, setActiveTimeFrame] = useState("1Day")
  return (
    <div>
      <div>
        <ChartTimeFrame
          activeTime={activeTimeFrame}
          setActiveTime={setActiveTimeFrame}
        />
      </div>
      <div className="px-3 mt-2">
        {data?.map((history) => {
          return (
            <div>
              <div className="-mx-7 py-2.5 px-5 bg-brand-gray-10 text-brand-gray-60 text-xs font-medium max-md:dark:border-b max-md:dark:border-brand-blue-90 dark:bg-transparent ">
                16 Feb 2023, 02:00 - 16 May 2023, 02:59
              </div>
              <div className="flex justify-between items-center black-500 py-5 text-sm border-b border-brand-gray-20 dark:border-brand-blue-90 dark:text-white">
                <div>Open / Close</div>
                <div>
                  {history?.open} / {history?.close}
                </div>
              </div>
              <div className="flex justify-between items-center black-500 py-5 text-sm border-b border-brand-gray-20 dark:border-brand-blue-90 dark:text-white">
                <div>High / Low</div>
                <div>
                  {" "}
                  {history?.high} / {history?.low}
                </div>
              </div>{" "}
              <div className="flex justify-between items-center black-500 py-5 text-sm border-b border-brand-gray-20 dark:border-brand-blue-90 dark:text-white">
                <div>Change</div>
                <div className="text-brand-red-70">{history?.change}</div>
              </div>{" "}
              <div className="flex justify-between items-center black-500 py-5 text-sm  dark:text-white">
                <div>High / Low</div>
                <div>
                  {" "}
                  {history?.high} / {history?.low}
                </div>
              </div>{" "}
            </div>
          )
        })}
      </div>
      <div className="md:hidden  w-full fixed bg-white top-[588px] flex justify-between items-center gap-4 border-t border-brand-gray-20 dark:border-brand-blue-90 -ml-4 -mr-4 py-4 px-5">
        <div className="w-full">
          <div className="text-brand-gray-50 text-sm dark:text-brand-gray-30">
            Today’s volume
          </div>
          <div className="black-600 text-base dark:text-white">32,387.99</div>
        </div>
        <div className="w-full">
          <SelectTradeModal />
        </div>
      </div>
    </div>
  )
}

export default HistoricalMobileView
