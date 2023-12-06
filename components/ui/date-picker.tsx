"use client"

import * as React from "react"
import { format, startOfToday } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateOfBirthPicker({
  date,
  setDate,
  disablePastDates,
}: {
  date: Date | null
  setDate: (date: Date) => void
  disablePastDates?: boolean
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date && date.toLocaleString().length > 2 ? (
            format(date, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          disablePastDates={disablePastDates}
          fromYear={1900}
          toYear={2023}
          toMonth={new Date()}
          toDate={startOfToday()}
          captionLayout="dropdown-buttons"
          mode="single"
          selected={date as any}
          onSelect={setDate as any}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
