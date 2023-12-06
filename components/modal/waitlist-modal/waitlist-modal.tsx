"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { SuccessModal } from "./sucess-modal"

export function WaitlistModal({
  text,
  styles,
}: {
  text?: string
  styles?: string
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState<"success" | "join" | false>(false)
  const [joinedUser, setJoinedUser] = useState(false)
  const supabase = createClientComponentClient()

  const addToWaitlist = async (data: any) => {
    const { email } = data
    setIsLoading(true)
    const { data: emails, error: fetchError } = await supabase
      .from("waitlist_2")
      .select("email")
      .eq("email", email)
    if (emails && emails.length > 0 && !fetchError) {
      setError(
        "email",
        { message: "Email already exists!" },
        { shouldFocus: true }
      )
      return setIsLoading(false)
    }
    const { error } = await supabase.from("waitlist_2").insert({ email })
    if (error) {
      setError("email", { message: error.message }, { shouldFocus: true })
      return setIsLoading(false)
    }
    localStorage.setItem("waitlist", "true")
    setIsLoading(false)
    setOpen("success")
  }
  useEffect(() => {
    if (open === "success") return
    if (localStorage.getItem("waitlist") === "true") {
      setJoinedUser(true)
      if (open === "join") setOpen("success")
    }
  }, [open])

  return (
    <>
      <Dialog open={open === "join"}>
        <DialogTrigger asChild>
          <button
            className={`${styles || "btn mb-10 md:mb-0 "}`}
            onClick={() => {
              if (!joinedUser) {
                setOpen("join")
              } else {
                setOpen("success")
              }
            }}
          >
            {text || "Join waitlist now"}
          </button>
        </DialogTrigger>
        <DialogContent className="border-none p-8  dark:bg-[#232736] sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex justify-between">
              <div className="flex items-center justify-start">
                <Image
                  src="/images/logo-icon.svg"
                  width={37}
                  height={37}
                  alt="logo"
                />
                <div className="ml-4 rounded-2xl bg-[#DAFBEC] px-2 py-[1px] text-xs text-primary-foreground">
                  Coming Soon
                </div>
              </div>
              <div
                onClick={() => {
                  setOpen(false)
                }}
                className="cursor-pointer border-none"
              >
                <Image
                  src={"/icons/close.svg"}
                  alt="close"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <DialogTitle>
              <span className=" title mb-0 block text-xl ">
                Get early access!
              </span>
            </DialogTitle>
            <DialogDescription>
              <span className="text mb-3 block text-left">
                Be one of the first to create a profile and claim a premium
                username
              </span>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(addToWaitlist)}>
            <input
              type="email"
              placeholder="Enter your email"
              className="input mb-1 w-full dark:bg-white"
              {...register("email", { required: true })}
            />
            <p
              className={`font-semiBold mb-4 text-left text-xs  text-red-600 opacity-0 ${
                errors?.email?.message && "!opacity-100"
              }`}
            >
              {typeof errors?.email?.message === "string"
                ? errors?.email?.message
                : "Invalid email address"}
            </p>
            <DialogFooter>
              <button className="btn w-full">
                {isLoading ? (
                  <div
                    className="spin-loader h-5 w-5 text-white"
                    role="status"
                  />
                ) : (
                  "Join waitlist"
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {open === "success" && (
        <SuccessModal open={open === "success"} setOpen={setOpen} />
      )}
    </>
  )
}
