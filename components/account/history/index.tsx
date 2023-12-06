import React from "react"

import Card from "@/components/account/card/card-row"

import "@/styles/common-page.css"
import Link from "next/link"

const AccountHistory = () => {
  return (
    <div className="w-full mt-11">
      <div>
        <h1 className="black-xl-600 dark:text-white">History</h1>
      </div>
      <div className="card-box dark:dark-card-box">
        <Link href="/trading-activity">
          <Card title="Trading Activity" buttonVariant={"arrow"} />
        </Link>
        <Link href="/transfer/history">
          <Card title="Transfers" noBorder buttonVariant={"arrow"} />
        </Link>
      </div>
    </div>
  )
}

export default AccountHistory
