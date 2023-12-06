"use client"

import React, { useState } from "react"

import "@/styles/common-page.css"
import Link from "next/link"
import { useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftCircle, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import AsyncButton from "@/components/ui/async-btn"
import BackBtn from "@/components/ui/back-button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { InputInsideLabel } from "@/components/ui/input-inside-label"
import MobileViewSelect from "@/components/ui/mobile-view-select"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ToggleGroup_ from "@/components/ui/toggle-group"

interface SellBuyFormProps {
  tradeType: string
  sharesType: string
  description: string
}

const formSchema = z.object({
  amount: z.string().min(2, {
    message: "Invalid Amount",
  }),
  share: z.string().min(2, {
    message: "Invalid Shares",
  }),
  price: z.string().min(5, {
    message: "Please, Enter price",
  }),
})
const SellBuyForm: React.FC<SellBuyFormProps> = () => {
  const params = useParams()
  const [currentSellType, setCurrentSellType] = useState<number>(0)

  const [loading, setLoading] = useState(false)
  const tradeType = params?.orderType
  const sharesType = params?.name
  const description =
    tradeType === "buy"
      ? "$100.88 cash available"
      : "10 shares for $902.4 available"
  const toggleData = [
    {
      title: `${tradeType} in Dollars`,
      value: 0,
    },
    {
      title: `${tradeType} in Shares`,
      value: 1,
    },
  ]

  const options = [
    { id: 1, label: "Simple ", value: "Simple" },
    { id: 2, label: "Limit order", value: "Limit_order" },
    { id: 3, label: "Stop order", value: "Stop_order" },
    { id: 4, label: "Stop limit order", value: "Stop_limit_order" },
    { id: 5, label: "Trailing stop order", value: "Trailing_stop_order" },
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      price: "",
      share: "",
    },
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form
  const onSubmit = (data: any) => {
    console.log("data", data)
  }
  return (
    <div className="w-full max-w-[480px] m-[auto] md:mt-6 mb-6 flex flex-col overflow-hidden">
      <div className="mobile-card-box md:card-box md:dark:dark-card-box md:border-shadow">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* header */}
            <div className="flex-center-between">
              <div className="max-md:hidden">
                <BackBtn />
              </div>
              <div className="md:hidden flex items-center justify-between z-10">
                <Link href="/account">
                  <div>
                    <ArrowLeftCircle
                      strokeWidth={"0.5px"}
                      size={"35px"}
                      className="stroke-brand-gray-50 dark:fill-brand-gray-70"
                    />
                  </div>
                </Link>
              </div>
              <div className="flex justify-between items-baseline ml-[90px] max-md:ml-0">
                <span className="text-sm mt-1 text-brand-gray-50 font-semibold">
                  Order Type
                </span>
                <div className="ml-5">
                  <div className="max-md:hidden">
                    <Select>
                      <SelectTrigger className="w-36 h-10 !rounded-xl cursor-pointer">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option.id} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:hidden">
                    <MobileViewSelect items={options} />
                  </div>
                </div>
              </div>
              <div className="max-md:hidden">
                <Link href="/account">
                  <X className="ml-auto w-5 cursor-pointer text-brand-gray-50" />
                </Link>
              </div>
            </div>
            {/* header */}
            {/* body */}
            <div>
              <div className="flex flex-col py-6 border-b border-brand-gray-20 dark:border-brand-blue-90 max-md:border-b-0 max-md:py-4 max-md:gap-1.5">
                <div className="black-600 text-2xl dark:text-white">
                  {tradeType} {sharesType.toUpperCase()}
                </div>
                <div className="text-brand-gray-60 text-sm dark:text-brand-gray-30">
                  {description}
                </div>
              </div>
              <div className="flex flex-col gap-6 pt-6 max-md:pt-0 max-md:gap-5 ">
                <div>
                  <ToggleGroup_
                    toggleData={toggleData}
                    setCurrentSellType={setCurrentSellType}
                    className="max-md:!text-xs"
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name={currentSellType === 0 ? "amount" : "share"}
                    render={({ field }) => (
                      <FormItem className="max-md:!mb-0">
                        <FormControl>
                          <InputInsideLabel
                            {...field}
                            labelClass="max-md:!text-left max-md:!top-1.5"
                            inputLabel={
                              currentSellType === 0
                                ? "Enter Amount"
                                : "Number of shares"
                            }
                            className="text-gray-brand-100  price-input font-semibold"
                            placeholder="0.00"
                            sign={currentSellType === 0 ? "$" : ""}
                          />
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5 max-md:gap-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="max-md:!mb-0">
                        <FormControl>
                          <InputInsideLabel
                            {...field}
                            labelClass="max-md:!text-left max-md:!top-1.5"
                            inputLabel={"Stop price"}
                            className="text-gray-brand-100  price-input font-semibold"
                            placeholder="0.00"
                            sign="$"
                          />
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />

                  <div className="w-full text-end text-brand-gray-100 text-xs dark:text-white max-md:text-start">
                    Market price $98.13 per 1 share
                  </div>
                </div>
                {currentSellType === 1 ? (
                  <>
                    {/* Divider 1px */}
                    <div className="h-[1px] w-full bg-brand-gray-20 dark:bg-brand-blue-90"></div>
                    <div className="w-full flex justify-between -mt-2">
                      <div className="text-xs black-600 dark:text-white">
                        Estimated Credit:
                      </div>
                      <div className="text-xs black-600 dark:text-white">
                        $--
                      </div>
                    </div>
                  </>
                ) : null}
                <div>
                  <Link href={`/script/${sharesType}/${tradeType}/expire-by`}>
                    <AsyncButton loading={loading} className="rounded-xl">
                      Review
                    </AsyncButton>
                  </Link>
                </div>
              </div>
            </div>
            {/* body */}
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SellBuyForm
