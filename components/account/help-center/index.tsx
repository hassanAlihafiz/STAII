import React from "react"

import Card from "@/components/account/card/card-row"

import "@/styles/common-page.css"
import HelpCenterDrawer from "@/components/drawer/help-center-drawer"

const AccountHelpCenter = () => {
  const helpCenterData = [
    {
      title: "FAQs",
      noBorder: false,
      description: "Lorem Ipsum",
    },
    {
      title: "Guides",
      noBorder: false,
      description: "Lorem Ipsum",
    },
    {
      title: "Support Chatbot",
      noBorder: false,
      description: "Lorem Ipsum",
    },
    {
      title: "Provide Feedback",
      noBorder: true,
      description: "Lorem Ipsum",
    },
  ]
  return (
    <div className="w-full mt-11">
      <div>
        <h1 className="black-xl-600 dark:text-white">Help center</h1>
      </div>
      <div className="card-box dark:dark-card-box">
        {helpCenterData?.map((el, index) => (
          <HelpCenterDrawer
            title={el?.title}
            description={el?.description}
            key={index}
            border={el?.noBorder}
          />
        ))}
        {/* <Card
            title={el?.title}
            buttonVariant={"arrow"}
            noBorder={el?.noBorder}
          /> */}
      </div>
    </div>
  )
}

export default AccountHelpCenter
