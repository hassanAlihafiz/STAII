"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { setFinancialInfo } from "@/store/slices/user-slice"
import { investmentRiskResponse } from "@/utils/onboarding"

import BackButton from "@/components/auth/onboarding/back-btn"
import OptionsList from "@/components/auth/onboarding/option-list"

const InvestingLossReaction = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleClick = (value: number, title: string) => {
    dispatch(
      setFinancialInfo({
        value: { reaction_to_investment_loss: value },
        text: { reaction_to_investment_loss: title },
      })
    )
    router.push("/robo-analyzer/martial-status")
  }
  return (
    <section className="form-container ">
      <BackButton />
      <h1 className="form-title">
        If your investments were to lose 10% of their value in a short period,
        how would you react?
      </h1>
      <OptionsList list={investmentRiskResponse} handleClick={handleClick} />
    </section>
  )
}

export default InvestingLossReaction
