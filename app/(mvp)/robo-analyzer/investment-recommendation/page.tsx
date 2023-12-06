"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store"
import { Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import BackButton from "@/components/auth/onboarding/back-btn"

const RiskTolerance = () => {
  const router = useRouter()
  const user = useAppSelector(
    (state) => state?.user?.profile?.investment_accomodation
  )
  const financial = useAppSelector((state) => state?.user?.financialInfo)

  const numberWithCommasAndDecimals = (number: number) => {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const handleClick = (title: string) => {
    router.push("/sign-up/personalized-portfolio")
  }
  return (
    <section className="form-container ">
      <BackButton />
      <h1 className="form-title">Financial Analysis Results</h1>
      <p className="form-text mb-7">
        It determines your comfort while trading and helps create a balanced
        portfolio
      </p>
      <div className="flex w-full items-center justify-between rounded-xl bg-[#E8FFF0] p-4 dark:bg-[#1E3E34]">
        <div className="flex-start flex flex-col">
          <p className="text-base font-semibold text-[#2D3A43] dark:text-[#EDEEF3]">
            Recommended amount to invest
          </p>
          <h4 className="text-[32px] font-semibold text-[#2D3A43]  dark:text-white">
            {"$" +
              numberWithCommasAndDecimals(
                user?.investment_strategy?.recommended_investment_amount
              )}
          </h4>
        </div>
        <Button
          variant={"ghost"}
          className="h-10 max-w-fit rounded-xl  border border-[#C1F0DB] font-medium capitalize text-primary-foreground"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 flex w-full flex-col items-start justify-start rounded-xl bg-[#F9F9F9] p-4  dark:bg-[#2D374E]">
        <h5 className=" text-base font-semibold text-[#2D3A43] dark:text-[#EDEEF3]">
          Income & spendings
        </h5>
        <div className="flex-start mb-1 mt-4 flex w-full justify-between ">
          <span className="light-text text-[#9CA5AF]">Income</span>
          <span className="light-text text-[#9CA5AF]">Expense</span>
        </div>
        <Progress
          className="h-[14px] bg-[#EDEEF3] dark:bg-[#1B2335]"
          value={94}
          fill="#25BF7A"
        />
        <div className="flex-start  mt-1 flex w-full justify-between ">
          <span className="light-text text-sm     text-primary-foreground">
            {user?.investment_strategy?.cashflow_to_networth_ratio + "%"}
          </span>
          <span className="light-text text-sm     text-destructive">
            {user?.investment_strategy?.expenses_to_income_ratio + "%"}
          </span>
        </div>
        <hr className=" my-4 w-full bg-[#EDEEF3] dark:bg-[#3E4856]" />
        <div className="   flex w-full justify-start ">
          <div className="flex w-1/3 flex-col items-start">
            <span className="light-text mb-1 text-[#838395] ">Income</span>
            <span className=" text-base font-semibold uppercase text-[#069D6E] ">
              {"$" +
                numberWithCommasAndDecimals(Number(financial?.annual_income))}
            </span>
          </div>

          <div className="flex w-1/3 flex-col items-start">
            <span className="light-text mb-1 text-[#838395]">Expense</span>
            <span className="text-base font-semibold text-destructive ">
              {"$" +
                numberWithCommasAndDecimals(
                  Number(financial?.monthly_expenses)
                )}
            </span>
          </div>
          <div className="flex w-1/3 flex-col items-start">
            <span className="light-text mb-1 text-[#838395] ">cash flow</span>
            <span className="mb-2 text-base font-semibold uppercase text-black dark:text-white">
              {"$" +
                numberWithCommasAndDecimals(
                  user?.investment_strategy?.monthly_cashflow
                )}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex w-full items-center justify-between rounded-xl bg-[#F9F9F9] p-4 dark:bg-[#2D374E]">
        <div className="flex flex-col items-start justify-start">
          <h5 className=" text-base font-semibold text-[#2D3A43] dark:text-[#EDEEF3]">
            Amount to save a month
          </h5>
          <span className="text-sm font-normal text-[#838395] dark:text-[#D7DBE0]">
            Based off your income and spendings
          </span>
        </div>
        <span className="text-2xl font-semibold uppercase text-[#2A3033] dark:text-white">
          {"$" +
            numberWithCommasAndDecimals(
              user?.investment_strategy.monthly_savings_with_emergency_fund
            )}
        </span>
      </div>
      <div className="form-bottom-section">
        <Button className="mt-6" onClick={() => handleClick("Conservative")}>
          Continue
        </Button>
      </div>
    </section>
  )
}

export default RiskTolerance
