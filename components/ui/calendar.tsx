"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  disablePastDates?: boolean
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  disablePastDates = false,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      disabled={disablePastDates ? { before: new Date() } : false}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 ",
        month: "space-y-4 text-sm font-medium ",
        dropdown_month:
          " p-1 [&>select]:font-semibold [&>select]:bg-transparent [&>select]:appearance-none [&>select]:focus-within:outline-none",

        caption: "flex justify-center pt-1 relative items-center ",
        caption_label: "text-sm font-medium hidden",

        dropdown_year:
          "pt-0 p-1 [&>select]:font-semibold  [&>select]:px-4 [&>select]:p-2 [&>select]:focus-within:outline-none [&>select]:cursor-pointer [&>select]:rounded-sm [&>select]:dark:bg-gray-600   ",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn("h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_selected: cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          " text-primary-foreground  hover:text-primary-foreground focus:text-primary-foreground"
        ),
        day_today: " text-primary-foreground font-semibold",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
