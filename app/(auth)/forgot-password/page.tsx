"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import { z } from "zod"

import AsyncButton from "@/components/ui/async-btn"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import BackButton from "@/components/auth/onboarding/back-btn"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})
const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
  const { handleSubmit, register } = form

  const onSubmit = async (data: any) => {
    setLoading(true)
    const { data: result, error } = await supabase.auth.resetPasswordForEmail(
      data.email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback?next=/reset-password`,
      }
    )
    toast({
      variant: error ? "destructive" : "success",
      title: error
        ? "Unable to send password reset link!"
        : "Password Reset Link sent Sucessfully!",
      description: error
        ? error.message
        : "Please check your email for the password reset link.",
    })

    setLoading(false)
  }
  const router = useRouter()
  return (
    <section className="form-section">
      <Form {...form}>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <BackButton />

          <h1 className="form-title">Forgot password</h1>
          <p className="form-text mb-7">Enter email used during registration</p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <AsyncButton loading={loading} />
        </form>
      </Form>
      <p className="form-text-bottom mt-6 font-semibold">
        Don’t have an account?
        <Link href="/sign-up" className="form-link">
          Create account
        </Link>
      </p>
    </section>
  )
}

export default ForgotPasswordPage
