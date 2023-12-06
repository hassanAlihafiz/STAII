"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { setFinancialInfo } from "@/store/slices/user-slice"
import { primaryfinancialgoal } from "@/utils/onboarding"

import BackButton from "@/components/auth/onboarding/back-btn"
import OptionsList from "@/components/auth/onboarding/option-list"

const FinancialGoalPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleClick = (value: number, title: string) => {
    dispatch(
      setFinancialInfo({
        value: { primary_goal: value },
        text: { primary_goal: title },
      })
    )
    router.push("/robo-analyzer/annual-income")
  }
  return (
    <section className="form-container ">
      <BackButton />
      <h1 className="form-title">What is your primary financial goal?</h1>
      <OptionsList list={primaryfinancialgoal} handleClick={handleClick} />
    </section>
  )
}

export default FinancialGoalPage
