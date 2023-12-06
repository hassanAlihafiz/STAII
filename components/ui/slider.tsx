"use client"

import * as React from "react"
import Image from "next/image"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

type SliderPropTypes = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> & {
  fillStyles: string
}
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderPropTypes
>(({ className, fillStyles, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full max-w-[90%] touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-[#EAEAEC] dark:bg-[#3E4856]">
      <SliderPrimitive.Range className={`absolute h-full ${fillStyles} `} />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className="relative block h-6 w-fit cursor-grab outline-none">
      <Image
        src="/images/market/slider-thumb.svg"
        alt="slider-thumb"
        width={10}
        height={6}
      />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
