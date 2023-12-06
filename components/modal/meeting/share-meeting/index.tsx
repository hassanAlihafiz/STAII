"use client"

import React, { useEffect, useState } from "react"
import "@/styles/common-page.css"
import {
  createMeetingLink,
  createMeetingLinkWithToken,
  getMeetingType,
} from "@/async-functions/account"
import { useAppSelector } from "@/store"
import { callPostApi } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose } from "@radix-ui/react-dialog"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { X } from "lucide-react"
import moment from "moment"
import { useForm } from "react-hook-form"
import Select from "react-select"
import { z } from "zod"

import AsyncButton from "@/components/ui/async-btn"
import { Button } from "@/components/ui/button"
import { DateOfBirthPicker } from "@/components/ui/date-picker"
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
import { MyCreatableSelect, SelectTimezone } from "@/components/ui/multi-select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const formSchema = z.object({
  event_name: z.string().min(2, {
    message: "Please enter a meeting title",
  }),
  event_description: z.string().min(2, {
    message: "Please enter a description",
  }),
  event_start_time: z.object({
    label: z.string(),
    value: z.string(),
  }),
  event_end_time: z.object({
    label: z.string(),
    value: z.string(),
  }),
  event_start_date: z.string().min(2, {
    message: "Please select a start date",
  }),

  event_timezone: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .optional(),
  event_participant_list: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .min(1, { message: "Please select at least one participant" }),
  event_host_meeting_url: z.optional(z.string()),
  event_participant_url: z.optional(z.string()),
  event_host_name: z.optional(z.string()),
})

interface JoinMeetingModalProps {
  id: string
}

const ShareMeetingModal: React.FC<JoinMeetingModalProps> = ({ id }) => {
  const [userTimeZone, setUserTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const [event_start_date, setEvent_start_date] = useState(null)
  const [email, setEmail] = useState<any>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [endTimeOption, setEndTimeOption] = useState([])
  const supabase = createClientComponentClient()
  const user = useAppSelector((state) => state?.user?.profile)
  const [currentTime, setCurrentTime] = useState(new Date())

  const generateTimeOptions = () => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute === 0 ? "00" : minute.toString()
        const time = `${formattedHour}:${formattedMinute}`
        options.push({ label: time, value: time })
      }
    }
    return options
  }
  const [timeOptions, setTimeOptions] = useState(generateTimeOptions())

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event_name: "",
      event_description: "",
      event_start_date: "",
      // event_timezone: {},
      event_start_time: {
        label: currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        value: currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      },
      event_end_time: {},
      event_participant_list: [],
      event_host_meeting_url: "",
      event_participant_url: "",
      event_host_name: "",
    },
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form
  const onSubmit = async (data: any) => {
    setLoader(true)
    const url: any = await GenerateLink()
    let param = {
      ...data,
      event_participant_list: data?.event_participant_list?.map(
        (e: any) => e?.label
      ),
      event_start_time: data?.event_start_time.label,
      event_end_time: data?.event_end_time.label,
      event_start_date: moment(event_start_date).format("MM-DD-YYYY"),
      event_end_date: moment(event_start_date).format("MM-DD-YYYY"),
      event_host_email: user?.email,
      event_host_name: user?.name,
      event_host_meeting_url: url?.event_host_meeting_url,
      event_participant_url: url?.event_participant_url,
      event_timezone: userTimeZone,
    }
    await createEvent(param)
  }

  const handleStartDateSelect = (date: any) => {
    setEvent_start_date(date)
  }

  const createEvent = (data: any) => {
    try {
      callPostApi(
        "default",
        "dyte/send-invites",
        data,
        (e) => {
          toast({
            variant: "success",
            title: "Create Event",
            description: e?.message,
          })
          setLoader(false)
          setIsOpen(false)
          form.reset()
        },
        (err) => {
          toast({
            variant: "destructive",
            title: "Event Create",
            description: err,
          })
          setLoader(false)
        }
      )
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Event Create",
        description: "Internal Server Error",
      })
      setLoader(false)
    }
  }

  const GenerateLink = async () => {
    try {
      const result = await getMeetingType(id, true)(supabase)
      if (result !== null) {
        const data = {
          name: user?.name,
          picture: user?.profile_url,
          preset_name: result,
          custom_participant_id: user?.uid,
        }

        return new Promise((resolve, reject) => {
          callPostApi(
            "dyte",
            `meetings/${id}/participants`,
            data,
            (e) => {
              const event_host_meeting_url = createMeetingLinkWithToken(
                id,
                e?.data?.token
              )
              const event_participant_url = createMeetingLink(id)

              resolve({
                event_host_meeting_url,
                event_participant_url,
              })
            },
            (err) => {
              reject(new Error("Unable to add participants: " + err))
            }
          )
        })
      } else {
        throw new Error("Unable to fetch the preset name")
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Fetch Email",
        description: "Unable to add participants",
      })
      setLoader(false)
    }
  }

  const onClose = (e: any) => {
    setIsOpen(e)
    form.reset()
  }

  const getAllEmails = async () => {
    const { data, error } = await supabase
      .from("user_contacts")
      .select("*")
      .eq("userID", user?.uid)
    if (data) {
      const transformedOptions = data.map((item) => ({
        label: item?.Email,
        value: item?.Email,
        name: item?.Name,
        company: item?.Company,
      }))
      setEmail(transformedOptions)
    }
    if (error) {
      toast({
        variant: "destructive",
        title: "Fetch Email",
        description: error?.message,
      })
    }
  }

  useEffect(() => {
    if (isOpen) {
      getAllEmails()
    }
  }, [isOpen])

  useEffect(() => {
    if (event_start_date && isOpen) {
      const currentDateTime = moment()
      if (currentDateTime.isAfter(event_start_date)) {
        const filteredTimes = timeOptions.filter((timeOption: any) => {
          const optionDateTime = moment(timeOption.label, "HH:mm")
          return optionDateTime.isAfter(currentDateTime)
        })
        setTimeOptions(filteredTimes)
      } else {
        const newTimeOptions = generateTimeOptions()
        setTimeOptions(newTimeOptions)
      }
    }
  }, [event_start_date, timeOptions, isOpen])

  useEffect(() => {
    if (form.watch("event_start_time") && isOpen) {
      const selectedStartTime = form.watch("event_start_time").value
      const selectedTime = moment(selectedStartTime, "HH:mm")
      const defaultEndTime = selectedTime.add(1, "hour").format("HH:mm")
      form.setValue("event_end_time", {
        label: defaultEndTime,
        value: defaultEndTime,
      })
    }
  }, [form.watch("event_start_time"), isOpen])

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
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="modal-section modal-responsive h-auto">
        <DialogHeader>
          <DialogTitle className="relative w-full pb-3 text-left dark:text-white">
            <div className="flex items-center">
              <div>
                <p className="black-600 dark:text-white text-base ml-[5px]">
                  Create Event / Share Meeting
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
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogDescription className="w-full max-h-[calc(100vh_-_180px)] overflow-y-auto">
              <div className="pt-[10px]">
                <div className="flex  flex-col text-brand-gray-60 dark:text-brand-gray-30 font-normal text-left">
                  <FormField
                    control={form.control}
                    name="event_name"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <InputInsideLabel
                            {...field}
                            inputLabel="Event Name"
                            className="h-10"
                            labelClass="max-md:!text-left max-md:!top-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="w-full">
                    <p className="mb-1">Start Date:</p>
                    <FormField
                      control={form.control}
                      name="event_start_date"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <DateOfBirthPicker
                              disablePastDates={true}
                              {...field}
                              date={event_start_date}
                              setDate={(e) => {
                                handleStartDateSelect(e)
                                field.onChange(e?.toISOString())
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <p className="mb-1">Select Timezone:</p>
                    <FormField
                      control={form.control}
                      name="event_timezone"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <SelectTimezone
                              {...field}
                              value={userTimeZone}
                              onChange={(e: any) => {
                                setUserTimeZone(e?.value)
                                field.onChange(e)
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-[50%]">
                      <p className="mb-1">Start Time:</p>
                      <FormField
                        control={form.control}
                        name="event_start_time"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl>
                              <MyCreatableSelect
                                {...field}
                                placeholder="Select start time"
                                closeMenuOnSelect={true}
                                options={timeOptions}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-[50%]">
                      <p className="mb-1">End Time:</p>
                      <FormField
                        control={form.control}
                        name="event_end_time"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl>
                              <MyCreatableSelect
                                {...field}
                                placeholder="Select end time"
                                closeMenuOnSelect={true}
                                options={timeOptions}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="event_participant_list"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <MyCreatableSelect
                              placeholder="Select participants"
                              {...field}
                              closeMenuOnSelect={false}
                              isMulti
                              options={email}
                              isValidNewOption={(inputValue: string) => {
                                const isValidEmail = emailRegex.test(inputValue)
                                return isValidEmail
                              }}
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
                      name="event_description"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <Textarea
                              {...field}
                              className="dark:bg-transparent"
                              placeholder="Type your message here."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </DialogDescription>
            <div className="flex gap-2 ">
              <AsyncButton
                loading={loader}
                type="submit"
                variant="default"
                className="w-full h-10 border border-brand-green-40 dark:border-transparent rounded-lg font-[550] capitalize "
              >
                Create Event
              </AsyncButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ShareMeetingModal
