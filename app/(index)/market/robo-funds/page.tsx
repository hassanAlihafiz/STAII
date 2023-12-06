"use client"

import React, { useState } from "react"
import { RoboFundsData } from "@/utils/market"
import { RoboFundsColumns } from "@/utils/robo-fund-columns"
import { RoboFundMobileViewColumns } from "@/utils/robo-funds-mobile-columns"
import { Info, X } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import Pagination from "@/components/ui/pagination"
import { StackTable } from "@/components/ui/stack-table"
import AssetMobileView from "@/components/market/asset-mobile-view"

const RoboFunds = () => {
  const [dataPerPage, setDataPerPage] = useState<any[]>([])

  return (
    <>
      <div className="mx-1 md:mx-0 max-lg:w-[1200px] max-md:w-auto ">
        <div className="flex justify-between items-center bg-[#F5F4FF] dark:!bg-[#250B4F] h-12 !rounded-xl mt-2 px-4 max-md:h-auto max-md:!rounded-none max-md:-ml-1 max-md:-mr-1 max-md:py-3">
          <div>
            <Alert className="!p-0 flex items-center bg-transparent border-0 gap-3">
              <AlertDescription className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-[#E1DEFF] rounded-lg flex items-center justify-center dark:bg-[#6E18FB] max-md:w-20 max-md:-mt-6">
                  <Info className="h-4 w-4 stroke-[#6E18FB] dark:!text-white  dark:stroke-white " />
                </div>
                <div className="text-brand-gray-90 dark:text-white max-md:text-sm">
                  A managed fund is a type of investment where your money acts
                  as it is pooled together with other investors
                </div>
              </AlertDescription>
            </Alert>
          </div>
          <div className="cursor-pointer">
            <X size={20} className="text-brand-gray-50" />
          </div>
        </div>
        <div className="max-md:hidden max-md:w-auto max-md:overflow-auto">
          <StackTable columns={RoboFundsColumns} data={dataPerPage} />
        </div>
        <div className="md:hidden max-md:block  max-md:px-3">
          <AssetMobileView
            columns={RoboFundMobileViewColumns}
            data={dataPerPage}
          />
        </div>
      </div>
      <Pagination
        data={RoboFundsData}
        totalData={RoboFundsData?.length}
        setDataPerPage={setDataPerPage}
      />
    </>
  )
}

export default RoboFunds
