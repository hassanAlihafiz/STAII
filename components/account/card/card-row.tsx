"use client"

import React, { useState } from "react"

import "@/styles/common-page.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { InputInsideLabel } from "@/components/ui/input-inside-label"
import { ThemeToggle } from "@/components/header/theme-toggle"

import { Button, ButtonProps } from "../../ui/button"
import ToggleSwitch from "../../ui/toggle-switch"

const defaultSchema = z.object({
  field: z.string().min(2, {
    message: "Atleast 2 characters",
  }),
})

interface cardProps {
  title?: string
  description?: string
  onSubmit?: (values: any) => Promise<true | undefined> | void
  buttonText?: string
  buttonVariant?: "toggle" | "arrow" | "darkMode" | ButtonProps["variant"]
  noBorder?: boolean
  toggleSwitch?: boolean
  inputLabel?: string
  titleColor?: boolean
  buttonStyle?: string
  formSchema?: any
}

const Card = ({
  title,
  description,
  buttonText,
  buttonVariant,
  noBorder,
  onSubmit,

  titleColor,
  buttonStyle,
  inputLabel,
  formSchema = defaultSchema,
}: cardProps) => {
  const [showInput, setShowInput] = useState(false)
  const formRef = React.useRef<HTMLFormElement | null>(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      field: "",
    },
  })
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form

  const handleCancel = () => {
    reset()
    setShowInput(false)
  }
  const submitData = async (value: { field: string }) => {
    console.log("value?.field", value?.field)

    if (!onSubmit) return
    const res = await onSubmit(value?.field)
    if (res) handleCancel()
  }
  return (
    <form className="w-full" onSubmit={handleSubmit(submitData)}>
      <Form {...form}>
        <div className="flex-center-between gap-4">
          <div>
            <div
              className={`text-base font-medium ${
                titleColor
                  ? "text-brand-red-70"
                  : "text-brand-gray-100 dark:text-white"
              } leading-[30px]`}
            >
              {title}
            </div>
            {description && (
              <div className="text-brand-gray-60 dark:text-brand-gray-30 text-sm font-normal">
                {description}
              </div>
            )}
          </div>
          {buttonVariant && (
            <div>
              {buttonVariant === "arrow" ? (
                <div className="flex-center-between">
                  <div>
                    <p className="black-sm-500 dark:text-white mr-2">
                      {buttonText || ""}
                    </p>
                  </div>

                  <div>
                    <ChevronRight className="w-5 h-5 text-brand-gray-50" />
                  </div>
                </div>
              ) : buttonVariant === "toggle" ? (
                <ToggleSwitch onChange={onSubmit!} />
              ) : buttonVariant === "darkMode" ? (
                <ThemeToggle />
              ) : (
                <>
                  {showInput ? (
                    <div className="sm:flex-center-between max-sm:hidden">
                      <Button
                        onClick={handleCancel}
                        className="w-[110px] h-[43px] mr-[10px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize "
                        variant="ghost"
                        type="reset"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="w-[110px] h-[43px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize "
                        disabled={!form.formState.isDirty}
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className={`${buttonStyle} h-[47px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize`}
                      variant={
                        (buttonVariant as ButtonProps["variant"]) || "ghost"
                      }
                      name={buttonText}
                      type="button"
                      onClick={() => {
                        if (!buttonText) {
                          setShowInput(true)
                        }
                      }}
                    >
                      {buttonText || "Edit"}
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        {showInput && (
          <FormField
            control={form.control}
            name="field"
            render={({ field }) => (
              <FormItem className="my-[20px]">
                <FormControl>
                  <InputInsideLabel
                    className="!bg-white dark:!bg-brand-blue-90 dark:!border-brand-gray-70"
                    inputLabel={inputLabel}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {showInput && (
          <div className="flex-center-between sm:hidden">
            <Button
              onClick={handleCancel}
              className="w-full h-[43px] mr-[10px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize "
              variant="ghost"
              type="reset"
            >
              Cancel
            </Button>
            <Button
              className="w-full h-[43px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize "
              disabled={!form.formState.isDirty}
              type="submit"
            >
              Save
            </Button>
          </div>
        )}

        {!noBorder && (
          <div className="my-[20px] bg-brand-gray-20 dark:bg-brand-gray-80 h-[2px] rounded"></div>
        )}
      </Form>
    </form>
  )
}
export default Card
