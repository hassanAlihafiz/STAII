import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store"
import { setShowLogout } from "@/store/slices/user-slice"
import { LogOut, Presentation, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import NotificationDrawer from "@/components/drawer/notification-drawer"
import { SearchModal } from "@/components/modal/search-modal"

export const UserProfile = () => {
  const profile = useAppSelector((state) => state.user.profile)
  const router = useRouter()
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex justify-between items-center">
        <div className="relative grid h-10 w-10 overflow-hidden rounded-full bg-teal-600">
          <img
            src={profile?.profile_url || "/images/avatar.png"}
            alt="profile"
            width={40}
            height={40}
            className="text-teal-600"
          />
        </div>

        <div className="flex flex-col justify-start ml-4 ">
          <span className="text-[10px] md:hidden font-medium capitalize text-[#9CA5AF] dark:text-white">
            Welcome back
          </span>
          <span className="text-sm font-semibold capitalize text-[#2A3033] dark:text-white">
            {profile?.name}
          </span>
        </div>

        {(profile?.user_type === "admin" || profile?.user_type === "pro") && (
          <div className="flex justify-end ml-4 md:hidden">
            <Button
              className="h-8"
              variant={"outline"}
              onClick={() => router.push("/meeting")}
            >
              Meeting
            </Button>
          </div>
        )}
      </div>
      <div className="md:hidden  flex">
        <SearchModal />
        <NotificationDrawer />
        <Star
          className="mx-2 cursor-pointer text-primary-foreground"
          strokeWidth="1px"
        />
      </div>
    </div>
  )
}
const ProfileDropDown = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const userType = useAppSelector((state) => state.user.profile?.user_type)
  return (
    <>
      <NavigationMenu className="ml-4 max-w-fit hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex cursor-pointer items-center space-x-2 rounded-md p-1 transition-all hover:bg-[#F4F5FA]  dark:hover:bg-[#2D374E]">
              <UserProfile />
            </NavigationMenuTrigger>

            <NavigationMenuContent className="rounded-lg bg-white p-2 shadow-xl dark:bg-[#2A3033]">
              {(userType === "admin" || userType === "pro") && (
                <NavigationMenuLink
                  className="flex min-w-max cursor-pointer items-center p-2 text-sm font-medium text-[#1A262D] transition-all hover:bg-gray-100 dark:bg-[#2A3033] dark:text-white px-12 "
                  onClick={() => router.push("/meeting")}
                >
                  <Presentation className="mr-2 h-5 w-5" />
                  Meeting
                </NavigationMenuLink>
              )}

              <NavigationMenuLink
                className="flex min-w-max cursor-pointer items-center p-2 text-sm font-medium text-[#1A262D] transition-all hover:bg-gray-100 dark:bg-[#2A3033] dark:text-white px-12 "
                onClick={() => dispatch(setShowLogout(true))}
              >
                <LogOut className="mr-2 h-5 w-5 " />
                Log out
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}

export default ProfileDropDown
