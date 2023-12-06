"use client"

import React, { useEffect, useState } from "react"
import { getAssets } from "@/async-functions/alpaca/assets"
import {
  getAllPolygonAssets,
  getBuySellPrice,
  getChange,
  getChangeGraph,
  getPolygonAssetDetails,
  getRangeByWeek,
  getUniversalSnapshot,
} from "@/async-functions/polygon/assets"
import { useAppSelector } from "@/store"
import { assetColumns } from "@/utils/asset-columns"
import { assetMobileColumns } from "@/utils/asset-mobile-column"
import { Loader } from "lucide-react"

import Pagination from "@/components/ui/pagination"
import { StackTable } from "@/components/ui/stack-table"
import AssetMobileView from "@/components/market/asset-mobile-view"

const Assets = () => {
  const [dataPerPage, setDataPerPage] = useState<any[]>([])
  const token = useAppSelector((state) => state?.user?.token)
  const [loader, setLoader] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [assets, setAssets] = useState([])

  const getAllAssets = () => {
    getAllPolygonAssets("stocks")
      .then((asset: any) => {
        Promise.all(
          asset?.map((item: any) => {
            return Promise.all([
              getPolygonAssetDetails(item?.ticker),
              getRangeByWeek(item?.ticker),
              getChange(item?.ticker),
              getChangeGraph(item?.ticker),
              getBuySellPrice(item?.ticker),
              getUniversalSnapshot(item?.ticker),
            ])
              .then(
                ([
                  details,
                  range,
                  change,
                  changeData,
                  price,
                  universalSnapshot,
                ]) => {
                  item.details = details
                  item.range = range
                  item.details.change = change
                  item.details.cData = changeData
                  item.details.price = price
                  item.details.universalSnapshot = universalSnapshot
                }
              )
              .catch((e) => {
                console.log("details err", e)
              })
          })
        ).then(() => {
          setAssets(asset)
          setLoader(true)
        })
      })
      .catch((e) => {
        console.log("Err", e)
      })
  }

  useEffect(() => {
    getAllAssets()
  }, [])

  return (
    <>
      <div className="w-full mt-3 overflow-auto max-md:px-3">
        {loader ? (
          <>
            <div className="max-md:hidden">
              <StackTable columns={assetColumns} data={dataPerPage} />
            </div>
            <div className="md:hidden max-md:block">
              <AssetMobileView
                columns={assetMobileColumns}
                data={dataPerPage}
                showTabs
              />
            </div>
            <Pagination
              data={assets}
              totalData={56}
              setDataPerPage={setDataPerPage}
            />
          </>
        ) : (
          <div className="flex justify-center">
            <div
              className="spin-loader h-5 w-5 text-gray-400 dark:text-white"
              role="status"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Assets
