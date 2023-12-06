"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import "@/styles/common-page.css"
import { getTradingAccountById } from "@/async-functions/alpaca/account"
import { useAppSelector } from "@/store"
import { ArrowLeftCircle } from "lucide-react"

import BackBtn from "@/components/ui/back-button"
import BankAccountSection from "@/components/transfer/banks"
import TransferCard from "@/components/transfer/transfer-card"

interface TransferProps {
  last_equity: number
}

const TransferPage = () => {
  const token = useAppSelector((state) => state?.user?.token)
  const [details, setDetails] = useState<TransferProps>({ last_equity: 0 })
  const getAccountDetails = () => {
    getTradingAccountById(token!)
      .then((e: any) => {
        setDetails({ last_equity: e?.last_equity })
      })
      .catch((e) => {
        console.log("err", e)
      })
  }

  useEffect(() => {
    getAccountDetails()
  }, [])
  return (
    <div className="w-full max-w-[600px] m-[auto] md:mt-6 mb-6 flex flex-col overflow-hidden">
      <div className="z-10 card-box dark:dark-card-box md:border-shadow">
        <div className="max-md:hidden">
          <BackBtn />
        </div>
        <Link
          href="/market/robo-analyzer"
          className="hidden max-md:inline-block"
        >
          <ArrowLeftCircle
            strokeWidth={"0.5px"}
            size={"35px"}
            className="stroke-brand-gray-50 dark:fill-brand-gray-70"
          />
        </Link>
        <div className="mt-3">
          <div>
            <h1 className="black-600 text-2xl leading-10 dark:text-white">
              Transfers
            </h1>
          </div>
          <div>
            <p className="text-sm text-brand-gray-60 font-normal dark:text-brand-gray-30">
              Funds available for withdraw: ${details?.last_equity}{" "}
            </p>
          </div>
        </div>
        <div className="card-box dark:dark-card-box ">
          <div>
            <TransferCard
              link="/transfer/deposite"
              src="/icons/socail-trader-icon.svg"
              title="Transfer to SocialTrader AI"
              showBorder={true}
            />
          </div>
          <div>
            <TransferCard
              link="/transfer/withdraw"
              src="/icons/with-draw-icon.svg"
              title="Withdraw to Bank Account"
            />
          </div>
        </div>

        <BankAccountSection />
      </div>
    </div>
  )
}

export default TransferPage
