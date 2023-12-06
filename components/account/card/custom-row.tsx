import React from "react"

interface Props {
  children?: React.ReactNode
  title: string
  description?: string
}
const CustomRow = ({ children, title, description }: Props) => {
  return (
    <div className="w-full flex-center-between flex-wrap gap-4">
      <div>
        <div
          className={`text-base font-medium text-brand-gray-100 dark:text-white
            } leading-[30px]`}
        >
          {title}
        </div>
        {description && (
          <div className="text-brand-gray-60 dark:text-brand-gray-30 text-sm font-normal">
            {description}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

export default CustomRow
