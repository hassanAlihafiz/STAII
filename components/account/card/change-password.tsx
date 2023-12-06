import React, { useState } from "react"

import "@/styles/common-page.css"
import { changePasswordByUserId } from "@/async-functions/account"
import { useAppDispatch, useAppSelector } from "@/store"
import { passwordSchema } from "@/utils/password-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import { z } from "zod"

import AsyncButton from "@/components/ui/async-btn"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import PasswordInput from "@/components/ui/password-input"

interface ChangePasswordCardProps {
  oldPassword?: boolean
}

const ChangePasswordCard: React.FC<ChangePasswordCardProps> = ({
  oldPassword = false,
}) => {
  const [showInput, setShowInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = React.useRef<HTMLFormElement | null>(null)
  const dispatch = useAppDispatch()
  const supabase = createClientComponentClient()

  const formSchema = z.object({
    ...(oldPassword
      ? { oldPassword: z.string().nonempty("Old password is required") }
      : {}),
    ...passwordSchema,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(oldPassword ? { oldPassword: "" } : {}),
      password: "",
      confirmpassword: "",
    },
  })

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
    control,
  } = form

  const onSubmit = async (data: any) => {
    setLoading(true)
    const { oldPassword, password, confirmpassword } = data

    if (oldPassword === password) {
      setError("password", {
        message: "New password cannot be the same as the old password.",
      })
      setLoading(false)
      return
    } else if (password !== confirmpassword) {
      setError("confirmpassword", {
        message: "Confirm & New Password Not Matched.",
      })
      setLoading(false)
      return
    } else {
      const passwordChanged = await changePasswordByUserId(password)(
        supabase,
        dispatch
      )
      setLoading(false)
      if (passwordChanged) {
        form.reset()
        setShowInput(false)
      }
    }
  }

  const handleSaveButtonClick = () => {
    if (formRef.current) {
      form.handleSubmit(onSubmit)()
    }
  }

  const handleCancel = () => {
    form.reset()
    setShowInput(false)
  }

  return (
    <div className="w-full">
      <div className="flex-center-between">
        <div className="text-base font-medium text-brand-gray-100 leading-[30px] dark:text-white">
          Change Password
        </div>
        <div>
          {showInput ? (
            <div className="max-md:hidden sm:flex-center-between">
              <Button
                onClick={handleCancel}
                className="w-[110px] h-[43px] mr-[10px] border border-brand-green-40 rounded-[10px] font-[550] capitalize "
                variant="ghost"
              >
                Cancel
              </Button>
              <AsyncButton
                loading={loading}
                text="Save"
                onClick={handleSaveButtonClick}
                className="w-[110px] h-[43px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize "
                disabled={!form.formState.dirtyFields.password}
              />
            </div>
          ) : (
            <Button
              className="w-[105px] h-[47px] border border-brand-green-40 rounded-[10px] font-[550] capitalize"
              variant="ghost"
              name="Change"
              onClick={() => {
                setShowInput(true)
              }}
            >
              Change
            </Button>
          )}
        </div>
      </div>
      {showInput && (
        <Form {...form}>
          {" "}
          <div className="mt-[20px]">
            <form
              className="flex flex-col gap-4"
              ref={(el) => (formRef.current = el)}
              onSubmit={handleSubmit(onSubmit)}
            >
              {oldPassword && (
                <div>
                  <PasswordInput
                    register={register}
                    error={
                      oldPassword && {
                        type: "custom",
                        message: errors?.oldPassword?.message,
                      }
                    }
                    placeholder="Enter old password"
                    name="oldPassword"
                  />
                </div>
              )}
              <div>
                <PasswordInput
                  register={register}
                  error={errors?.password}
                  placeholder="Enter new password"
                  name="password"
                />
              </div>
              <div>
                <PasswordInput
                  register={register}
                  error={errors?.confirmpassword}
                  placeholder="Confirm new password"
                  name="confirmpassword"
                />
              </div>
            </form>
          </div>
        </Form>
      )}
      {showInput && (
        <div className="sm:hidden flex-center mt-[20px]">
          <Button
            onClick={handleCancel}
            className="w-[110px] h-[43px] mr-[10px] border border-brand-green-40 rounded-[10px] font-[550] capitalize "
            variant="ghost"
          >
            Cancel
          </Button>
          <AsyncButton
            loading={loading}
            text="Save"
            onClick={handleSaveButtonClick}
            className="w-[110px] h-[43px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize "
            disabled={!form.formState.dirtyFields.password}
          />
        </div>
      )}
    </div>
  )
}

export default ChangePasswordCard
