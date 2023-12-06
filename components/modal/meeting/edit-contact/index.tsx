import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose } from "@radix-ui/react-dialog"
import { IconButton } from "@radix-ui/themes"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { FileEdit, Trash2, X } from "lucide-react"
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
import { Icon } from "@/components/icons"

const formSchema = z.object({
  Name: z.string().min(2, {
    message: "Please enter meeting title",
  }),
  Email: z.string().email({
    message: "Please enter a valid email address",
  }),
  Company: z.optional(
    z.string().min(2, {
      message: "Please enter meeting title",
    })
  ),
})

interface EditContactModalProps {
  data: {
    id: string
    Email: string
    Name: string
    Company: string
  }
  getContacts: () => void
}

export const EditContactModal: React.FC<EditContactModalProps> = ({
  data,
  getContacts,
}) => {
  const [loader, setLoader] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createClientComponentClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: data?.Email,
      Name: data?.Name,
      Company: data?.Company,
    },
  })

  const onClose = (e: any) => {
    setIsOpen(e)
  }
  const onSubmit = async (values: any) => {
    setLoader(true)
    const { error } = await supabase
      .from("user_contacts")
      .update({
        Name: values?.Name,
        Email: values?.Email,
        Company: values?.Company,
      })
      .eq("id", data.id)
    if (error) {
      toast({
        variant: "destructive",
        title: "Update Contact",
        description: error?.message,
      })
    } else {
      getContacts()
      toast({
        variant: "success",
        title: "Update Contact",
        description: "Contact Updated Successfully!",
      })
    }

    setLoader(false)
    setIsOpen(false)
    form.reset()
  }
  const onDelete = async () => {
    setLoader(true)

    const { error } = await supabase
      .from("user_contacts")
      .delete()
      .eq("id", data?.id)

    if (error) {
      toast({
        variant: "destructive",
        title: "Delete Contact",
        description: error?.message,
      })
    } else {
      getContacts()
      toast({
        variant: "success",
        title: "Delete Contact",
        description: "Contact Deleted Successfully!",
      })
    }

    setLoader(false)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-10"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          <FileEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="modal-section modal-responsive h-auto">
        <DialogHeader>
          <DialogTitle className="relative w-full pb-3 text-left dark:text-white">
            <div className="flex items-center">
              <div>
                <p className="black-600 dark:text-white text-base ml-[5px]">
                  Edit Contact
                </p>
              </div>
            </div>
            <DialogClose
              className="absolute -top-3 right-0 mt-2 outline-none"
              onClick={onClose}
            >
              <X className="ml-auto w-5 cursor-pointer text-brand-gray-50" />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
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
                <div className="flex gap-3 mt-6">
                  <IconButton onClick={onDelete} title="Delete contact?">
                    {loader ? (
                      <div
                        className="spin-loader h-5 w-5 text-gray-400 dark:text-white"
                        role="status"
                      />
                    ) : (
                      <Trash2 color="red" />
                    )}
                  </IconButton>
                  <AsyncButton className="h-10" type="submit" loading={loader}>
                    Update Contact
                  </AsyncButton>
                </div>
              </form>
            </Form>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
