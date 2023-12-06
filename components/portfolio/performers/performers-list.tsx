import React from "react"
import { MoveUp } from "lucide-react"

interface Props {
  list: {
    name: string
    current: string
    value: string
    change: string
  }[]
}
const PerformerList = ({ list }: Props) => {
  return (
    <div className="w-full p-6 ">
      <h2 className=" mb-4 text-lg font-semibold text-[#2A3033] dark:text-white capitalize">
        Your top performers
      </h2>
      <ul className="w-full">
        {list.map((item, i) => (
          <li className="mb-5 flex w-full items-center justify-between">
            <div className="mr-auto flex flex-col items-start">
              <h3 className="text-base font-semibold text-[#2A3033] dark:text-white capitalize">
                {item.name}
              </h3>
              <span className="text-sm font-medium text-[#6A7381] dark:text-[#A1A7B3]">
                {item.current} Current
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-[#2A3033] dark:text-white">
                {item.value}
              </span>
              <span className="flex items-center text-sm font-medium  text-primary-foreground">
                <MoveUp className="aspect-square w-[14px] text-primary-foreground" />{" "}
                {item.change}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PerformerList
