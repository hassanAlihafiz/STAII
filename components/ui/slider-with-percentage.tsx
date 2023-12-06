import React, { useState } from "react"
import * as Slider from "@radix-ui/react-slider"

type Props = {
  title?: string
  level?: string
  value: number
  color?: string
  onChange: (value: number) => void
}

const SliderWithPercentage = ({
  title,
  level,
  value,
  color = "#609EFA",
  onChange,
}: Props) => {
  return (
    <div className={`${title ? "" : "flex items-center space-x-2"}`}>
      {title && <h4 className="font-semibold mb-1">{title}</h4>}
      {level && <p className="w-[70px] shrink-0 font-semibold">{level}</p>}
      <div className="flex-1 flex items-center space-x-2">
        <Slider.Root
          className="relative w-full h-5 flex items-center select-none touch-none"
          value={[value]}
          max={100}
          step={1}
          onValueChange={(e) => {
            onChange(e[0])
          }} // Call 'onChange' prop with the new value
        >
          <Slider.Track className="SliderTrack relative h-1 bg-brand-gray-20 dark:bg-brand-gray-80 rounded-full grow">
            <Slider.Range
              className="h-full absolute rounded-full"
              style={{ backgroundColor: color }}
            />
          </Slider.Track>
          <Slider.Thumb className="range-slider-thumb" aria-label="Volume">
            <svg
              width="9"
              height="10"
              viewBox="0 0 9 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.773193"
                y="0.5"
                width="1.5"
                height="9"
                rx="0.75"
                fill="#9CA5AF"
              />
              <rect
                x="7.27319"
                y="0.5"
                width="1.5"
                height="9"
                rx="0.75"
                fill="#9CA5AF"
              />
            </svg>
          </Slider.Thumb>
        </Slider.Root>

        <div className="dark:bg-brand-blue-90 w-14 shrink-0 text-sm border border-brand-gray-30 dark:to-brand-gray-70 rounded-lg px-3 py-2.5">
          <p className="font-medium">{value}%</p>
        </div>
      </div>
    </div>
  )
}

export default SliderWithPercentage
