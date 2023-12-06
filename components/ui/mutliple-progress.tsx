import React from "react"

interface Props {
  list: { color: string; value: number; [key: string]: any }[]
}
const MultipleProgress = ({ list }: Props) => {
  return (
    <div className="relative  flex h-[14px] w-full flex-row overflow-hidden rounded-full bg-gray-200">
      {list.map((item, index) => (
        <div
          key={index}
          className={` h-full   transition-all`}
          style={{
            width: `${item.value}%`,
            background: item.color,
          }}
        />
      ))}
    </div>
  )
}

export default MultipleProgress
