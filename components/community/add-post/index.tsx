"use client"

import React, { useState } from "react"

import "@/styles/common-page.css"
import Image from "next/image"
import { useAppSelector } from "@/store"
import { callPostApiWithAuth } from "@/utils/api"
import axios from "axios"
import { MoveDown, MoveUp, Search, Trash } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface AddPostProps {
  searchBar?: boolean
  showOnmobileView?: boolean
  setIsUpdate?: (update: boolean) => void
  isPost?: boolean
  post_id?: number
  getComments?: () => void
}
interface PostData {
  body: string
  community_id: number
  name: string
  url?: string
  sentiment: "bullish" | "bearish" | "none"
}
export default function AddPost({
  searchBar,
  showOnmobileView,
  setIsUpdate,
  isPost,
  post_id,
  getComments,
}: AddPostProps) {
  const [postText, setPostText] = useState("")
  const [imageFile, setImageFile] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [postName, setPostName] = useState("")
  const [sentiment, setSentiment] = useState<PostData["sentiment"]>("none")
  const token = useAppSelector((state) => state.user.token)
  const profile = useAppSelector((state) => state.user.profile)
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    console.log(file)
    if (file) {
      setPostName(file.name)
      const formData = new FormData()
      formData.append("images[]", file)
      console.log(formData)
      callPostApiWithAuth(
        "lemmy",
        "/pictrs/image",
        formData,

        (e) => {
          setImageUrl(
            `${process?.env.NEXT_PUBLIC_LEMMY_URL}/pictrs/image/${e?.files[0]?.file}`
          )
          setImageFile(file)
          toast({
            variant: "success",
            title: "Image Upload",
            description: "Image Uploaded successful",
          })
        },
        token,
        ({ message: err, status }) => {
          console.error(err, status)
          toast({
            variant: "destructive",
            title: "Image Upload",
            description: err,
          })
        }
      )
      e.target.value = ""
    }
  }

  const handleDeleteImage = () => {
    setImageFile(null)
  }

  const handlePost = () => {
    const data: PostData = {
      body: postText,
      community_id: 2,
      name: postName ? postName : "Test",
      sentiment,
    }
    if (imageUrl) {
      data.url = imageUrl
    }
    callPostApiWithAuth(
      "lemmy",
      "/post",
      data,

      (e) => {
        toast({
          variant: "success",
          title: "Add Post",
          description: "Post Created Successfully!",
        })
        if (setIsUpdate) {
          setIsUpdate(true)
        }
        setSentiment("none")
        setImageUrl("")
        setImageFile("")
        setPostText("")
      },
      token,
      ({ message: err, status }) => {
        console.error(err, status)
        toast({
          variant: "destructive",
          title: "Add Post",
          description: err,
        })
      }
    )
  }

  const addComment = () => {
    callPostApiWithAuth(
      "lemmy",
      "/comment",
      {
        content: postText,
        post_id: post_id,
        sentiment,
      },

      (e) => {
        toast({
          variant: "success",
          title: "Add Comment",
          description: "Post Created Successfully!",
        })
        if (getComments) {
          getComments()
        }
        setSentiment("none")
        setImageUrl("")
        setImageFile("")
        setPostText("")
      },
      token,
      ({ message: err, status }) => {
        console.error(err, status)
        toast({
          variant: "destructive",
          title: "Add Comment",
          description: err,
        })
      }
    )
  }
  const handleSetSentiment = (value: PostData["sentiment"]) => {
    if (value === sentiment) return setSentiment("none")
    setSentiment(value)
  }
  return (
    <div>
      <div
        className={`${showOnmobileView ? " max-md:block" : "max-md:hidden"} `}
      >
        <div
          className={`flex gap-2.5 ${
            showOnmobileView ? " max-md:block" : "max-md:hidden"
          }`}
        >
          <div className="max-md:flex max-md:justify-between max-md:items-center max-md:mb-3.5">
            <div className="flex gap-2 items-center">
              <div>
                <img
                  className="w-10 h-10 rounded-full bg-[rgb(13_148_136)]"
                  src={profile?.profile_url!}
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
              <div className="md:hidden flex flex-col">
                <div className="black-500 text-sm dark:text-white">
                  Anna Podrez
                </div>
                <div className="text-brand-gray-60 text-xs ">
                  @anna_podrez123
                </div>
              </div>
            </div>
            <div className="md:hidden flex gap-[6px]">
              <button className="dark-input flex justify-center items-center h-[34px] w-[67px] text-[10px] leading-4 font-semibold p-[9px_10px_9px_6px] rounded-[10px] bg-[#F4F5FA] text-[#069D6E]">
                <MoveUp className="h-full" />{" "}
                <span className="dark:text-white">Bullish</span>
              </button>
              <button className="dark-input flex justify-center items-center h-[34px] w-[67px] text-[10px] leading-4 font-semibold p-[9px_10px_9px_6px] rounded-[10px] bg-[#F4F5FA] text-[#EA1717]">
                <MoveDown className="h-full" />{" "}
                <span className="dark:text-white">Bearish</span>
              </button>
            </div>
          </div>
          <div className=" flex-[1_0_0] flex flex-col gap-[10px]">
            <textarea
              placeholder={
                isPost
                  ? "How do you feel about market today? Share your ideas here!"
                  : "Reply to"
              }
              className="w-full border border-brand-gray-30 dark:border-brand-gray-70 dark:bg-brand-blue-90 rounded-2xl p-3 h-28 resize-none max-md:h-auto max-md:text-sm"
              value={postText}
              onChange={handleTextChange}
            ></textarea>
            <div className="max-md:hidden flex gap-4">
              <div className="flex items-center gap-4 flex-[1_0_0] ">
                <div className="flex gap-[6px]">
                  <button
                    className={cn(
                      "dark-input flex justify-center items-center h-[34px] w-[67px] text-[10px] leading-4 font-semibold p-[9px_10px_9px_6px] rounded-[10px] bg-[#F4F5FA] text-[#069D6E]",
                      sentiment === "bullish" && "!border-brand-green-70 "
                    )}
                    onClick={() => handleSetSentiment("bullish")}
                  >
                    <MoveUp className="h-full" />{" "}
                    <span className="dark:text-white">Bullish</span>
                  </button>
                  <button
                    className={cn(
                      "dark-input flex justify-center items-center h-[34px] w-[67px] text-[10px] leading-4 font-semibold p-[9px_10px_9px_6px] rounded-[10px] bg-[#F4F5FA] text-[#EA1717]",
                      sentiment === "bearish" && "!border-brand-red-70"
                    )}
                    onClick={() => handleSetSentiment("bearish")}
                  >
                    <MoveDown className="h-full" />{" "}
                    <span className="dark:text-white">Bearish</span>
                  </button>
                </div>
                <div className="flex gap-4">
                  {isPost && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        id="file-upload"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                      <label
                        htmlFor="file-upload"
                        className="action-button cursor-pointer"
                      >
                        <Image
                          src="/icons/image-icon.svg"
                          width={22}
                          height={22}
                          alt=""
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>
              <Button
                disabled={postText ? false : true}
                onClick={() => {
                  if (isPost) {
                    handlePost()
                  } else {
                    addComment()
                  }
                }}
                className=" w-fit h-fit px-[28px] py-[7px]  rounded-[10px] font-semibold capitalize"
              >
                {isPost ? "Post" : "Comment"}
              </Button>
            </div>
          </div>
        </div>
        {imageFile && (
          <div className="flex items-center justify-between py-2 px-3 border rounded-md mt-4">
            <div className="flex gap-2 items-center">
              <Image
                src={URL.createObjectURL(imageFile)}
                width={40}
                height={40}
                alt=""
                className="rounded-full w-12 h-12 object-cover"
              />
              {postName && (
                <div className="text-sm text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis w-[250px]">
                  {postName}
                </div>
              )}
            </div>
            <div className="cursor-pointer" onClick={handleDeleteImage}>
              <Trash size={18} />
            </div>
          </div>
        )}
        {searchBar && (
          <>
            <hr className="my-6 divider" />
            <div className="w-full relative">
              <i className="absolute flex items-center h-full pl-3">
                <Search size={18} />
              </i>
              <input
                className="py-[10px] pl-10 pr-3 w-full rounded-[10px] dark-input "
                placeholder="Search posts or users…"
              />
            </div>
          </>
        )}
        <hr className="my-6 divider max-md:mb-2" />
      </div>
    </div>
  )
}
