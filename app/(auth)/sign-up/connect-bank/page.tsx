"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { QuilttButton } from "@quiltt/react"

import { Button } from "@/components/ui/button"
import BackButton from "@/components/auth/onboarding/back-btn"

const ConnectBank = () => {
  const router = useRouter()

  const handleSkip = () => {
    router.push("/sign-up/financial-goal")
  }

  return (
    <section className="form-container ">
      <BackButton />

      <Image
        src="/illustrations/onboarding/connect-bank.svg"
        width={80}
        height={80}
        alt=""
        className="my-4 mr-auto"
      />
      <h1 className="form-title">Connect to your bank</h1>
      <p className="form-text mb-4">
        To get the most powerful features, please link your bank to
        SocialTrading.AI
      </p>
      <div className="my-4 flex w-full flex-col justify-start rounded-lg bg-[#F3F7FB] p-4 dark:bg-[#2D374E]">
        <div className="flex items-center  font-semibold">
          <Image
            src="/illustrations/onboarding/mx-logo.svg"
            width={60}
            height={33}
            alt=""
          />
          &nbsp;Technologies
        </div>
        <p className="mt-3 text-sm text-[#9C9CAD]">
          We use MX Technologies to connect your bank account. Your information
          is encrypted and safe.
        </p>
      </div>
      <div className="mt-2 flex w-full items-center justify-between">
        <Button
          variant="ghost"
          className="mr-2 max-w-[140px] font-semibold"
          onClick={() => handleSkip()}
        >
          Do it later
        </Button>

        <QuilttButton
          type="button"
          connectorId="ud5rq9pfbt"
          className="btn w-full !bg-primary-foreground"
        >
          Launch Connector
        </QuilttButton>
      </div>
    </section>
  )
}

export default ConnectBank
