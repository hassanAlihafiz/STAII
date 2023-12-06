import React from "react"

import StockLi from "../stock/stock-li"

interface Props {
  title?: string
  list: {
    name: string
    symbol: string
    image: string
    change: number
  }[]
}
const Watchlist = ({ list, title = "Watchlist" }: Props) => {
  return (
    <div className="w-full p-6 ">
      <h2 className=" mb-4 text-lg font-semibold text-[#2A3033] dark:text-white">
        {title}
      </h2>
      <ul className="w-full">
        {list.map((stock, i) => (
          <StockLi stock={stock} key={i} />
        ))}
      </ul>
    </div>
  )
}

export default Watchlist
