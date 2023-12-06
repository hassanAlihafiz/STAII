"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { validateLink } from "@/utils"
import { callPostApiWithAuth, callPutApiWithAuth } from "@/utils/api"
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
import PasswordInput from "@/components/ui/password-input"
import { toast } from "@/components/ui/use-toast"
import AuthenticationWithProviders from "@/components/auth/auth-with-providers"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password should have atleast 8 characters",
    })
    .max(50),
})
const LoginPage = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form
  const handleCommunityAuth = async (
    user: any,
    password: string,
    token: string
  ) => {
    console.log("-----pushing-------")
    if (user?.user_metadata?.community_registered)
      return router.replace("/home")
    await callPostApiWithAuth(
      "lemmy",
      "/user/register",
      {
        email: user?.email,
        password: password,
        password_verify: password,
        show_nsfw: false,
        username: user?.user_metadata?.name?.replaceAll(" ", ""),
      },

      async (res: any) => {
        await supabase.auth.updateUser({
          data: { community_registered: true },
        })
        console.log(user)
        await callPutApiWithAuth(
          "lemmy",
          "/user/save_user_settings",
          {
            display_name: user?.user_metadata?.name,
            avatar: user?.user_metadata?.avatar_url,
            bio: `👋 New to the Trading Community! 🚀 Exploring the markets with #SocialTraderAi! 📈 Let's connect, trade, and grow our portfolios together! 💡 #TradingNewbie 🌟`,
            theme: "dark",
          },
          (res: any) => {
            console.log(res)
          },
          token,
          (err: any) => {
            console.log(err)
          }
        )
        router.replace("/home")
      },
      token,
      (err: any) => {
        console.log(err)
      }
    )
  }
  const onSubmit = async (data: any) => {
    setLoading(true)
    const { data: result, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    toast({
      variant: error ? "destructive" : "success",
      title: error ? "Error, Unable to Login" : "User Logged In successfully!",
      description: error
        ? error.message
        : "Happy to see you again! Redirecting you to your dashboard...",
    })
    if (error) return setLoading(false)
    await handleCommunityAuth(
      result?.user,
      data?.password,
      result?.session?.access_token
    )
    setLoading(false)
    router.replace("/home")
  }

  useEffect(() => {
    setTimeout(() => {
      validateLink("please resend the link and try logging in again")
    }, 1000)
  }, [])
  return (
    <section className="form-section">
      <Form {...form}>
        <form className="form-container " onSubmit={handleSubmit(onSubmit)}>
          <h1 className="form-title">Log in</h1>
          <p className="form-text mb-7">
            Enter your details and create password
          </p>

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
          <PasswordInput
            placeholder="Password"
            register={register}
            error={errors?.password}
          />

          <AsyncButton loading={loading} className="mt-4" />
          <Link
            href="/forgot-password"
            className="form-text  form-link !mx-auto mt-12 md:mt-6 text-center font-semibold dark:text-primary-foreground"
          >
            Forgot Password?
          </Link>
          <AuthenticationWithProviders />
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

export default LoginPage
