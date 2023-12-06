import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SubNavProps {
  pageData: {
    name: string
    href: string
  }[]
}

function SubNavHeader({ pageData }: SubNavProps) {
  const pathname = usePathname()
  return (
    <div className="w-full">
      <ul className="flex    items-center border-b border-b-[#EDEEF3] dark:border-b-[#2D374E] w-full max-w-[1280px] overflow-auto">
        {pageData.map((link: any, i: number) => (
          <li
            className={`relative mr-6 grid h-full place-items-center `}
            key={i}
          >
            <Link
              href={link.href}
              className={`font-medium py-5 capitalize text-[#2A3033] dark:text-white ${
                pathname !== link.href && "text-[#6A7381] dark:text-[#D7DBE0]"
              }`}
            >
              {link.name}
            </Link>

            <span
              className="absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2  bg-primary-foreground  transition-all duration-300 "
              style={
                pathname === link.href ? { width: "100%" } : { width: "0" }
              }
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SubNavHeader
