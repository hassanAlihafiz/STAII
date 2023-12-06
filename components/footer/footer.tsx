import React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"

import Logo from "../header/logo"
import SocialLinks from "./social-links"

const Footer = () => {
  return (
    <footer className="hidden lg:block mb-2 border-t border-[#F4F5FA]  py-6 text-center dark:border-[#2D3A43] md:mb-0 md:px-4 mt-10">
      <div className="container mx-auto flex flex-col items-center justify-between ">
        <div className="mb-10 flex w-full  items-center justify-between ">
          <Logo />
          <SocialLinks />
        </div>
        <p className="w-full  text-left text-sm text-black dark:text-white ">
          SocialTrader.ai Inc. a California-domiciled SEC-registered
          Internet-Only investment adviser. Our firm is notice-filed in
          California, and we are exempt from notice-filing in other
          jurisdictions where we serve our clients.
        </p>
        <div className="mt-6 flex w-full items-end justify-between ">
          <div className="align-start  flex flex-col justify-end lg:flex  lg:flex-row lg:justify-evenly lg:space-x-4">
            {siteConfig.footerNav.map((link, index) => (
              <Link href={link.href} key={index}>
                <p
                  className="mb-2 min-w-max text-left text-sm font-medium  text-gray-700
            hover:underline dark:text-white lg:mb-0"
                >
                  {link.title}
                </p>
              </Link>
            ))}
          </div>
          <div className="max-w-[110px] text-right text-xs font-medium text-gray-400 xl:max-w-max">
            {siteConfig.rights}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
