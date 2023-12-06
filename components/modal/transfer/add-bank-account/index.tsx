"use client"

import React, { useState } from "react"

import "@/styles/common-page.css"
import { PostAchRelationship } from "@/async-functions/alpaca/ach-relationship"
import { addBankAccountDetails } from "@/async-functions/bank"
import { useAppDispatch, useAppSelector } from "@/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose } from "@radix-ui/react-dialog"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Plus, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import AsyncButton from "@/components/ui/async-btn"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { InputInsideLabel } from "@/components/ui/input-inside-label"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  bankName: z.string().min(4, {
    message: "Invalid Bank Name",
  }),
  AccountNumber: z.string().min(4, {
    message: "Invalid Bank Account Number",
  }),
  routingNumber: z.string().min(9, {
    message: "Invalid Routing Number",
  }),
})

const AddBankAccountModal = () => {
  const dispatch = useAppDispatch()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankName: "",
      AccountNumber: "",
      routingNumber: "",
    },
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form
  const userId = useAppSelector((state) => state.user.profile?.uid)
  const token = useAppSelector((state) => state?.user?.token)
  const ibAccount = useAppSelector((state) => state.user.ibAccount?.account_no)
  const onSubmit = async (data: any) => {
    setLoading(true)
    let payload = {
      account_owner_name: "Christie Ruales",
      bank_account_type: "CHECKING",
      bank_account_number: data?.AccountNumber,
      bank_routing_number: data?.routingNumber,
      nickname: data?.bankName,
    }
    PostAchRelationship(payload, token!)
      .then(async (e) => {
        const res = await addBankAccountDetails({ ...data, userId, ibAccount })(
          dispatch,
          supabase
        )
        if (res) {
          toast({
            variant: "success",
            title: "Bank Account",
            description: "Bank Account Added Successfully",
          })
          setLoading(false)
          setOpen(false)
        }
      })
      .catch((e) => {
        toast({
          variant: "destructive",
          title: "Bank Account",
          description: e,
        })
        setLoading(false)
      })
  }

  const onClose = (e: any) => {
    setOpen(e)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={(e) => onClose(e)}>
      <DialogTrigger asChild>
        <div className="flex text-brand-red-70 text-base font-medium">
          <Button
            onClick={() => setOpen(true)}
            variant="ghost"
            className="h-10 rounded-lg border border-[#C1F0DB]"
          >
            <Plus className="mr-2" />
            Add Account
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="modal-section modal-responsive focus:outline-none">
        <DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle className="relative w-full pb-3 text-left dark:text-white">
                <div className="flex items-center">
                  <p className="black-600 dark:text-white text-lg ml-[5px]">
                    Add Bank Account
                  </p>
                </div>
                <DialogClose className="absolute -top-3 right-0 mt-2 outline-none">
                  <X className="ml-auto w-5 cursor-pointer text-brand-gray-50" />
                </DialogClose>
              </DialogTitle>
              <DialogDescription className="w-full">
                <div className="pt-[10px]">
                  <div>
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputInsideLabel
                              inputLabel="Bank Name"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="AccountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputInsideLabel
                              inputLabel="Bank Account Number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="routingNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputInsideLabel
                              inputLabel="Routing Number"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <AsyncButton
                      loading={loading}
                      text="Sumbit"
                      className="w-full h-[43px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize "
                    />
                  </div>
                </div>
              </DialogDescription>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddBankAccountModal
