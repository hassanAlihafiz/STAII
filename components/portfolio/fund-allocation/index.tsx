import React, { useState } from "react"
import { handleDoubleSlider } from "@/utils/slider-functions"

import SliderWithPercentage from "@/components/ui/slider-with-percentage"

interface Fund {
  id: number
  defaultValue: number
  title?: string
  level?: string
  value?: number
  color?: string
}

interface FundAllocationProps {
  initialFunds: Fund[]
}

const FundAllocation: React.FC<FundAllocationProps> = ({ initialFunds }) => {
  const [funds, setFunds] = useState<Fund[]>(initialFunds)

  const handleFundChange = (fundId: number, newValue: number) => {
    const updatedFunds = handleDoubleSlider(funds, fundId, newValue)
    setFunds(updatedFunds)
  }

  return (
    <div className="py-7">
      <div>
        <h3 className="text-lg font-semibold">Funds allocation</h3>
        <p className="text-sm text-brand-gray-50 dark:text-brand-gray-30">
          Here you can adjust the percentage of allocations of funds to each
          type of automated trading
        </p>
      </div>

      <div className="space-y-4 mt-5">
        {funds.map((fund) => (
          <SliderWithPercentage
            key={fund.id}
            title={fund.title}
            value={fund.defaultValue}
            onChange={(newValue) => handleFundChange(fund.id, newValue)}
          />
        ))}
      </div>
    </div>
  )
}

export default FundAllocation
