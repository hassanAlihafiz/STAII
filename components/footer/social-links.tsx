import React from "react"
import Image from "next/image"

import { siteConfig } from "@/config/site"

const SocialLinks = () => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
        <Image
          src="/icons/twitter-dark.svg"
          width={24}
          className="hidden cursor-pointer transition-all hover:scale-110 dark:block"
          height={24}
          alt="twitter"
        />
        <Image
          src="/icons/twitter.svg"
          width={24}
          height={24}
          className="cursor-pointer transition-all hover:scale-110 dark:hidden"
          alt="twitter"
        />
      </a>
      <a href={siteConfig.links.tiktok} target="_blank" rel="noreferrer">
        <Image
          src="/icons/tiktok-dark.svg"
          width={24}
          className="hidden cursor-pointer transition-all hover:scale-110 dark:block"
          height={24}
          alt="tiktok"
        />
        <Image
          src="/icons/tiktok.svg"
          width={24}
          height={24}
          className="cursor-pointer transition-all hover:scale-110 dark:hidden"
          alt="tiktok"
        />
      </a>
      <a href={siteConfig.links.discord} target="_blank" rel="noreferrer">
        <Image
          src="/icons/discord-dark.svg"
          width={24}
          className="hidden cursor-pointer transition-all hover:scale-110 dark:block"
          height={24}
          alt="discord"
        />
        <Image
          src="/icons/discord.svg"
          width={24}
          height={24}
          className="cursor-pointer transition-all hover:scale-110 dark:hidden"
          alt="discord"
        />
      </a>
      <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer">
        <Image
          src="/icons/instagram-dark.svg"
          width={24}
          className="hidden cursor-pointer transition-all hover:scale-110 dark:block"
          height={24}
          alt="instagram"
        />
        <Image
          src="/icons/instagram.svg"
          width={24}
          height={24}
          className="cursor-pointer transition-all hover:scale-110 dark:hidden"
          alt="instagram"
        />
      </a>
      <a href={siteConfig.links.threads} target="_blank" rel="noreferrer">
        <Image
          src="/icons/threads-dark.svg"
          width={24}
          className="hidden cursor-pointer transition-all hover:scale-110 dark:block"
          height={24}
          alt="threads"
        />
        <Image
          src="/icons/threads.svg"
          width={24}
          className="cursor-pointer transition-all hover:scale-110 dark:hidden"
          height={24}
          alt="threads"
        />
      </a>
    </div>
  )
}

export default SocialLinks
