"use client"

import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store"
import { setFinancialInfo } from "@/store/slices/user-slice"
import {
  formatNumberInputs,
  formatNumberValues,
  formattedValueToNumber,
} from "@/utils/format-input"
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
  netWorth: z
    .string()
    .min(3, { message: "Invalid Net Worth" })
    .max(15, { message: "Invalid Net Worth" }),
})
const Networth = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const monthlyExpenses = useAppSelector(
    (state) => state.user.financialInfo?.monthly_expenses
  )
  const netWorth = useAppSelector(
    (state) => state.user.financialInfo?.net_worth
  )
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { netWorth: formatNumberValues(netWorth) },
  })
  const {
    handleSubmit,

    formState: { errors },
  } = form

  const onSubmit = async (data: any) => {
    let value = formattedValueToNumber(data.netWorth)
    dispatch(
      setFinancialInfo({
        value: { net_worth: value },
        text: { net_worth: value?.toString() },
      })
    )
    router.push("/robo-analyzer/investing-experience")
  }

  return (
    <section className="form-section ">
      <Form {...form}>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <BackButton />
          <h1 className="form-title">What is your estimated net worth?</h1>
          <p className="form-text mb-7">
            Net worth is cash you have available in all assets minus liabilities
          </p>
          <FormField
            control={form.control}
            name="netWorth"
            render={({ field }) => (
              <FormItem className="relative mt-4 w-9/12 md:w-1/2">
                <span className="absolute left-5 top-[14px]  text-[#2A3033] dark:text-white">
                  $
                </span>
                <FormControl>
                  <Input
                    placeholder="Enter your net worth "
                    {...field}
                    type="text"
                    className="pl-8 text-base"
                    onChange={(e) => {
                      form.setValue("netWorth", formatNumberInputs(e))
                    }}
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

export default Networth
