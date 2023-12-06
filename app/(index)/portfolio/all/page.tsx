"use client"

import { useState } from "react"
import Link from "next/link"
import Button from "@/ui/portfolio-button"
import { portfolios } from "@/utils/portifolio"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowLeft, Search, X } from "lucide-react"

import MonthlyTransferAmount from "@/components/modal/portfolio/monthly-transfer-amount"

const PortfolioView = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <main className="max-w-2xl lg:max-w-3xl mx-auto p-5 !pb-20 md:p-8 ">
        <Link
          href="/portfolio"
          className="flex items-center gap-1 text-brand-green-70 hover:text-brand-green-80"
        >
          <ArrowLeft size={17} strokeWidth={2.5} />
          <span className="font-semibold">Back</span>
        </Link>

        <div className="flex items-center justify-between gap-3 my-6">
          <div>
            <h2 className="text-2xl font-semibold">View Portfolio</h2>
            <p className="text-sm text-brand-gray-60 dark:text-brand-gray-30 mt-1">
              This is all types of assets that you hold
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button onClick={() => setOpen(true)}>Add investment</Button>
            <button
              type="button"
              className="bg-brand-gray-40 hover:bg-brand-gray-20 rounded-xl text-sm xl:text-base font-semibold px-5 py-2.5 xl:py-3.5 text-white hover:text-brand-gray-50 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="flex lg:hidden items-center rounded-full overflow-hidden">
          {portfolios.map((item, idx) => (
            <div
              key={idx}
              className="h-3 shrink-0"
              style={{
                width: `${item.current}`,
                backgroundColor: item.color,
              }}
            ></div>
          ))}
        </div>
        <ul className="space-y-7 py-6 lg:py-13">
          {portfolios.map((item, idx) => (
            <li key={idx}>
              <Link
                href="/portfolio/all/3"
                className="flex w-full items-center justify-between"
              >
                <div className="mr-auto flex items-start gap-2">
                  <span
                    className="block w-2 h-2 shrink-0 mt-2 rounded-full"
                    style={{ background: item.color }}
                  ></span>

                  <div className="flex flex-col">
                    <h4 className="font-semibold ">{item.name}</h4>
                    <p className="text-sm text-brand-gray-50 dark:text-brand-gray-30">
                      {item.text}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold ">{item.current}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="md:hidden space-y-5 mt-8">
          <Button full onClick={() => setOpen(true)}>
            Add investment
          </Button>
          <button
            type="button"
            className="w-full md:w-auto bg-brand-gray-40 hover:bg-brand-gray-20 rounded-xl text-sm xl:text-base font-semibold px-5 py-2.5 xl:py-3.5 text-white hover:text-brand-gray-50 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </main>

      <InvestmentModal {...{ open, setOpen }} />
    </>
  )
}

const InvestmentModal = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: any
}) => {
  const [transferOpen, setTransferOpen] = useState(false)
  const handle = () => {
    setOpen(false)
    setTransferOpen(true)
  }
  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay bg-black/50 fixed inset-0 z-40 " />
          <Dialog.Content className="DialogContent max-w-[600px] w-full z-50 !h-auto max-md:bottom-[30px] max-md:!h-full top-[314px]">
            <Dialog.Close className="hover:bg-brand-gray-10 dark:hover:bg-brand-blue-90 absolute top-0 right-0 focus:outline-none z-50 m-6">
              <X size={20} className="text-brand-gray-50" />
            </Dialog.Close>
            <div className="bg-white rounded-2xl overflow-hidden dark:bg-brand-blue-120 max-md:h-screen max-md:rounded-none">
              <form className="relative  overflow-hidden p-6">
                <div className="bg-white sticky top-0  pb-4 dark:bg-brand-blue-120">
                  <h4 className="font-semibold">Add investment</h4>
                  <div className="relative mt-7">
                    <input
                      type="text"
                      className="w-full h-10 border border-brand-gray-30 rounded-xl focus:outline-none pr-5 pl-10 dark:bg-brand-blue-90"
                      placeholder="Search"
                    />
                    <Search
                      size={18}
                      className="absolute top-1/2 -translate-y-1/2 left-3 "
                    />
                  </div>
                </div>
                <ul className="h-[22rem] flex flex-col overflow-y-auto max-md:h-[35rem]">
                  {Array.from(Array(12).keys()).map((idx) => (
                    <li
                      className="hover:bg-brand-gray-5 py-4 dark:hover:bg-brand-blue-90"
                      onClick={handle}
                    >
                      <h4 className="text-sm font-semibold text-brand-gray-80 dark:text-white">
                        Investment {idx + 1}
                      </h4>
                      <p className="text-xs font-medium text-brand-gray-50 mt-1 dark:text-brand-gray-30">
                        Long text about the investments here now
                      </p>
                    </li>
                  ))}
                </ul>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <MonthlyTransferAmount open={transferOpen} setOpen={setTransferOpen} />
    </>
  )
}

export default PortfolioView
