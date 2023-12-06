// "use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  url?: string
}

const Logo: React.FC<LogoProps> = ({ url }) => {
  return (
    <Link href={url ? url : "/"}>
      <Image
        src={"/images/logo.svg"}
        alt="logo"
        width={150}
        height={40}
        placeholder="blur"
        blurDataURL={"/images/logo.svg"}
        className="dark:hidden"
      />
      <Image
        src={"/images/logo-dark.svg"}
        alt="logo"
        width={150}
        height={40}
        placeholder="blur"
        blurDataURL={"/images/logo-dark.svg"}
        className="hidden dark:block"
      />
    </Link>
  )
}

export default Logo
