import React from "react"
import Image from "next/image"

interface Props {
  list: { title: string; value: number; icon?: () => React.ReactNode }[]
  handleClick: (data: number, title: string) => void
}
const OptionsList = ({ list, handleClick }: Props) => {
  return (
    <div className="mt-6 flex w-full flex-col items-center justify-center">
      {list?.map((item, index) => (
        <div
          className={` my-2 flex w-full cursor-pointer  items-center justify-between border-[#EDEEF3]  px-1 py-3 transition-all hover:rounded-xl hover:border-transparent hover:bg-[#ECFDF5] dark:border-[#3E4856] dark:hover:border-transparent dark:hover:bg-[#1E3E34] ${
            index < list.length - 1 && "border-b "
          }`}
          key={index}
          onClick={() => handleClick(item.value, item?.title)}
        >
          <div className="flex items-center  justify-start ">
            {item.icon && (
              <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-[#ECFDF5] text-[#01A954] dark:bg-[#1E3E34]">
                {item.icon()}
              </span>
            )}
            <h6 className="ml-3 text-base font-semibold text-[#2A3033] dark:text-white ">
              {item.title}
            </h6>
          </div>
          <Image alt="" src="/icons/next.svg" width={20} height={20} />
        </div>
      ))}
    </div>
  )
}

export default OptionsList
