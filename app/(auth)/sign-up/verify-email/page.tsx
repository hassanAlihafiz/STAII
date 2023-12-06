"use client"

import { useState } from "react"
import { useAppSelector } from "@/store"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import AsyncButton from "@/components/ui/async-btn"
import { toast } from "@/components/ui/use-toast"
import BackButton from "@/components/auth/onboarding/back-btn"
import CountDownTimer from "@/components/common/timer/count-down"

function SignupVerification() {
  const supabase = createClientComponentClient()
  const [showResend, setShowResend] = useState(false)
  const [loading, setLoading] = useState(false)
  const email = useAppSelector((state) => state.user.profile?.email)

  const resendEmail = async () => {
    try {
      if (!email)
        return toast({
          variant: "destructive",
          title: "Error, No Email Found",
          description: "Please, refresh and check again or Sign Up again.",
        })
      setLoading(true)
      const { data, error } = await supabase.auth.resend({
        type: "signup",
        email,
      })
      setShowResend(false)
      toast({
        variant: error ? "destructive" : "success",
        title: error ? "Error, Unable to Resend" : "Email, sent again!",
        description: error ? error.message : "Please, refresh and check again.",
      })
      setLoading(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "something went wrong!",
        description: error as string,
      })
      setLoading(false)
    }
  }

  return (
    <section className="form-section">
      <div className="form-container">
        <BackButton />
        <div>
          <h1 className="form-title">Verify Email</h1>
          <p className="form-text mb-7">
            We&apos;ve just sent you an email including a verification link. To
            proceed, simply click on the link. If you don&apos;t see the email,
            please check your spam folder.
          </p>
          {!showResend ? (
            <AsyncButton disabled={true}>
              Resend in&nbsp;
              <CountDownTimer start={true} onEnd={() => setShowResend(true)} />
            </AsyncButton>
          ) : (
            <AsyncButton
              type="button"
              onClick={() => {
                resendEmail()
              }}
              loading={loading}
            >
              Resend verification email
            </AsyncButton>
          )}
        </div>
      </div>
    </section>
  )
}
export default SignupVerification
