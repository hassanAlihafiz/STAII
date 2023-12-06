import React, { useRef, useState } from "react"
import Image from "next/image"

import "@/styles/common-page.css"
import CustomRow from "../card/custom-row"

const AccountDocument = () => {
  const [showFile, setShowFile] = useState(null as File | null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const File = event.target.files && event.target.files[0]
    if (!File) return

    setShowFile(File)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }
  return (
    <div className="w-full mt-11">
      <div>
        <h1 className="black-xl-600 dark:text-white">Documents</h1>
      </div>
      <div className="card-box relative dark:dark-card-box">
        <CustomRow
          title="No Documents Uploaded"
          description="We need to prove who you are before you can use account"
        >
          {!showFile && (
            <div>
              <button
                className="w-[180px] bg-brand-green-70 h-[47px] border border-brand-green-40 dark:border-transparent rounded-[10px] font-[550] capitalize text-white"
                onClick={handleButtonClick}
              >
                Upload Document
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}
        </CustomRow>
        {showFile && (
          <div className="flex justify-between items-center bg-white dark:bg-brand-blue-90 mt-4 p-[17px_15px] border border-brand-gray-20 dark:border-brand-gray-80 rounded-[8px]">
            <div className="flex items-center">
              <div className="bg-brand-green-10 dark:bg-brand-green-100  w-[50px] h-[50px] rounded-full flex items-center justify-center">
                <Image
                  src="/icons/document-line-icon.svg"
                  width={19}
                  height={15}
                  alt=""
                />
              </div>
              <div className="ml-[15px]">
                <div>
                  {" "}
                  <p className="truncate w-[120px] sm:w-auto black-600 text-[15px] ellip capitalize dark:text-white">
                    {showFile?.name}
                  </p>{" "}
                </div>
                <div>
                  {" "}
                  <p className="text-brand-gray-60 text-[13px] font-[400] dark:text-brand-gray-30">
                    {" "}
                    {showFile?.size}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/icons/delete-icon.svg"
                alt=""
                className="cursor-pointer"
                onClick={() => {
                  setShowFile(null)
                }}
                width={14}
                height={15}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountDocument
