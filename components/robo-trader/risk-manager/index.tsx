import React, { useState } from "react"
import { handleTripleSliderChange } from "@/utils/slider-functions"
import { sliderLevels } from "@/utils/slider-level"
import { Info, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import SliderWithPercentage from "@/components/ui/slider-with-percentage"
import ToolTipComp from "@/components/ui/tooltip-comp"
import HelpCenterDrawer from "@/components/drawer/help-center-drawer"

interface Fund {
  id: number
  defaultValue: number
  title?: string
  level?: string
  value?: number
  color?: string
}
interface RoboTraderRiskManagerProps {
  riskLevel: number
  setRiskLevel: React.Dispatch<React.SetStateAction<number>>
  incrementRiskLevel: () => void
  decrementRiskLevel: () => void
}

const RoboTraderRiskManager: React.FC<RoboTraderRiskManagerProps> = ({
  riskLevel,
  setRiskLevel,
  incrementRiskLevel,
  decrementRiskLevel,
}) => {
  const [slider, setSlider] = useState<Fund[]>(sliderLevels)

  const handleFundChange = (fundId: number, newValue: number) => {
    const updatedFunds = handleTripleSliderChange(slider, fundId, newValue)
    setSlider(updatedFunds)
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full items-center justify-between  py-2 ">
        <div className="justify flex items-center">
          <ToolTipComp message="This is Risk Calculated based on your answers to the questions in the previous step">
            <HelpCenterDrawer
              optional
              title="Help"
              description="Risk level in investing refers to the uncertainty and potential volatility associated with an investment. It indicates the likelihood of experiencing losses or significant fluctuations in value. Investors assess risk levels to make informed decisions and build portfolios that align with their objectives and tolerance. Common risk levels include low risk (stable returns), moderate risk (balanced potential returns and volatility), and high risk (greater potential returns but also higher volatility). Understanding risk helps investors manage their portfolios effectively based on their goals and preferences."
              border
            />
          </ToolTipComp>
          <p className="ml-2 text-base font-semibold text-[#2D3A43] dark:text-[#EDEEF3]">
            Risk Level
          </p>
        </div>
        <div className="flex items-center ">
          <p className="min-w-max text-lg font-semibold text-[#2D3A43] dark:text-[#EDEEF3]">
            {riskLevel.toFixed(1)} of {(10).toFixed(1)}
          </p>
          <Button
            variant="ghost"
            className="mx-2 aspect-square h-8 rounded-md p-0 md:mx-4 md:h-[52px] md:rounded-xl"
            onClick={decrementRiskLevel}
          >
            <Minus className="aspect-square h-3 sm:h-5" />
          </Button>
          <Button
            variant="ghost"
            className="aspect-square h-8 rounded-md p-0 md:h-[52px] md:rounded-xl"
            onClick={incrementRiskLevel}
          >
            <Plus className="aspect-square h-3 sm:h-5" />
          </Button>
        </div>
      </div>
      <hr className="my-3 w-full bg-[#EDEEF3] dark:border-[#3E4856]" />
      <div className=" flex w-full flex-col">
        {slider.map((level, i) => (
          <div className="my-3 w-full" key={i}>
            <SliderWithPercentage
              key={level.id}
              title={level.level}
              value={level.defaultValue}
              color={level?.color}
              onChange={(newValue) => handleFundChange(level.id, newValue)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoboTraderRiskManager
