"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { setUser } from "@/store/slices/user-slice"
import { passwordSchema } from "@/utils/password-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import { z } from "zod"

import AsyncButton from "@/components/ui/async-btn"
import { Checkbox } from "@/components/ui/checkbox"
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
import BackButton from "@/components/auth/onboarding/back-btn"

const formSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First Name should have atleast 2 characters" })
    .max(50),
  lastname: z
    .string()
    .min(2, { message: "Last Name should have atleast 2 characters" })
    .max(50),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: passwordSchema?.password,
  terms: z.optional(z.string()),
})
const SignupFormPage = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  })
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = form

  const onSubmit = async (data: any) => {
    setLoading(true)

    const { data: result, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: `${data.firstname} ${data.lastname}`,
          avatar_url: `https://api.dicebear.com/6.x/initials/svg?seed=${data.firstname?.replaceAll(
            " ",
            "%20"
          )}%20${data.lastname?.replaceAll(
            " ",
            "%20"
          )}&radius=50&backgroundType=gradientLinear`,
        },
      },
    })

    toast({
      variant: error ? "destructive" : "success",
      title: error ? "Something went wrong!" : "User created successfully!",
      description: error
        ? error?.message
        : "Please check your email for a confirmation message to complete the registration process.",
    })
    dispatch(setUser({ email: data?.email }))
    if (!error) return router.push("/sign-up/verify-email")
    setLoading(false)
  }

  return (
    <section className="form-section">
      <Form {...form}>
        <div className="form-container ">
          <BackButton />
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full">
            <h1 className="form-title">Set up your profile</h1>
            <p className="form-text mb-7">
              Enter your details and create password
            </p>
            <div className=" flex w-full flex-col justify-between md:flex-row">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="md:w-[48%]">
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="md:w-[48%]">
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              register={register}
              error={errors?.password}
              placeholder="Password"
            />

            <div className="mb-4 flex w-full items-center justify-start space-x-2 md:mb-6 mt-4">
              <FormField
                control={control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="mb-0 grid w-fit items-center">
                    <FormControl>
                      <Checkbox
                        id="terms"
                        {...field}
                        required
                        className="h-6 w-6 space-y-0 data-[state=checked]:text-primary text-primary-foreground data-[state=checked]:border-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <label htmlFor="terms" className="form-text">
                I have read and agree to the
                <Link
                  href="/privacy-policy"
                  className="form-link dark:text-primary-foreground"
                >
                  privacy policy
                </Link>
                and
                <Link
                  href="/terms-of-service"
                  className="form-link dark:text-primary-foreground"
                >
                  terms of service
                </Link>
              </label>
            </div>
            <AsyncButton loading={loading} />
            <AuthenticationWithProviders />
          </form>
        </div>
      </Form>
      <p className="form-text-bottom mt-6 font-semibold">
        Already have an account?{" "}
        <Link href="/login" className="form-link">
          Log In
        </Link>
      </p>
    </section>
  )
}

export default SignupFormPage
