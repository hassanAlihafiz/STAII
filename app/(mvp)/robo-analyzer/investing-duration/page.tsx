"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { setFinancialInfo } from "@/store/slices/user-slice"
import { investingDuration } from "@/utils/onboarding"

import BackButton from "@/components/auth/onboarding/back-btn"
import OptionsList from "@/components/auth/onboarding/option-list"

const InvestingDuration = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleClick = (value: number, title: string) => {
    dispatch(
      setFinancialInfo({
        value: { investment_time_horizon: value },
        text: { investment_time_horizon: title },
      })
    )
    router.push("/robo-analyzer/risk-tolerance")
  }
  return (
    <section className="form-container ">
      <BackButton />
      <h1 className="form-title">
        When do you expect to need the funds you’re investing?
      </h1>
      <OptionsList list={investingDuration} handleClick={handleClick} />
    </section>
  )
}

export default InvestingDuration
