"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { setFinancialInfo } from "@/store/slices/user-slice"
import { martialStatus } from "@/utils/onboarding"

import BackButton from "@/components/auth/onboarding/back-btn"
import OptionsList from "@/components/auth/onboarding/option-list"

const MartialStatus = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleClick = (value: number, title: string) => {
    dispatch(
      setFinancialInfo({
        value: { marital_status: value },
        text: { marital_status: title },
      })
    )
    router.push("/robo-analyzer/employment-status")
  }
  return (
    <section className="form-container ">
      <BackButton />
      <h1 className="form-title">Martial Status</h1>
      <OptionsList list={martialStatus} handleClick={handleClick} />
    </section>
  )
}

export default MartialStatus
