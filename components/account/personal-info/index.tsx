import React from "react"

import Card from "@/components/account/card/card-row"

import "@/styles/common-page.css"
import {
  updateUserAddress,
  updateUserEmail,
  updateUserName,
  uploadImageAndSaveToProfile,
} from "@/async-functions/account"
import { useAppDispatch, useAppSelector } from "@/store"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { ButtonProps } from "@/components/ui/button"
import AccountProfileModal from "@/components/modal/account/account-profile-modal"

interface PersonalInfoProps {
  selectedImage?: any
  setSelectedImage?: any
  setProfileImage?: any
  profile?: any
}

const AccountPersonalInfo = ({
  selectedImage,
  setSelectedImage,
  setProfileImage,
  profile,
}: PersonalInfoProps) => {
  const dispatch = useAppDispatch()
  const supabase = createClientComponentClient()
  const userId = useAppSelector((state) => state.user.profile?.uid) as string
  const token = useAppSelector((state) => state.user.token)
  const cardData = [
    {
      title: "Name of the User",
      description: profile?.name,
      buttonText: "Edit",
      buttonvariant: "ghost",
      cardBorder: true,
      buttonStyle: "w-[70px]",
    },
    {
      title: "Name",
      description: profile?.name,
      buttonText: "Edit",
      buttonvariant: "ghost",
      cardBorder: true,
      buttonStyle: "w-[70px]",
    },
    {
      title: "Email",
      description: profile?.email,
      cardBorder: true,
      buttonStyle: "w-[70px]",
    },
    {
      title: "Address",
      description: profile?.street_address ? profile?.street_address : "",
      buttonText: "Edit",
      buttonvariant: "ghost",
      buttonStyle: "w-[70px]",
      cardBorder: false,
    },
  ]

  const updateUserDetails = async (title: string, value: string) => {
    switch (title) {
      case "Name of the User":
        return await updateUserName(value, userId, token!)(supabase, dispatch)
      case "Name":
        return await updateUserName(value, userId, token!)(supabase, dispatch)
      case "Email":
        return await updateUserEmail(value, userId)(supabase, dispatch)
      case "Address":
        return await updateUserAddress(value, userId)(supabase, dispatch)
    }
  }

  const updateUserProfileImage = async (file: File) => {
    await uploadImageAndSaveToProfile(file, userId, token!)(supabase, dispatch)
  }
  return (
    <div>
      <div>
        <h1 className="black-xl-600 dark:text-white">Personal Info</h1>
      </div>
      <div className="card-box cursor-pointer dark:dark-card-box">
        <AccountProfileModal
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setProfileImage={setProfileImage}
          updateUserProfileImage={updateUserProfileImage}
          profile={profile}
        />
        {cardData.map((el) => {
          return (
            <Card
              title={el?.title}
              description={el?.description}
              buttonVariant={el?.buttonvariant as ButtonProps["variant"]}
              buttonStyle={el?.buttonStyle}
              noBorder={!el?.cardBorder}
              onSubmit={(value) => updateUserDetails(el.title, value)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AccountPersonalInfo
