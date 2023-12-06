import React from "react"

import Card from "@/components/account/card/card-row"
import ChangePasswordCard from "@/components/account/card/change-password"

import "@/styles/common-page.css"

const AccountSecurity = () => {
  return (
    <div className="w-full mt-11">
      <div>
        <h1 className="black-xl-600 dark:text-white">Security</h1>
      </div>
      <div className="card-box dark:dark-card-box">
        <Card
          title="Two Factor Authentication"
          buttonVariant={"toggle"}
          onSubmit={(value) => {
            console.log(value)
          }}
        />
        <ChangePasswordCard />
      </div>
    </div>
  )
}

export default AccountSecurity
