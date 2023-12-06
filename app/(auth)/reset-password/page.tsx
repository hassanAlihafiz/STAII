"use client"

import React, { useEffect, useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { validateLink } from "@/utils"
import { passwordSchema } from "@/utils/password-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import { z } from "zod"

import AsyncButton from "@/components/ui/async-btn"
import { Form } from "@/components/ui/form"
import PasswordInput from "@/components/ui/password-input"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object(passwordSchema)
const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()
  const pathname = usePathname()
  const paramse = useParams()
  console.log({ pathname, paramse })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmpassword: "",
      password: "",
    },
  })
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = form

  const onSubmit = async (data: any) => {
    setLoading(true)

    if (data.password !== data.confirmpassword) {
      setError("confirmpassword", {
        message: "• Passwords must match",
      })
      setLoading(false)
      return
    }
    const { data: result, error } = await supabase.auth.updateUser({
      password: data.password,
    })
    toast({
      variant: error ? "destructive" : "success",
      title: error ? "Something went wrong!" : "Updated Password successfully!",
      description: error
        ? error.message
        : "Your password has been updated successfully. Keep it secure!",
    })
    if (!error) router.push("/home")
    setLoading(false)
  }
  useEffect(() => {
    setTimeout(() => {
      const valid = validateLink(
        "Please resend the link to reset your password."
      )

      if (!valid) router.push("/forgot-password")
    }, 1000)
  }, [])

  return (
    <section className="form-section">
      <Form {...form}>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="form-title">Set new password</h1>
          <p className="form-text mb-7">
            Set a new password to regain access to your account.
          </p>

          <PasswordInput
            register={register}
            error={errors?.password}
            placeholder="New Password"
          />
          <PasswordInput
            placeholder="Confirm Password"
            name="confirmpassword"
            register={register}
            error={errors?.confirmpassword}
          />
          <AsyncButton loading={loading} text="save" className="mt-2" />
        </form>
      </Form>
    </section>
  )
}

export default LoginPage
