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
  list: { name: string; state_code: string }[]
  placeholder: string
}
export function SelectState({ value, setValue, list, placeholder }: Props) {
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
            ? list.find((li) => li.state_code === value)?.name
            : `Select ${placeholder}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[95vw] max-w-[35rem] p-0  md:w-[304px]">
        <Command>
          <CommandInput placeholder={`Search ${placeholder}...`} />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="max-h-[250px] overflow-y-auto">
            {list.map((li) => (
              <CommandItem
                key={li.state_code}
                onSelect={(currentValue) => {
                  const selectValue = list.find(
                    (li) =>
                      li.name?.toLowerCase() === currentValue?.toLowerCase()
                  )
                  setValue(
                    currentValue === value ? "" : selectValue?.state_code!
                  )
                  setOpen(false)
                }}
                value={li.name}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === li.state_code ? "opacity-100" : "opacity-0"
                  )}
                />
                {li.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
