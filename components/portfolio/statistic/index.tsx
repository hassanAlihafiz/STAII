import React from "react"
import Image from "next/image"
import { AlertCircle, MoveUp } from "lucide-react"

const Statistics = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Statistics</h3>
      <div className="grid md:grid-cols-2 gap-2 mt-4">
        <div className="grid md:grid-cols-2 gap-2">
          <div className="bg-brand-gray-5 dark:bg-brand-blue-120 flex md:flex-col justify-between rounded-lg dark:ring-1 dark:ring-brand-blue-90 p-4">
            <div>
              <div className="flex items-center space-x-1.5">
                <h5 className="text-sm text-brand-gray-70 dark:text-white font-semibold">
                  ROI
                </h5>
                <AlertCircle size={16} className="text-brand-green-70" />
              </div>
              <p className="text-xs text-brand-gray-50 dark:text-brand-gray-30 mt-0.5">
                Return on investment
              </p>
            </div>
            <p className="font-semibold text-brand-green-70 md:mt-auto">
              +10.10%
            </p>
          </div>
          <div className="bg-brand-gray-5 dark:bg-brand-blue-120 flex md:flex-col justify-between rounded-lg dark:ring-1 dark:ring-brand-blue-90 p-4">
            <div>
              <div className="flex items-center space-x-1.5">
                <h5 className="text-sm text-brand-gray-70 dark:text-white font-semibold">
                  Annualized Return
                </h5>
                <AlertCircle size={16} className="text-brand-green-70" />
              </div>
            </div>
            <p className="font-semibold text-brand-green-70 md:mt-auto">
              +10.10%
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-brand-gray-5 dark:bg-brand-blue-120 flex flex-col rounded-lg dark:ring-1 dark:ring-brand-blue-90 p-4">
            <div className="flex items-center space-x-2">
              <div className="relative w-9 h-9 bg-white shrink-0 border border-brand-gray-20 rounded-full overflow-hidden p-1.5">
                <Image
                  src="/images/stocks/HST.svg"
                  alt="HST"
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <h5 className="text-sm font-semibold">HST</h5>
                <p className="text-xs text-brand-gray-50 dark:text-brand-gray-30">
                  US stocks
                </p>
              </div>
            </div>
            <p className="text-xs font-bold text-brand-gray-70 dark:text-white mt-3">
              Best performance
            </p>
            <div className="mt-2.5">
              <p className="text-brand-green-70 font-semibold">+$130.58</p>
              <p className="flex items-center text-xs font-semibold text-brand-gray-50 dark:text-brand-gray-30 space-x-0.5">
                <MoveUp strokeWidth={4} className="w-2.5" />
                <span>3.08%</span>
              </p>
            </div>
          </div>
          <div className="bg-brand-gray-5 dark:bg-brand-blue-120 flex flex-col rounded-lg dark:ring-1 dark:ring-brand-blue-90 p-4">
            <div className="flex items-center space-x-2">
              <div className="relative w-9 h-9 bg-white shrink-0 border border-brand-gray-20 rounded-full overflow-hidden p-1.5">
                <Image
                  src="/images/stocks/TGT.svg"
                  alt="TGT"
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <h5 className="text-sm font-semibold">HST</h5>
                <p className="text-xs text-brand-gray-50 dark:text-brand-gray-30">
                  US stocks
                </p>
              </div>
            </div>
            <p className="text-xs font-bold text-brand-gray-70 dark:text-white mt-3">
              Worst performance
            </p>
            <div className="mt-2.5">
              <p className="text-brand-red-70 font-semibold">-$58.03</p>
              <p className="flex items-center text-xs font-semibold text-brand-gray-50 dark:text-brand-gray-30 space-x-0.5">
                <MoveUp strokeWidth={4} className="w-2.5 rotate-180" />
                <span>3.08%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
