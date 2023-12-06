import React from "react"

import Card from "@/components/account/card/card-row"

import "@/styles/common-page.css"

const AccountSubscriptions = () => {
  return (
    <div className="w-full mt-11">
      <div>
        <h1 className="black-xl-600 dark:text-white">Subscriptions</h1>
      </div>
      <div className="card-box dark:dark-card-box">
        <Card
          title="RoboAnalyzer"
          description="RoboAnalyzer will assess your financial health, and investment goals to formulate a comprehensive financial profile"
          buttonText="Start"
          buttonVariant="default"
          buttonStyle="w-[105px]"
          onSubmit={() => {}}
        />
        <Card
          title="RoboTrader"
          description="AI will analyze risk profile, to provide insights into investment and savings potential"
          buttonText="Start"
          buttonVariant="default"
          buttonStyle="w-[105px]"
          onSubmit={() => {}}
        />
        <Card
          title="RoboFunds"
          description="AI will analyze risk profile, to provide insights into investment and savings potential"
          buttonText="View"
          buttonStyle="w-[105px]"
          buttonVariant="default"
          onSubmit={() => {}}
          noBorder
        />
      </div>
    </div>
  )
}

export default AccountSubscriptions
