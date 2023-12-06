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
import { recurrenceOptions } from "@/utils/calendar"
import { zodResolver } from "@hookform/resolvers/zod"
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { InputInsideLabel } from "@/components/ui/input-inside-label"
import { MyCreatableSelect, SelectTimezone } from "@/components/ui/multi-select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const formSchema = z.object({
  event_name: z.string().min(2, {
    message: "Please enter a meeting title",
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
  event_recurrenceRule: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .optional(),
  event_timezone: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .optional(),
  event_participant_list: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  event_host_meeting_url: z.optional(z.string()),
  event_participant_url: z.optional(z.string()),
  event_host_name: z.optional(z.string()),
})

interface CalendarDrawerModalProps {
  id: string
}

const CalendarDrawer: React.FC<CalendarDrawerModalProps> = ({ id }) => {
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
      event_start_date: "",
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
      event_recurrenceRule: {
        label: "Not recurring",
        value: "not_recurring",
      },
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
      event_recurrenceRule: data?.event_recurrenceRule?.value,
      event_start_date: moment(event_start_date).format("YYYY-MM-DD"),
      event_end_date: moment(event_start_date).format("YYYY-MM-DD"),
      event_host_email: user?.email,
      event_host_name: user?.name,
      event_host_meeting_url: url?.event_host_meeting_url,
      event_participant_url: url?.event_participant_url,
      event_timezone: userTimeZone,
    }

    const start_dateTime = moment(
      param?.event_start_date + "T" + param?.event_start_time + ":00Z"
    ).format("YYYYMMDDTHHmm00Z")
    const end_dateTime = moment(
      param?.event_end_date + "T" + param?.event_end_time + ":00Z"
    ).format("YYYYMMDDTHHmm00Z")
    const participants = param?.event_participant_list?.join(",")
    const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&dates=${start_dateTime}/${end_dateTime}&text=${encodeURIComponent(
      param?.event_name
    )}&details=${encodeURIComponent(
      `Participant URL: ${param?.event_participant_url}`
    )}&ctz=${param.event_timezone}&location=${
      param.event_host_meeting_url
    }&add=${participants}&recur=${param?.event_recurrenceRule}`
    window.open(googleCalendarLink)
    setLoader(false)
    setIsOpen(false)
    form.reset()
  }

  const handleStartDateSelect = (date: any) => {
    setEvent_start_date(date)
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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 max-md:w-44"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          Add Google Calendar
        </Button>
      </SheetTrigger>
      <SheetContent className="drawer-section drawer-responsive">
        <SheetHeader>
          <SheetTitle className="relative w-full pb-3 text-left dark:text-white p-5">
            <div className="flex items-center">
              <div>
                <p className="black-600 dark:text-white text-base ml-[5px]">
                  Add Google Calendar
                </p>
              </div>
            </div>
            <SheetClose
              className="absolute top-3 right-0 mr-5 mt-2 outline-none"
              onClick={onClose}
            >
              <X className="ml-auto w-5 cursor-pointer text-brand-gray-50" />
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" overflow-y-auto overflow-x-hidden h-[calc(100%-60px)]  flex justify-center flex-col"
          >
            <SheetDescription className="w-full px-3 h-[calc(100%-85px)] overflow-y-auto overflow-x-hidden">
              <div className="pt-[10px]">
                <div className="flex  flex-col text-brand-gray-60 dark:text-brand-gray-30 font-normal text-left">
                  <FormField
                    control={form.control}
                    name="event_name"
                    render={({ field }) => (
                      <FormItem className="mb-2">
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
                        <FormItem className="mb-2">
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
                        <FormItem className="mb-2">
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
                          <FormItem className="mb-2">
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
                          <FormItem className="mb-2">
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
                      name="event_recurrenceRule"
                      render={({ field }) => (
                        <FormItem className="mb-2">
                          <FormControl>
                            <MyCreatableSelect
                              placeholder="Select Meeting Rule"
                              {...field}
                              closeMenuOnSelect={false}
                              options={recurrenceOptions}
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
                </div>
              </div>
            </SheetDescription>

            <SheetFooter className="border-t-[1px] border-brand-gray-20 dark:border-brand-gray-80">
              <div className="flex justify-center items-center p-4 w-full">
                <AsyncButton
                  loading={loader}
                  type="submit"
                  variant="default"
                  className="w-full h-10 border border-brand-green-40 dark:border-transparent rounded-lg font-[550] capitalize "
                >
                  Generate
                </AsyncButton>
              </div>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default CalendarDrawer
