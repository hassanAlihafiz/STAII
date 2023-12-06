"use client"

import React, { useState } from "react"
import { classNames } from "react-easy-crop/helpers"

interface toggleGroupProps {
  width?: string
  toggleData?: { title: String; value: number }[]
  setCurrentSellType?: ((sellType: number) => void) | undefined
  className?: string
}

const ToggleGroup_: React.FC<toggleGroupProps> = ({
  width,
  toggleData,
  setCurrentSellType,
  className,
}) => {
  const [checked, setChecked] = useState(Number)

  const toggleGroupItemClasses = `${className} w-full text-center text-brand-gray-60 dark:text-brand-gray-50 font-[600] p-[8px_25px] mx-[5px]  hover:bg-white dark:hover:bg-brand-gray-70 hover:p-[8px_25px] hover:rounded-[8px] hover:mx-[5px] hover:font-[600]`
  const selectedToggleGroupItemClasses = `${toggleGroupItemClasses} text-brand-gray-100 dark:text-white bg-white dark:bg-brand-gray-70 rounded-[8px]`

  const handleItemClick = (index: number) => {
    setChecked(index)
    if (setCurrentSellType) {
      setCurrentSellType(index)
    }
  }

  return (
    <div
      className={`cursor-pointer bg-brand-gray-10 dark:bg-brand-blue-90 dark:border-[1px] dark:border-brand-gray-70 flex justify-center p-[6px_0px] rounded-[12px] ${width}`}
    >
      {toggleData?.map((tog: any, index) => {
        return (
          <div
            key={index}
            className={
              checked == index
                ? selectedToggleGroupItemClasses
                : toggleGroupItemClasses
            }
            onClick={() => handleItemClick(index)}
          >
            {tog?.title}
          </div>
        )
      })}
    </div>
  )
}

export default ToggleGroup_
