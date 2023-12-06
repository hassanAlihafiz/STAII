import React, { useState } from "react";
import Image from "next/image";
import { toast } from "@/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";



import AsyncButton from "../ui/async-btn";


type Providers = "google" | "apple"
const AuthenticationWithProviders = () => {
  const [loading, setLoading] = useState<false | Providers>(false)
  const supabase = createClientComponentClient()

  const handleAuthWithProviders = async (provider: Providers) => {
    setLoading(provider)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      },
    })
    if (error)
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: error.message,
      })

    setLoading(false)
  }
  return (
    <>
      <p className="my-6 flex w-full  items-center">
        <span className="h-[1px] grow bg-input"></span>
        <span className="form-text-bottom mx-3">OR</span>
        <span className="h-[1px] grow bg-input"></span>
      </p>
      <div className=" flex w-full items-center justify-start space-x-4">
        <AsyncButton
          type="button"
          loading={loading === "google"}
          onClick={() => handleAuthWithProviders("google")}
          variant={"ghost"}
          size="sm"
        >
          <Image
            src="/icons/google.svg"
            alt=""
            width={20}
            height={20}
            className="mr-2"
          />
          <span className="inherit hidden sm:inline-block">
            Continue with&nbsp;
          </span>{" "}
          Google
        </AsyncButton>
        <AsyncButton
          type="button"
          loading={loading === "apple"}
          onClick={() => handleAuthWithProviders("apple")}
          variant={"ghost"}
          size="sm"
        >
          <Image
            src="/icons/apple.svg"
            alt=""
            width={20}
            height={20}
            className="mr-2"
          />
          <span className="inherit hidden sm:inline-block">
            Continue with&nbsp;
          </span>{" "}
          Apple
        </AsyncButton>
      </div>
    </>
  )
}

export default AuthenticationWithProviders