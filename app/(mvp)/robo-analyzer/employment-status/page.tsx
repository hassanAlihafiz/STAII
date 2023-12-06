"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { setFinancialInfo } from "@/store/slices/user-slice"
import { employmentStatus } from "@/utils/onboarding"

import BackButton from "@/components/auth/onboarding/back-btn"
import OptionsList from "@/components/auth/onboarding/option-list"

const EmploymentStatus = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleClick = (value: number, title: string) => {
    dispatch(
      setFinancialInfo({
        value: { employment_status: value },
        text: { employment_status: title },
      })
    )
    router.push("/robo-analyzer/dependents")
  }
  return (
    <section className="form-container ">
      <BackButton />
      <h1 className="form-title">Employment Status</h1>
      <OptionsList list={employmentStatus} handleClick={handleClick} />
    </section>
  )
}

export default EmploymentStatus
