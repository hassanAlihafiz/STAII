"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { setFinancialInfo } from "@/store/slices/user-slice"
import { investingexperience } from "@/utils/onboarding"

import BackButton from "@/components/auth/onboarding/back-btn"
import OptionsList from "@/components/auth/onboarding/option-list"

const InvestingExperience = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleClick = (value: number, title: string) => {
    dispatch(
      setFinancialInfo({
        value: { investment_experience: value },
        text: { investment_experience: title },
      })
    )
    router.push("/robo-analyzer/investing-duration")
  }
  return (
    <section className="form-container ">
      <BackButton />
      <h1 className="form-title">
        How much experience do you have with investing?
      </h1>
      <OptionsList list={investingexperience} handleClick={handleClick} />
    </section>
  )
}

export default InvestingExperience
