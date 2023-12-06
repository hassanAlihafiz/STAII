"use client"

import React, { useEffect, useState } from "react"

import "@/styles/common-page.css"
import { useAppSelector } from "@/store"
import { callPostApi } from "@/utils/api"
import {
  GroupPresets,
  LiveStreamPresets,
  WebinarPresets,
} from "@/utils/presets"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectWithSearch } from "@/components/ui/select-with-search"
import { toast } from "@/components/ui/use-toast"

interface CreateMeetingProps {}
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Please enter meeting title",
  }),
  record_on_start: z.optional(z.boolean()),
  type: z.optional(z.string()),
  meeting_preset: z.string().min(1, {
    message: "Please Select Meeting Presets",
  }),
})

interface CreateMeetingProps {
  getMeeting?: () => void
}

const CreateMeetingModal: React.FC<CreateMeetingProps> = ({ getMeeting }) => {
  const [showModal, setShowModal] = useState(false)
  const supabase = createClientComponentClient()
  const user = useAppSelector((state) => state?.user?.profile?.uid)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "Group",
      meeting_preset: "",
    },
  })

  const onSubmit = async (data: any) => {
    if (data?.record_on_start === undefined) {
      data.record_on_start = false
    }
    try {
      callPostApi(
        "dyte",
        "/meetings",
        {
          title: data?.title,
          record_on_start: data?.record_on_start,
        },
        async (e) => {
          console.log(e?.data?.id)
          await createMeeting(e?.data?.id, data?.type, data?.meeting_preset)
          setShowModal(false)
          if (getMeeting) {
            getMeeting()
          }
          form.reset()
        },
        (err) => {
          toast({
            variant: "destructive",
            title: "Unable to create meeting",
            description: err,
          })
        }
      )
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to create meeting",
        description: "Internal Server Error",
      })
    }
  }

  const createMeeting = async (
    meetingId: string,
    type: string,
    presets: string
  ) => {
    const { data, error } = await supabase.from("dyte_meetings").insert({
      meeting: meetingId,
      user_id: user,
      type: type,
      archive: false,
      meeting_preset: presets,
    })
    if (error) {
      toast({
        variant: "destructive",
        title: "Create Meeting",
        description: error?.message,
      })
      return
    }
    toast({
      variant: "success",
      title: "Create Meeting",
      description: "Meeting Created Successfully!",
    })
  }

  return (
    <Dialog
      open={showModal}
      onOpenChange={() => {
        setShowModal(!showModal)
      }}
    >
      <DialogTrigger asChild>
        <AsyncButton
          className="h-10"
          onClick={() => {
            setShowModal(true)
          }}
        >
          <Plus className="mr-1 max-md:hidden" />
          Create Meeting
        </AsyncButton>
      </DialogTrigger>
      <DialogContent className="modal-section modal-responsive h-auto">
        <DialogHeader>
          <DialogTitle className="relative w-full pb-3 text-left dark:text-white">
            <div className="flex items-center">
              <div>
                <p className="black-600 dark:text-white text-base ml-[5px]">
                  Create a meeting
                </p>
              </div>
            </div>
            <DialogClose className="absolute -top-3 right-0 mt-2 outline-none">
              <X className="ml-auto w-5 cursor-pointer text-brand-gray-50" />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogDescription className="w-full ">
              <div className="pt-[10px] flex  flex-col">
                <div>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <InputInsideLabel
                            inputLabel="Meeting Title"
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
                <div className="flex gap-2 items-center">
                  <FormField
                    control={form.control}
                    name="record_on_start"
                    render={({ field }) => (
                      <FormItem className="mb-0 grid w-fit items-center">
                        <FormControl>
                          <Checkbox
                            className="text-white"
                            id="record_on_start"
                            checked={field.value}
                            onCheckedChange={(e) => {
                              field.onChange(e)
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  Record on Start
                </div>
                <div className="flex gap-2 items-center mt-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={(newValue) => {
                              field.onChange(newValue)
                              form.setValue("meeting_preset", "")
                            }}
                            defaultValue={field.value}
                            className="flex items-center"
                          >
                            <FormItem className="mb-0">
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="Group" />
                                  <span className="text-sm black-600  dark:text-white">
                                    Group
                                  </span>
                                </div>
                              </FormControl>
                            </FormItem>
                            <FormItem className="mb-0">
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="Webinar" />
                                  <span className="text-sm black-600  dark:text-white">
                                    Webinar
                                  </span>
                                </div>
                              </FormControl>
                            </FormItem>
                            <FormItem className="mb-0">
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="Livestream" />
                                  <span className="text-sm black-600  dark:text-white">
                                    Live Stream
                                  </span>
                                </div>
                              </FormControl>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-2 items-center mt-4">
                  <FormField
                    control={form.control}
                    name="meeting_preset"
                    render={({ field }) => {
                      let presets =
                        form.watch("type") === "Group"
                          ? GroupPresets
                          : form.watch("type") === "Webinar"
                          ? WebinarPresets
                          : LiveStreamPresets
                      return (
                        <FormItem>
                          <div className="text-black dark:text-white">
                            Select Presets
                          </div>
                          <Select
                            onValueChange={(newValue) => {
                              console.log(newValue)
                              field.onChange(newValue)
                              form.setValue("meeting_preset", newValue)
                              if (form.formState.isSubmitted) form.trigger()
                            }}
                            value={field?.value}
                          >
                            <SelectTrigger className="w-full h-10 cursor-pointer">
                              <SelectValue placeholder={"Select Preset"} />
                            </SelectTrigger>
                            <SelectContent>
                              {presets?.map((option, index) => (
                                <SelectItem key={index} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </div>
              </div>
            </DialogDescription>
            <div className="mt-6">
              <AsyncButton className="h-10" type="submit">
                Create Meeting
              </AsyncButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateMeetingModal
