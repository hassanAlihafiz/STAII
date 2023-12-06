"use client"

import React, { useEffect, useState } from "react"

import "@/styles/common-page.css"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store"
import { callPostApi, callPostApiWithAuth } from "@/utils/api"
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  community_name: z
    .string()
    .min(2, {
      message: "Please enter Community Name",
    })
    .regex(/^[a-z0-9_]+$/, {
      message:
        "Community name can only contain lowercase letters, numbers, and underscores",
    }),
  community_title: z.string().min(2, {
    message: "Please enter Community Title",
  }),
  community_description: z.string().min(2, {
    message: "Please enter Community Description",
  }),
})

const CreateCommunityModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [imageError, setImageError] = useState("")
  const [selectedImage, setSelectedImage] = useState<any | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const token = useAppSelector((state) => state.user.token)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      community_name: "",
      community_title: "",
      community_description: "",
    },
  })
  const handleImageUpload = async () => {
    let imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo-icon.svg`
    if (!selectedImage) return imageUrl
    const formData = new FormData()
    console.log(selectedImage)
    formData.append("images[]", selectedImage)
    await callPostApiWithAuth(
      "lemmy",
      "/pictrs/image",
      formData,

      (e) => {
        console.log(e)
        imageUrl = `${process?.env.NEXT_PUBLIC_LEMMY_URL}/pictrs/image/${e?.files[0]?.file}`
        return imageUrl
      },
      token,
      ({ message: err, status }) => {
        console.error(err, status)
        return imageUrl
      }
    )
    return imageUrl
  }
  const onSubmit = async (data: any) => {
    setLoading(true)
    const imageUrl = await handleImageUpload()
    const payload = {
      name: data.community_name,
      title: data.community_title,
      description: data.community_description,
      icon: imageUrl,
    }
    await callPostApiWithAuth(
      "lemmy",
      "/community",
      payload,

      (res) => {
        console.log(res)
        setLoading(false)
        setShowModal(false)
        toast({
          title: "Community Created Successfully!",
          description: "Please, visit people tab to see your community.",
          variant: "success",
        })
      },
      token,
      (err) => {
        console.log(err)
        setLoading(false)
      }
    )
  }

  const handleUpLoad = (event: any) => {
    const file = event.target.files[0]
    if (
      !file?.type.includes("image/jpeg") &&
      !file?.type.includes("image/png")
    ) {
      setImageError("Image Format should be JPEG or PNG")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("File size should not exceed 5MB.")
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setImageError("")
      const img = document.createElement("img")
      img.onload = () => {
        if (img.width < 100 || img.height < 100) {
          setImageError("Minimum image size required: 100x100 pixels.")
          return
        }
        setSelectedImage(file)
      }
      img.src = reader?.result as string
    }
    reader.readAsDataURL(file)
  }

  return (
    <Dialog
      open={showModal}
      onOpenChange={() => {
        setShowModal(!showModal)
      }}
    >
      <DialogTrigger asChild>
        <div>
          <AsyncButton
            variant={"ghost"}
            className="h-10 whitespace-nowrap"
            onClick={() => {
              setShowModal(true)
            }}
          >
            Create My Community
          </AsyncButton>
        </div>
      </DialogTrigger>
      <DialogContent className="modal-section modal-responsive h-auto">
        <DialogHeader>
          <DialogTitle className="relative w-full text-left dark:text-white">
            <div className="flex items-center">
              <div>
                <p className="black-600 dark:text-white text-base ml-[5px]">
                  Create Community
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
            <DialogDescription className="w-full">
              <div className="pt-[10px] flex  flex-col">
                <div className="pb-[5px]">
                  <div className="flex">
                    <div className="w-[72px] h-[72px] rounded-[50%]">
                      <Image
                        src={
                          selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : "/images/logo-icon.svg"
                        }
                        alt="user"
                        className="object-cover w-full h-full rounded-[50%]"
                        width={72}
                        height={72}
                      />
                    </div>
                    <div className="ml-[15px] flex-center-between">
                      <label className="w-[120px] h-[40px] gap-[10px] flex items-center justify-center bg-brand-green-70 rounded-[10px] cursor-pointer">
                        <Image
                          src="/icons/upload-cloud.svg"
                          alt="user"
                          className="ml-[-10px]"
                          width={20}
                          height={20}
                        />
                        <span className="text-white text-[14px] font-medium">
                          Upload
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleUpLoad}
                        />
                      </label>
                    </div>
                  </div>
                  {imageError && (
                    <p className="text-red-600 text-[12px] mt-2">
                      {imageError}
                    </p>
                  )}
                  <div className="mt-[20px]">
                    <div>
                      <p className="text-brand-gray-100 dark:text-white text-[12px] font-semibold text-left">
                        Photo requirements
                      </p>
                    </div>
                    <div>
                      <ul className="list-disc ml-[20px] text-brand-gray-100 dark:text-white text-[12px] text-left">
                        <li>Only JPEG or PNG format</li>
                        <li>Max size of the file 5MB</li>
                        <li>Minimum size of the picture 100x100 pixels</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="community_name"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormControl>
                          <InputInsideLabel
                            inputLabel="Community Name"
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
                    name="community_title"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormControl>
                          <InputInsideLabel
                            inputLabel="Community Title"
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
                    name="community_description"
                    render={({ field }) => (
                      <FormItem className="mb-0">
                        <FormControl>
                          <Textarea
                            className="bg-transparent"
                            {...field}
                            placeholder="Type your message here."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="text-xs font-normal text-gray-60 mt-1">
                You can also specify hashtags using the # symbol in the
                description. With their help users will be able to find your
                community.
              </div>
            </DialogDescription>

            <div className="mt-6">
              <AsyncButton className="h-10" type="submit" loading={loading}>
                Submit
              </AsyncButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCommunityModal
