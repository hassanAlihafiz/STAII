import React from "react"
import { MoveUp } from "lucide-react"

import { Button } from "../ui/button"

interface PortfolioHeaderProps {
  amount: string
}
const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ amount }) => {
  return (
    <div className="flex w-full items-center justify-between py-1">
      <div className="flex flex-col items-start">
        <h2 className=" text-[32px] font-semibold text-[#2A3033] dark:text-white">
          ${amount}
        </h2>
        <div className="flex flex-col-reverse items-start -ml-1 md:ml-0 md:flex-row justify-start md:items-center">
          <p className="flex flex-row items-center text-sm font-medium text-[#9CA5AF] dark:text-[#D7DBE0]">
            <span className="mr-1 flex flex-row items-center text-primary-foreground">
              <MoveUp className="-mr-1 h-3  text-inherit" /> $100.11 (1.7%)
            </span>{" "}
            last month &nbsp;
          </p>
          <p className="flex flex-row items-center text-sm font-medium text-[#9CA5AF] dark:text-[#D7DBE0]">
            <MoveUp className="-mr-1 h-3 " /> $1.02 (0.11%) today
          </p>
        </div>
      </div>
      <div className="hidden md:flex items-center">
        <Button
          className="mr-2 max-w-[119px] border border-[#C1F0DB] font-medium capitalize"
          variant={"ghost"}
        >
          withdraw
        </Button>
        <Button
          variant={"ghost"}
          className=" max-w-[119px] border border-[#C1F0DB] font-medium capitalize"
        >
          Deposit
        </Button>
      </div>
    </div>
  )
}

export default PortfolioHeader
