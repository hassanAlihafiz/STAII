"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { callPostRoboAnalyzer } from "@/async-functions/roboAnalyzer"
import { useAppDispatch, useAppSelector } from "@/store"
import { getUserAgeWithDOB } from "@/utils/calculate-age"

const radius = 94
const circumference = 2 * Math.PI * radius
const FinancialGoalPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [progress, setProgress] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const dob = useAppSelector((state) => state.user?.profile?.date_of_birth)
  const values = useAppSelector((state) => state.user?.financialInfo)

  const progressOffset = circumference - (progress / 100) * circumference
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      )
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])
  useEffect(() => {
    if (progress >= 100 && isLoading)
      router.push("/robo-analyzer/investment-recommendation")
  }, [progress, isLoading])

  useEffect(() => {
    onSubmit()
  }, [])

  const onSubmit = async () => {
    const _age = getUserAgeWithDOB(String(dob))
    let data = {
      ...values,
      zip_path: "Data/archive.zip",
      extract_dir: "/tmp",
      age: _age,
    }
    const isSuccess = await callPostRoboAnalyzer(data, dispatch)
    if (isSuccess) {
      setIsLoading(true)
    }
  }

  return (
    <section className="form-container  bg-white bg-gradient-to-r from-primary-foreground via-[#0DA475] to-[#008C5D] shadow-xl py-4   m-0">
      <h1 className=" form-title !text-white">Analyzing in process</h1>
      <p className=" form-text mb-7 !text-white">
        Checking your answers data, please wait. Usually that take about x
        seconds
      </p>
      <div className="relative  mx-auto mb-28 mt-20 h-[189px] w-[189px]">
        <svg className="insest-0 absolute  left-0 top-0 h-full w-full">
          <circle
            className="text-[#0B7F5E]"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r={radius - 2}
            cx={radius}
            cy={radius}
          />
          <circle
            className="text-white transition-all duration-500 ease-in-out"
            strokeWidth="5"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={`${progressOffset}`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius - 2}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[40px] font-semibold text-white">
          {progress}
          <span className="absolute -right-2 -top-1 text-sm text-white">%</span>
        </div>
      </div>
    </section>
  )
}

export default FinancialGoalPage
