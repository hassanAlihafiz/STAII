import React from "react"

interface Props {
  features: {
    icon: () => JSX.Element
    title: string
    dark?: boolean
  }[]
}
const FeatureList = ({ features }: Props) => {
  return (
    <div className="my-4 w-full">
      {features.map((item, i) => (
        <div
          className="flex w-full items-center justify-start rounded-xl  py-2 "
          key={i}
        >
          <span
            className={`mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#ECFDF5] ${
              item.dark && "dark:bg-[#1E3E34]"
            } `}
          >
            {item.icon()}
          </span>
          <p className="ml-2 text-base  text-[#2D3A43] dark:text-[#EDEEF3]">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  )
}

export default FeatureList
