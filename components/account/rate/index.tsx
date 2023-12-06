import React from "react"

import Card from "@/components/account/card/card-row"

import "@/styles/common-page.css"

const AccountRate = () => {
  return (
    <div className="w-full mt-11">
      <div>
        <h1 className="black-xl-600 dark:text-white">Rate App</h1>
      </div>
      <div className="card-box dark:dark-card-box">
        <Card
          title="Rate the App at the App Store"
          buttonVariant={"arrow"}
          noBorder
        />
      </div>
    </div>
  )
}

export default AccountRate
