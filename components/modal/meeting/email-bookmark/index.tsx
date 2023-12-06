"use client"

import React, { useEffect, useState } from "react"

import "@/styles/common-page.css"
import { useAppSelector } from "@/store"
import { callPostApi } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose } from "@radix-ui/react-dialog"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Plus, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import AsyncButton from "@/components/ui/async-btn"
import { Checkbox } from "@/components/ui/checkbox"
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
  Name: z.string().min(2, {
    message: "Please enter contact name",
  }),
  Email: z.string().email({
    message: "Please enter a valid email address",
  }),
  Company: z.optional(
    z.string().min(2, {
      message: "Please enter Company Name",
    })
  ),
})

interface EmailBookmarkProps {
  getContacts: () => void
}

const EmailBookmark: React.FC<EmailBookmarkProps> = ({ getContacts }) => {
  const [showModal, setShowModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const supabase = createClientComponentClient()
  const user = useAppSelector((state) => state?.user?.profile?.uid)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Name: "",
    },
  })

  const onSubmit = async (values: any) => {
    setLoader(true)
    const { data, error } = await supabase.from("user_contacts").insert({
      Name: values?.Name,
      Email: values?.Email,
      Company: values?.Company,
      userID: user,
    })
    if (error) {
      toast({
        variant: "destructive",
        title: "Create Meeting",
        description: error?.message,
      })
      return
    }

    getContacts()
    toast({
      variant: "success",
      title: "Add Contact",
      description: "Contact Created Successfully!",
    })
    setLoader(false)
    setShowModal(false)
    form.reset()
  }
  return (
    <Dialog
      open={showModal}
      onOpenChange={() => {
        setShowModal(!showModal)
        form.reset()
      }}
    >
      <DialogTrigger asChild>
        <AsyncButton
          className="h-10"
          onClick={() => {
            setShowModal(true)
          }}
        >
          Add Contact
        </AsyncButton>
      </DialogTrigger>
      <DialogContent className="modal-section modal-responsive h-auto">
        <DialogHeader>
          <DialogTitle className="relative w-full pb-3 text-left dark:text-white">
            <div className="flex items-center">
              <div>
                <p className="black-600 dark:text-white text-base ml-[5px]">
                  Add Contact
                </p>
              </div>
            </div>
            <DialogClose className="absolute -top-3 right-0 mt-2 outline-none">
              <X className="ml-auto w-5 cursor-pointer text-brand-gray-50" />
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="w-full">
            <div className="pt-[10px] flex  flex-col">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div>
                    <FormField
                      control={form.control}
                      name="Name"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <InputInsideLabel
                              inputLabel="Name"
                              className="h-10"
                              labelClass="max-md:!text-left max-md:!top-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="Email"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <InputInsideLabel
                              inputLabel="Email Address"
                              className="h-10"
                              labelClass="max-md:!text-left max-md:!top-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="Company"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <InputInsideLabel
                              inputLabel="Company Name"
                              className="h-10"
                              labelClass="max-md:!text-left max-md:!top-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-6">
                    <AsyncButton
                      className="h-10"
                      type="submit"
                      loading={loader}
                    >
                      Save Contact
                    </AsyncButton>
                  </div>
                </form>
              </Form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EmailBookmark
