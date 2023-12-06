"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { setFinancialInfo } from "@/store/slices/user-slice"
import { dependents } from "@/utils/onboarding"

import { SelectWithSearch } from "@/components/ui/select-with-search"
import BackButton from "@/components/auth/onboarding/back-btn"

const Dependents = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [numDependents, setNumDependents] = useState("")
  const handleClick = () => {
    dispatch(
      setFinancialInfo({
        text: { num_dependents: numDependents },
        value: { num_dependents: Number(numDependents) },
      })
    )
    router.push("/robo-analyzer/analyze")
  }
  return (
    <section className="form-container">
      <BackButton />
      <h1 className="form-title">How many dependents do you have?</h1>
      <SelectWithSearch
        list={dependents}
        placeholder="Dependents"
        value={numDependents}
        setValue={setNumDependents}
      />
      <div className="form-bottom-section">
        <button className="btn  w-full" onClick={handleClick}>
          Continue
        </button>
      </div>
    </section>
  )
}

export default Dependents
