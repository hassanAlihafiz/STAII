"use client"

import React, { useLayoutEffect, useState } from "react"
import Image from "next/image"
import { getACHAccount } from "@/async-functions/alpaca/ach-relationship"
import { fetchBankAccounts } from "@/async-functions/bank"
import { useAppDispatch, useAppSelector } from "@/store"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ChevronRight } from "lucide-react"

import AddBankAccountModal from "@/components/modal/transfer/add-bank-account"

const BankAccountSection = () => {
  const dispatch = useAppDispatch()
  const supabase = createClientComponentClient()
  const [bankAccounts, setBankAccounts] = useState<any>([])
  // const bankAccounts = useAppSelector((state) => state.bank.accounts)
  const token = useAppSelector((state) => state?.user?.token)

  const getAccounts = () => {
    getACHAccount(token!)
      .then((e: any) => {
        setBankAccounts(e)
      })
      .catch((e) => {
        console.log("error", e)
      })
  }

  useLayoutEffect(() => {
    fetchBankAccounts()(dispatch, supabase)
    getAccounts()
  }, [])
  return (
    <div className="mt-8">
      <div>
        <h3 className="black-600 text-lg dark:text-white">Linked Accounts</h3>
      </div>
      <div className="mt-3 card-box dark:dark-card-box">
        {bankAccounts?.map((account: any, i: string) => (
          <div
            className="pb-4 cursor-pointer flex justify-between items-center border-b-[1px] border-brand-gray-20 dark:bg-transparent dark:border-brand-gray-90"
            key={i}
          >
            <div className="flex items-center gap-3">
              <div className="bg-brand-green-10 dark:bg-brand-green-100 w-[50px] h-[50px] rounded-full flex items-center justify-center">
                <Image
                  src="/icons/linked-account-icon.svg"
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
              <p className="w-full truncate sm:w-auto black-600 text-base ellip capitalize dark:text-white max-md:text-sm">
                {account?.account_owner_name} ({account?.bank_account_number})
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-brand-gray-50" />
          </div>
        ))}
        <div className="mt-[16px]">
          <AddBankAccountModal />
        </div>
      </div>
    </div>
  )
}

export default BankAccountSection
