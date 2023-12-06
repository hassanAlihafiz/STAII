"use client"

import React, { useState } from "react"

import Card from "@/components/account/card/card-row"
import LanguageDrawer from "@/components/drawer/language-drawer"
import PushNotificationDrawer from "@/components/drawer/push-notification-drawer"

import "@/styles/common-page.css"

const AccountApp = () => {
  const [lngState, setLngState] = useState<any>("English")

  return (
    <div className="w-full mt-11">
      <div>
        <h1 className="black-xl-600 dark:text-white">App</h1>
      </div>
      <div className="card-box dark:dark-card-box">
        <Card title="Dark Mode" buttonVariant={"darkMode"} />
        <LanguageDrawer lngState={lngState} setLngState={setLngState} />
        <PushNotificationDrawer />
      </div>
    </div>
  )
}

export default AccountApp
