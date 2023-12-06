"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { setFinancialInfo } from "@/store/slices/user-slice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import BackButton from "@/components/auth/onboarding/back-btn"

const formSchema = z.object({
  age: z
    .string()
    .min(1, { message: "Inter a Valid Age" })
    .max(3, { message: "Inter a Valid Age" }),
})
const Age = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const {
    handleSubmit,

    formState: { errors },
  } = form

  const onSubmit = async (data: any) => {
    dispatch(
      setFinancialInfo({ text: { age: data.age }, value: { age: data.age } })
    )
    router.push("/sign-up/annual-income")
  }

  return (
    <section className="form-section">
      <Form {...form}>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <BackButton />
          <h1 className="form-title">What is your age?</h1>

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="mt-4 w-9/12 md:w-1/2">
                <FormControl>
                  <Input
                    placeholder="Enter your age"
                    {...field}
                    type="number"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="form-bottom-section">
            <button className="btn  w-full">Continue</button>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default Age
