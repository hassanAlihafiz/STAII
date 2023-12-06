import React, { useState } from "react"
import Image from "next/image"
import { DialogClose } from "@radix-ui/react-dialog"
import * as Dialoge from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import "@/styles/common-page.css"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import CropModal from "../../profile-crop-modal"

interface accountProfileModalProps {
  selectedImage?: any
  setSelectedImage?: any
  setProfileImage: any
  profile: any
  updateUserProfileImage: (file: File) => void
}

const AccountProfileModal: React.FC<accountProfileModalProps> = ({
  selectedImage,
  setSelectedImage,
  setProfileImage,
  updateUserProfileImage,
  profile,
}) => {
  const [openModal, setOpenCrop] = useState(false)
  const [imageError, setImageError] = useState("")
  const [fileObject, setFileObject] = useState<any>()
  const [showCropImage, setShowCropImage] = useState(false)

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

        setSelectedImage(reader?.result as string)
        setOpenCrop(true)
      }
      img.src = reader?.result as string
    }
    reader.readAsDataURL(file)
  }

  const onCloseModal = () => {
    setImageError("")
    setSelectedImage("")
  }

  const onSubmitAfterCrop = () => {
    setProfileImage(selectedImage)
    updateUserProfileImage(fileObject)
    setShowCropImage(false)
  }
  return (
    <Dialog>
      <CropModal
        setSelectedImage={setSelectedImage}
        src={selectedImage}
        setOpen={setOpenCrop}
        open={openModal}
        setShowCropImage={setShowCropImage}
        setFileObject={setFileObject}
      />
      <DialogTrigger asChild>
        <div>
          <div className="flex-center-between black-500 dark:text-white text-base">
            <div>
              <p>Profile Avatar</p>
            </div>
            <div>
              <Button
                variant="ghost"
                className="w-[105px] h-[47px] border border-brand-green-40 rounded-[10px] font-[550] capitalize  "
              >
                Change
              </Button>
            </div>
          </div>
          <div className="my-[20px] bg-brand-gray-20 dark:bg-brand-gray-80 h-[2px] rounded"></div>
        </div>
      </DialogTrigger>
      <DialogContent className="modal-section modal-responsive">
        <DialogHeader>
          <DialogTitle className="relative w-full pb-3 text-left dark:text-white">
            <div className="flex items-center">
              <p className="black-600 dark:text-white text-base">
                Profile Avatar
              </p>
            </div>
            <DialogClose
              onClick={onCloseModal}
              className="absolute -top-3 right-0 mt-2 outline-none"
            >
              <X className="ml-auto w-5 cursor-pointer text-brand-gray-50" />
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="w-full">
            <div className="pt-[10px]">
              <div>
                <div className="flex">
                  <div className="w-[72px] h-[72px] rounded-[50%]">
                    <img
                      src={
                        showCropImage ? selectedImage : profile?.profile_url
                        // ? profile?.profile_url
                        // : "/icons/account-avatar.svg"
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
                  <p className="text-red-600 text-[12px] mt-2">{imageError}</p>
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
              <div className="flex flex-col pt-[10px]">
                <Dialoge.Close asChild>
                  <Button
                    onClick={() => onSubmitAfterCrop()}
                    className="w-full h-[45px] mt-[10px] border border-brand-green-40 dark:border-transparent bg-brand-gray-40 rounded-[10px] font-[550] capitalize mr-[20px]"
                  >
                    Submit
                  </Button>
                </Dialoge.Close>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AccountProfileModal
