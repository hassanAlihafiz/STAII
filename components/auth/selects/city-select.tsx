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
  list: string[]
  placeholder: string
}
export function CitiesSelect({ value, setValue, list, placeholder }: Props) {
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
            ? list.find((li) => li?.toLowerCase() === value?.toLowerCase())
            : `Select ${placeholder}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[95vw] max-w-[35rem] p-0  md:w-[494px]">
        <Command>
          <CommandInput placeholder={`Search ${placeholder}...`} />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="max-h-[250px] overflow-y-auto">
            {list.map((li) => (
              <CommandItem
                key={li}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
                value={li}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    li?.toLowerCase() === value?.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {li}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
