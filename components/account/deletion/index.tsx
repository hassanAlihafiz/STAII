import React from "react"

import AccountDeletionModal from "@/components/modal/account/account-deletion-modal"

import "@/styles/common-page.css"

const AccountDeletion = () => {
  return (
    <div className="w-full mt-11 cursor-pointer">
      <div>
        <h1 className="black-xl-600 dark:text-white">Account Deletion</h1>
      </div>
      <div>
        <p className="text-brand-gray-60 dark:text-brand-gray-30 text-lg font-normal mt-[5px]">
          This action cannot be reverted
        </p>
      </div>
      <div className="card-box dark:delete-card-box cursor-pointer">
        <AccountDeletionModal />
      </div>
    </div>
  )
}

export default AccountDeletion
