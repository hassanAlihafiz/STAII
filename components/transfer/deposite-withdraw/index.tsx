"use client"

import React, { useEffect, useState } from "react"

import "@/styles/common-page.css"
import Link from "next/link"
import { getACHAccount } from "@/async-functions/alpaca/ach-relationship"
import { PostTransferEntity } from "@/async-functions/alpaca/transfer"
import { initiateDeposite } from "@/async-functions/bank"
import { useAppSelector } from "@/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ArrowLeftCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import AsyncButton from "@/components/ui/async-btn"
import BackBtn from "@/components/ui/back-button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { InputInsideLabel } from "@/components/ui/input-inside-label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import TransferInitiatedModal from "@/components/modal/transfer/transaction-completed"

const formSchema = z.object({
  amount: z.string().min(2, {
    message: "Invalid Amount",
  }),
  account: z.string().min(5, {
    message: "Please, select an account",
  }),
  methods: z.string().min(2, {
    message: "Please, select a method",
  }),
})
const methods = ["WIRE", "ACH"]
const DepositeWithdrawCard = ({ isDeposite }: { isDeposite: boolean }) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [bankAccounts, setBankAccounts] = useState<any>([])
  // const accounts = useAppSelector((state) => state.bank.accounts)
  const token = useAppSelector((state) => state?.user?.token)
  const supabase = createClientComponentClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      account: "",
      methods: "",
    },
  })
  const {
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit = async (data: any) => {
    const amount = data.amount.replace("$", "")
    const selectedAccount = bankAccounts?.find(
      (acc: any) => acc.bank_account_number === data.account
    )
    setLoading(true)
    if (!selectedAccount) {
      toast({
        title: "Something went wrong!",
        description: "Please reload the page and try again.",
        variant: "destructive",
      })
      return setLoading(true)
    }

    let payload = {
      transfer_type: "ach",
      relationship_id: "7df8a9eb-3384-4d5c-9884-01487763e2f2",
      amount: amount,
      direction: isDeposite ? "INCOMING" : "OUTGOING",
    }
    PostTransferEntity(payload, token!)
      .then(async (e) => {
        const res = await initiateDeposite(
          {
            amount: amount,
            account_number: selectedAccount?.ib_account_no,
            institution: selectedAccount?.bank_name,
            acc_no: selectedAccount?.account_no,
            user_id: selectedAccount?.user_id,
            method: data.methods,
          },
          isDeposite
        )(supabase)
        // if (res) {
        toast({
          variant: "success",
          title: isDeposite ? "Deposit Money" : "Withdraw Money",
          description: isDeposite
            ? "Deposit Successfully!"
            : "Withdraw Successfully!",
        })
        setOpen(true)
        // }
        setLoading(false)
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: isDeposite ? "Deposit Money" : "Withdraw Money",
          description: err,
        })
        setLoading(false)
      })
  }

  const getAccounts = () => {
    getACHAccount(token!)
      .then((e: any) => {
        setBankAccounts(e)
      })
      .catch((e) => {
        console.log("error", e)
      })
  }

  useEffect(() => {
    getAccounts()
  }, [])
  return (
    <div className="w-full max-w-[480px] m-[auto] md:mt-11 flex flex-col overflow-hidden">
      <div className="z-10 mobile-card-box md:card-box md:dark:dark-card-box md:border-shadow !p-8">
        <div className="max-md:hidden">
          <BackBtn />
        </div>
        <div className="md:hidden flex items-center justify-between">
          <Link href="/transfer">
            <div>
              <ArrowLeftCircle
                strokeWidth={"0.5px"}
                size={"35px"}
                className="stroke-brand-gray-50 dark:fill-brand-gray-70"
              />
            </div>
          </Link>
          <div>
            <h1 className="black-600 text-base text-center leading-6 dark:text-white">
              {isDeposite ? "Transfer Money" : "Withdraw Money"}
            </h1>
          </div>
          <div></div>
        </div>

        <div className="max-md:hidden mt-3 pb-5 border-b-[1px] border-brand-gray-20 dark:border-brand-gray-80">
          <h1 className="black-600 text-2xl leading-10 dark:text-white">
            {isDeposite ? "Transfer Money" : "Withdraw Money"}
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6 max-md:mt-28">
              <div>
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputInsideLabel
                          inputLabel="Enter Amount"
                          {...field}
                          sign="$"
                          required={false}
                          className="text-gray-brand-100 max-md:border-none price-input max-md:text-center max-md:!text-[40px] dark:bg-transparent font-semibold"
                          placeholder="0.00"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4 max-md:mt-28">
                <FormField
                  control={form.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your Bank Account" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {bankAccounts?.map((acc: any, i: string) => (
                              <SelectItem
                                key={i}
                                value={acc?.bank_account_number}
                              >
                                {acc.bank_name}({acc?.bank_account_number})
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="methods"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Method of Payment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {methods?.map((value, i) => (
                            <SelectItem value={value}>{value}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <AsyncButton
                loading={loading}
                className="w-full h-[43px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize "
              >
                Submit {isDeposite ? "Transfer" : "Withdraw"}
              </AsyncButton>
              <TransferInitiatedModal
                open={open}
                setOpen={(value) => setOpen(value)}
                title={`${isDeposite ? "Transfer" : "Withdraw"} Initiated`}
                description={
                  isDeposite
                    ? `+${form.getValues(
                        "amount"
                      )} deposit will be completed within 3-4 business days…`
                    : `An order for a ${form.getValues(
                        "amount"
                      )} withdrawal will be completed within 3-4 business days...`
                }
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default DepositeWithdrawCard
