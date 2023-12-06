"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store"
import { setUser } from "@/store/slices/user-slice"
import { countries } from "@/utils/operating-locations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import AsyncButton from "@/components/ui/async-btn"
import { DateOfBirthPicker } from "@/components/ui/date-picker"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { SelectWithSearch } from "@/components/ui/select-with-search"

const formSchema = z.object({
  date: z.string().refine(
    (value) => {
      const selectedDate = new Date(value)
      return selectedDate <= new Date()
    },
    {
      message: "Please select a date before today.",
    }
  ),
  countryOfBirth: z
    .string()
    .min(2, { message: "Enter a valid country of residence" })
    .max(50),
  taxResidenceCountry: z
    .string()
    .min(2, { message: "Enter a valid tax residence country" })
    .max(50),
})
const SignupAddressPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const profile = useAppSelector((state) => state.user.profile)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: profile?.date_of_birth || "",
      countryOfBirth: profile?.country_of_birth || "",
      taxResidenceCountry: profile?.tax_residence_country || "",
    },
  })
  const {
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit = async (data: any) => {
    dispatch(
      setUser({
        date_of_birth: data.date,
        country_of_birth: data.countryOfBirth,
        tax_residence_country: data.taxResidenceCountry,
      })
    )
    router.push("/sign-up/address")
  }
  return (
    <section className="form-section">
      <Form {...form}>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="form-title">Verification</h1>
          <p className="form-text mb-7">
            We need to prove who you are before you can use account
          </p>
          <p className="mb-1 font-medium text-[#2D3A43] dark:text-white">
            Select your date of birth
          </p>
          <div className=" flex w-full  flex-row justify-between">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <DateOfBirthPicker
                    date={field.value ? new Date(field?.value) : null}
                    setDate={(value) => {
                      form.setValue("date", value?.toISOString())
                      if (form.formState.isSubmitted) form.trigger()
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="my-1  font-medium text-[#2D3A43] dark:text-white">
            Select Country of Birth
          </p>
          <FormField
            control={form.control}
            name="countryOfBirth"
            render={({ field }) => (
              <FormItem>
                <SelectWithSearch
                  value={field.value}
                  list={countries}
                  setValue={(value) => {
                    {
                      form.setValue("countryOfBirth", value)
                      if (form.formState.isSubmitted) form.trigger()
                    }
                  }}
                  placeholder="Country"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="mb-1 font-medium text-[#2D3A43] dark:text-white">
            Select Country of Tax Residence{" "}
          </p>
          <FormField
            control={form.control}
            name="taxResidenceCountry"
            render={({ field }) => (
              <FormItem>
                <SelectWithSearch
                  value={field.value}
                  list={countries}
                  setValue={(value) => {
                    {
                      form.setValue("taxResidenceCountry", value)
                      if (form.formState.isSubmitted) form.trigger()
                    }
                  }}
                  placeholder="Country"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="form-bottom-section">
            <AsyncButton className="btn w-full mt-auto">Continue</AsyncButton>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default SignupAddressPage
