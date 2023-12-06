import React from "react"
import { useAppDispatch } from "@/store"
import { setShowLogout } from "@/store/slices/user-slice"

import "@/styles/common-page.css"
import { LogOut } from "lucide-react"

import CustomRow from "../card/custom-row"

const AccountLogout = () => {
  const dispatch = useAppDispatch()
  return (
    <div className="w-full mt-11">
      <div>
        <h1 className="black-xl-600 dark:text-white">Log out</h1>
      </div>
      <div
        className="card-box dark:dark-card-box cursor-pointer relative"
        onClick={() => dispatch(setShowLogout(true))}
      >
        <CustomRow title="Log out">
          <LogOut className="w-5 h-5 text-brand-gray-50 absolute right-3 top-1/2 -translate-y-1/2" />
        </CustomRow>
      </div>
    </div>
  )
}

export default AccountLogout
