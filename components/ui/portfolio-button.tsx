import React from "react"

type iButtonProps = {
  children: React.ReactNode
  full?: boolean
  variant?: "green" | "red"
  disabled?: boolean
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<iButtonProps> = ({
  children,
  full,
  variant,
  disabled,
  className,
  onClick,
}) => {
  const joinedClasses = `rounded-xl text-sm xl:text-base font-semibold ring-1 px-5 py-2.5 xl:py-3 transition duration-200
    ${
      disabled
        ? `bg-brand-gray-40 hover:bg-brand-gray-20 text-white hover:text-brand-gray-50 ring-brand-gray-40`
        : variant === "red"
        ? "bg-brand-red-10 ring-brand-red-20 hover:ring-brand-red-70 text-brand-red-70"
        : "bg-brand-green-20 ring-brand-green-40 hover:ring-brand-green-70 text-brand-green-70"
    }
    ${full ? "w-full md:w-auto" : ""} ${className}`

  return (
    <button className={joinedClasses} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
