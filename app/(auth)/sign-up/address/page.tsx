"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchStates } from "@/async-functions/location"
import { useAppDispatch, useAppSelector } from "@/store"
import { setUser } from "@/store/slices/user-slice"
import { zodResolver } from "@hookform/resolvers/zod"
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
import BackButton from "@/components/auth/onboarding/back-btn"
import { SelectState } from "@/components/auth/selects/state-select"
import CreateIBAccountModal from "@/components/modal/ib-modal/create-account-modal"

const formSchema = z.object({
  street_address: z
    .string()
    .min(2, { message: "Please, Enter street Address" })
    .max(50),
  zip_code: z
    .string()
    .min(5, { message: "Zip Code should have atleast 5 letters" })
    .max(10, { message: "Please, Enter a valid zip code" }),
  state: z.string().min(2, { message: "Please, Select a valid state" }).max(50),
  city: z.string().min(2, { message: "Please, Enter a valid city" }).max(50),
})

const SignupAddressPage = () => {
  const [states, setStates] = useState([])
  const [showModal, setshowModal] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const profile = useAppSelector((state) => state.user.profile)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: profile?.city || "",
      state: profile?.state || "",
      street_address: profile?.street_address || "",
      zip_code: profile?.zip_code || "",
    },
  })
  const {
    handleSubmit,

    formState: { errors },
  } = form

  useEffect(() => {
    ;(async () => {
      if (!profile?.country_of_birth)
        return router.push("/sign-up/verification")
      const data = await fetchStates(profile.country_of_birth)
      setStates(data)
      if (form.getValues("state").length < 2)
        form.setValue("state", data[0]?.state_code)
    })()
  }, [profile])

  const submitForm = async (value: any) => {
    dispatch(
      setUser({
        ...value,
      })
    )
    setshowModal(true)
  }
  return (
    <section className="form-section">
      <Form {...form}>
        <form className="form-container" onSubmit={handleSubmit(submitForm)}>
          <BackButton />

          <h1 className="form-title">Enter home address</h1>
          <p className="form-text mb-7">
            By law, we need your home address to start
          </p>
          <FormField
            control={form.control}
            name="street_address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Street address" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <Input placeholder="City" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex w-full flex-col justify-between md:flex-row">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="md:w-[60%]">
                  <SelectState
                    value={field.value}
                    list={states}
                    setValue={(value) => {
                      form.setValue("state", value)
                    }}
                    placeholder="State"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem className="md:w-[38%]">
                  <FormControl>
                    <Input
                      placeholder="Zip Code"
                      {...field}
                      className="uppercase"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="form-bottom-section">
            <CreateIBAccountModal open={showModal} setIsOpen={setshowModal} />
            <AsyncButton>Continue</AsyncButton>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default SignupAddressPage
