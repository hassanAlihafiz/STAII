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
import { toast } from "@/components/ui/use-toast"
import BackButton from "@/components/auth/onboarding/back-btn"

const formSchema = z.object({
  monthlyExpense: z
    .string()
    .min(3, { message: "Invalid monthlyExpense" })
    .max(15, { message: "Invalid monthlyExpense" }),
})
const MonthlyExpense = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const annualIncome = useAppSelector(
    (state) => state.user.financialInfo?.annual_income
  )
  const monthlyExpenses = useAppSelector(
    (state) => state.user.financialInfo?.monthly_expenses
  )
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { monthlyExpense: formatNumberValues(monthlyExpenses) },
  })
  const {
    handleSubmit,

    formState: { errors },
  } = form

  const onSubmit = async (data: any) => {
    let value = formattedValueToNumber(data.monthlyExpense)
    if (value && value > annualIncome!)
      return form.setError("monthlyExpense", {
        message: "Annual Income should be greater than Monthly Expenses",
      })
    dispatch(
      setFinancialInfo({
        value: { monthly_expenses: value },
        text: { monthly_expenses: value?.toString() },
      })
    )
    router.push("/robo-analyzer/net-worth")
  }

  return (
    <section className="form-section">
      <Form {...form}>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <BackButton />
          <h1 className="form-title">What is your Monthly Expenses?</h1>
          <FormField
            control={form.control}
            name="monthlyExpense"
            render={({ field }) => (
              <FormItem className="relative mt-4 w-9/12 md:w-1/2">
                <span className="absolute top-[14px] left-5  text-[#2A3033] dark:text-white">
                  $
                </span>
                <FormControl>
                  <Input
                    placeholder="Enter your Expense "
                    {...field}
                    type="text"
                    className="pl-8 text-base"
                    onChange={(e) => {
                      form.setValue("monthlyExpense", formatNumberInputs(e))
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

export default MonthlyExpense
