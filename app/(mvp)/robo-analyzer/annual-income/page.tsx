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
  income: z
    .string()
    .min(3, { message: "Invalid Income" })
    .max(15, { message: "Invalid Income" }),
})
const AnnualIncome = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const annualIncome = useAppSelector(
    (state) => state.user.financialInfo?.annual_income
  )
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { income: formatNumberValues(annualIncome) },
  })
  const {
    handleSubmit,

    formState: { errors },
  } = form

  const onSubmit = async (data: any) => {
    let value = formattedValueToNumber(data?.income)
    dispatch(
      setFinancialInfo({
        text: { annual_income: value?.toString() },
        value: { annual_income: value },
      })
    )
    router.push("/robo-analyzer/monthly-expenses")
  }

  return (
    <section className="form-section">
      <Form {...form}>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <BackButton />
          <h1 className="form-title">
            What is your current annual income before taxes?
          </h1>
          <p className="form-text mb-7">
            This helps us estimate your tax rates, which we’ll use to recommend
            a mix of investments
          </p>
          <FormField
            control={form.control}
            name="income"
            render={({ field }) => (
              <FormItem className="relative mt-4 w-9/12 md:w-1/2">
                <span className="absolute top-[14px] left-5 font-semibold text-[#2A3033] dark:text-white">
                  $
                </span>
                <FormControl>
                  <Input
                    placeholder="Enter your income"
                    {...field}
                    type="text"
                    className="pl-8 text-base"
                    onChange={(e) => {
                      form.setValue("income", formatNumberInputs(e))
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

export default AnnualIncome
