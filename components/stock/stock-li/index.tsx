import React from "react"
import Image from "next/image"
import { Button } from "@/ui/button"
import { MoveDown, MoveUp } from "lucide-react"

interface Props {
  stock: {
    name: string
    symbol: string
    image: string
    change: number
  }
}

const StockLi = ({ stock }: Props) => {
  return (
    <li className="mb-5 flex w-full items-center justify-between">
      <div className="flex items-center">
        <div className="relative mr-2 aspect-square h-[24px] w-[24px] overflow-hidden rounded-full">
          <Image src={stock.image} alt="stock" fill />
        </div>
        <div className="ml-2 mr-auto flex flex-col items-start">
          <h3 className=" text-base font-semibold text-[#2A3033] dark:text-white">
            {stock.symbol}
          </h3>
          <span className="text-xs font-medium text-[#2B2D42] dark:text-white">
            {stock.name}
          </span>
        </div>
      </div>
      <div className="flex  items-end">
        {stock.change > 0 ? (
          <span className="flex items-center text-sm font-medium  text-primary-foreground">
            <MoveUp className="aspect-square w-[14px] text-primary-foreground" />
            {stock.change}
          </span>
        ) : (
          <span className="flex items-center text-sm font-medium  text-destructive">
            <MoveDown className="text-desctructive aspect-square w-[14px]" />
            {stock.change}
          </span>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="ml-4 h-8 border border-[#C1F0DB] px-4"
        >
          Buy
        </Button>
      </div>
    </li>
  )
}

export default StockLi
