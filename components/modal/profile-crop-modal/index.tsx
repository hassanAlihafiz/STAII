"use client"

import React, { useRef, useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"
import * as Dialoge from "@radix-ui/react-dialog"
import { X, ZoomInIcon, ZoomOutIcon } from "lucide-react"
import AvatarEditor from "react-avatar-editor"

import "@/styles/common-page.css"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CropsProps {
  src?: any
  setSelectedImage?: any
  setOpen?: any
  open?: any
  setShowCropImage?: any
  setFileObject?: any
}
const CropModal: React.FC<CropsProps> = ({
  src,
  setSelectedImage,
  setShowCropImage,
  setOpen,
  open,
  setFileObject,
}) => {
  const [slideValue, setSlideValue] = useState(20)
  const cropRef = useRef<any>(null)

  const handleZoomChange = (newZoom: number) => {
    if (newZoom >= 10 && newZoom <= 100) {
      setSlideValue(newZoom)
    }
  }

  const handleZoomIn = () => {
    handleZoomChange(slideValue + 10)
  }

  const handleZoomOut = () => {
    handleZoomChange(slideValue - 10)
  }

  const handleSave = async () => {
    if (cropRef) {
      setOpen(false)
      const dataUrl = cropRef?.current.getImage().toDataURL()
      const result = await fetch(dataUrl)
      const blob = await result.blob()
      setSelectedImage(URL.createObjectURL(blob))
      const file = new File([blob], "cropped-image.png", { type: blob.type })
      setFileObject(file)
      setShowCropImage(true)
    }
  }
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent className="py-5 !rounded-[15px] !h-[auto] sm:w-[350px] sm:max-w-[380px] profile-crop-responsive">
        <DialogHeader>
          <DialogTitle className="relative w-full pb-6 text-left dark:text-white">
            <div className="flex items-center">
              <p className="text-brand-gray-100 dark:text-white text-[16px] font-[600]">
                Crop Image
              </p>
            </div>
            <DialogClose className="absolute -top-3 right-0 mt-2 outline-none">
              <X className="ml-auto w-5 cursor-pointer text-[#9CA5AF]" />
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="w-full">
            <div className="flex flex-col justify-center items-center">
              <div>
                <AvatarEditor
                  ref={cropRef}
                  image={src}
                  borderRadius={150}
                  color={[0, 0, 0, 0.42]}
                  scale={slideValue / 10}
                  rotate={0}
                  width={250}
                  height={250}
                  className="rounded-[10px]"
                />
              </div>
              <div className="w-full flex flex-col">
                <div className="flex justify-center items-center gap-2 mt-[20px] px-11">
                  <div
                    onClick={handleZoomOut}
                    className="flex items-center cursor-pointer"
                  >
                    <ZoomOutIcon
                      size={15}
                      className="fill-white stroke-brand-green-70 dark:fill-brand-blue-120 dark:stroke-white"
                    />
                  </div>
                  <input
                    id="default-range"
                    type="range"
                    value={slideValue}
                    min={10}
                    max={100}
                    onChange={(e) => {
                      handleZoomChange(parseFloat(e.target.value))
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div
                    onClick={handleZoomIn}
                    className="flex items-center cursor-pointer"
                  >
                    <ZoomInIcon
                      size={15}
                      className="fill-white stroke-brand-green-70 dark:fill-brand-blue-120 dark:stroke-white"
                    />
                  </div>
                </div>
                <div className="flex flex-col pt-[10px] ">
                  <Dialoge.Close asChild>
                    <Button
                      onClick={handleSave}
                      variant="default"
                      className="w-full h-[45px] mt-[10px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize mr-[20px]"
                    >
                      Crop
                    </Button>
                  </Dialoge.Close>
                  <Dialoge.Close asChild>
                    <Button
                      onClick={() => setOpen(false)}
                      variant="ghost"
                      className="w-full h-[45px] mt-[10px] border border-brand-green-40 rounded-[10px] font-[550] capitalize mr-[20px]"
                    >
                      Cancel
                    </Button>
                  </Dialoge.Close>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CropModal
