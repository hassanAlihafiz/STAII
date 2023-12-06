"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
  value: string
  setValue: (value: string) => void
  list: { label: string; value: string }[]
  placeholder: string
  handleValue?: (value: string) => void
}
export function SelectWithSearch({
  value,
  setValue,
  list,
  placeholder,
  handleValue,
}: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="input  w-full justify-between text-muted-foreground hover:text-muted-foreground "
        >
          {value
            ? list.find((li) => li.value === value)?.label
            : `Select ${placeholder}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[95vw] max-w-[35rem] p-0  md:w-[494px]">
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder}...`}
            onValueChange={(value) => (handleValue ? handleValue(value) : {})}
          />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {list.map((li) => (
              <CommandItem
                key={li.value}
                onSelect={(currentValue) => {
                  const selectValue = list.find(
                    (li) =>
                      li.label?.toLowerCase() === currentValue?.toLowerCase()
                  )
                  setValue(currentValue === value ? "" : selectValue?.value!)
                  setOpen(false)
                }}
                value={li.label}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === li.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {li.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
