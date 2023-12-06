"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { setFinancialInfo } from "@/store/slices/user-slice"
import { riskTolerance } from "@/utils/onboarding"

import BackButton from "@/components/auth/onboarding/back-btn"
import OptionsList from "@/components/auth/onboarding/option-list"

const RiskTolerance = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleClick = (value: number, title: string) => {
    dispatch(
      setFinancialInfo({
        value: { risk_tolerance: value },
        text: { risk_tolerance: title },
      })
    )
    router.push("/robo-analyzer/investment-loss")
  }
  return (
    <section className="form-container ">
      <BackButton />
      <h1 className="form-title">Risk Tolerance</h1>
      <OptionsList list={riskTolerance} handleClick={handleClick} />
    </section>
  )
}

export default RiskTolerance
