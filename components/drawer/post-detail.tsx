"use client"

import React, { useEffect, useState } from "react"
import { ArrowLeftCircle, MapPin, X } from "lucide-react"

import "@/styles/common-page.css"
import { useAppSelector } from "@/store"
import { callGetApiWithAuth } from "@/utils/api"
import { CommentData, DrawerCardData, RepostData } from "@/utils/specific-asset"
import { ChevronDown, MessagesSquare } from "lucide-react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SubCommentCard from "@/components/common/sub-comment-card"

import AddPost from "../community/add-post"
import CommunityPostCard from "../community/post-card"
import { Input } from "../ui/input"
import { toast } from "../ui/use-toast"

interface PostDetailDrawerProps {
  id: string
  isOpen: boolean
  onClose: () => void
}
const PostDetailDrawer: React.FC<PostDetailDrawerProps> = ({
  id,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [data, setData] = useState<any>([])
  const [comments, setComments] = useState([])
  const profile = useAppSelector((state) => state.user.profile)
  const token = useAppSelector((state) => state.user.token)
  const getPostDetailsById = () => {
    callGetApiWithAuth(
      "lemmy",
      `post?id=${id}`,

      (e) => {
        setData(e?.post_view)
      },
      token,
      ({ message: err, status }) => {
        toast({
          variant: "destructive",
          title: "Unable to get post details",
          description: err,
        })
      }
    )
  }

  const getCommentsByPostId = () => {
    callGetApiWithAuth(
      "lemmy",
      `/comment/list?post_id=${id}&limit=50`,

      (e) => {
        setComments(e?.comments)
      },
      token,
      ({ message: err, status }) => {
        toast({
          variant: "destructive",
          title: "Unable to get post comments",
          description: err,
        })
      }
    )
  }

  const getPostsAndCommentsById = () => {
    getPostDetailsById()
    getCommentsByPostId()
  }
  useEffect(() => {
    if (isOpen && id) {
      getPostsAndCommentsById()
    }
  }, [isOpen, id, profile])

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {/* <SheetTrigger asChild>
        <div className="flex justify-end relative cursor-pointer">
          <MessagesSquare size={18} />
        </div>
      </SheetTrigger> */}
      <SheetContent className="drawer-section drawer-responsive sm:w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="absolute top-0 w-full pt-4 text-left bg-white dark:bg-brand-blue-120">
            <div className="hidden  max-md:flex max-md:items-center max-md:justify-between px-5">
              <div className="flex">
                <SheetClose className="">
                  <ArrowLeftCircle
                    color="#9CA5AF"
                    strokeWidth={"0.5px"}
                    size={"35px"}
                    className="dark:fill-[#4B5563]"
                  />
                </SheetClose>
              </div>
              <div className="w-full text-center text-base text-brand-gray-100 dark:text-white">
                Post Detail
              </div>
            </div>
            <div className="max-md:hidden">
              <div className="pl-6 text-base text-brand-gray-100 dark:text-white">
                Post Detail
              </div>
              <SheetClose
                className="absolute top-2 right-0 mr-5 mt-2 outline-none"
                onClick={onClose}
              >
                <X className="ml-auto w-5 mt-[2px] cursor-pointer text-brand-gray-50" />
              </SheetClose>
            </div>

            <div className="bg-brand-gray-20 dark:bg-brand-gray-80 h-[1px] w-full mt-[22px] max-md:hidden"></div>
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="flex flex-col justify-between w-full  overflow-auto h-[calc(100%-85px)] ">
          <div className="text-brand-gray-100 dark:text-white p-[2px_20px_0px_23px] mt-13">
            <div>
              <CommunityPostCard data={data} getPost={getPostDetailsById} />
            </div>
            <div className="mt-5">
              <AddPost
                isPost={false}
                post_id={Number(id)}
                getComments={getPostsAndCommentsById}
              />
            </div>
            <div className="flex justify-between border-b border-b-[#EDEEF3] dark:border-b-[#2D374E] max-md:flex-col max-md:border-b-0">
              <div className="flex justify-between items-center max-md:border-b max-md:border-b-[#EDEEF3] dark:border-b-[#2D374E]">
                <ul className="flex items-center w-full">
                  <li
                    className={`relative mr-6 grid h-full place-items-center cursor-pointer`}
                  >
                    <span className="font-medium pb-5 capitalize text-[#2A3033] dark:text-white max-md:pb-2">
                      {`Comments ${data?.counts?.comments}`}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="text-brand-green-70 text-sm font-medium flex cursor-pointer mt-1 max-md:mt-5">
                Most Relevant
                <ChevronDown
                  size={20}
                  color="#069D6E"
                  strokeWidth={2}
                  className="ml-2"
                />
              </div>
            </div>
            <div className="mt-4">
              {/* Render the content of the active tab */}
              {activeTab === 0 && (
                <div>
                  {comments?.map((data, index) => (
                    <SubCommentCard
                      data={data}
                      key={index}
                      getComments={getCommentsByPostId}
                    />
                  ))}
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  {RepostData?.map((data, index) => (
                    <SubCommentCard followButton data={data} key={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </SheetDescription>
        <div className="flex  justify-center items-center pt-4  border-t-[1px] border-brand-gray-20 dark:border-brand-gray-80">
          <p className="max-md:hidden">You reached end of the list</p>
          <div className="md:hidden relative w-full px-5 ">
            <Input
              type="text"
              className="w-full h-10 border border-brand-gray-70 rounded-xl focus:outline-none pr-5 pl-10 bg-transparent"
              placeholder="Reply to @Optimisium"
            />
            <MapPin
              size={20}
              className="absolute top-1/2 -translate-y-1/2 left-8"
              stroke="#9CA5AF"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default PostDetailDrawer
