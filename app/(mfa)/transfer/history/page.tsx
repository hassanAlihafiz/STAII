"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import "@/styles/common-page.css"
import { useAppSelector } from "@/store"
import { callGetApiWithAuth } from "@/utils/api"
import { ArrowLeftCircle, ChevronRight } from "lucide-react"

import { AccountActivity } from "@/types/alpaca"
import BackBtn from "@/components/ui/back-button"
import TransferDetails from "@/components/drawer/transfer-details"

const TransferHistory = () => {
  const [details, setDetails] = useState<any>({})
  const [transferHistory, setTransferHistory] = useState<
    AccountActivity[] | null
  >(null)
  const [open, setOpen] = useState(false)
  const token = useAppSelector((state) => state.user.token)

  useEffect(() => {
    if (!token) return
    console.log("hi")
    let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"

    callGetApiWithAuth(
      "alpaca",
      `v1/accounts/activities?account_id=${accountId}`,
      (e) => {
        console.log("resolved")
        setTransferHistory(e)
      },
      token,
      (err) => {
        console.log(err)
      }
    )
  }, [token])

  return (
    <div className="w-full max-w-[650px] m-[auto] md:mt-6 mb-6 flex flex-col overflow-hidden">
      <div className="z-10">
        <div className="max-md:hidden">
          <BackBtn />
        </div>
        <div className="md:hidden flex items-center justify-between pt-10 pl-3 pr-8 ">
          <Link href="/account">
            <div>
              <ArrowLeftCircle
                strokeWidth={"0.5px"}
                size={"35px"}
                className="stroke-brand-gray-50 dark:fill-brand-gray-70"
              />
            </div>
          </Link>
          <div>
            <h1 className="black-600 text-base text-center leading-6 dark:text-white">
              Transfers history
            </h1>
          </div>
          <div></div>
        </div>
        <div className="max-md:hidden mt-3 ">
          <h1 className="black-600 text-2xl leading-10 dark:text-white">
            Transfers history
          </h1>
        </div>
        <div className="mobile-card-box md:card-box md:dark:dark-card-box md:border-shadow md:!pt-6 max-md:!pt-0 max-md:!mt-2">
          <div>
            {transferHistory?.map((transfer, index: number) => {
              return (
                <>
                  <div key={index}>
                    <h3 className="black-600 text-lg pb-1.5 pt-3  dark:text-white">
                      {transfer?.activity_type}
                    </h3>
                  </div>

                  <div
                    onClick={() => {
                      setDetails(transfer)
                      setOpen(!open)
                    }}
                    className={`flex-center-between my-2 cursor-pointer 
                  ${
                    index !== transferHistory.length - 1
                      ? "pb-2 border-b-2 border-brand-gray-20  dark:border-brand-gray-80 "
                      : ""
                  }
                  `}
                  >
                    <div>
                      <div>
                        <p className="black-500 text-[13px] pb-0.5  dark:text-white">
                          {transfer?.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-brand-gray-60 text-xs font-normal  dark:text-brand-gray-30">
                          {transfer.description} {transfer?.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex-center-between">
                      <div>
                        <p
                          className={`text-[13px]  font-medium mr-2 
                          ${
                            transfer?.net_amount?.startsWith("-")
                              ? "text-brand-gray-100 dark:text-white"
                              : "text-brand-green-70"
                          }
                          `}
                        >
                          {transfer?.net_amount}
                        </p>
                      </div>
                      <div>
                        <ChevronRight className="w-4 h-4 text-brand-gray-50" />
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
            <TransferDetails
              setDetails={setDetails}
              details={details}
              open={open}
              setOpen={setOpen}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default TransferHistory
