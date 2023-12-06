import Footer from "@/components/footer/footer"
import MobileNavigation from "@/components/footer/mobile-navigatoin"
import { SiteHeader } from "@/components/header/site-header"

import "@/styles/form.css"
import "@/styles/mvp.css"

interface IndexLayoutProps {
  children: React.ReactNode
}

export default function IndexLayout({ children }: IndexLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col -mt-8 md:mt-0">
      <SiteHeader isMvp/>
      {/* <OfflineAlert /> */}
      <div className="flex-1 pb-[105px] md:pb-105 lg:pb-0">{children}</div>
      <Footer />
      <MobileNavigation />
    </div>
  )
}
