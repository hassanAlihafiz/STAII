import React from "react"
import Link from "next/link"
import { ArrowLeft, MoveUp } from "lucide-react"

const SinglePortfolio = () => {
  return (
    <main className="max-w-2xl lg:max-w-3xl mx-auto p-5 !pb-20 md:p-8 ">
      <Link
        href="/portfolio/all"
        className="flex items-center gap-1 text-brand-green-70 hover:text-brand-green-80"
      >
        <ArrowLeft size={17} strokeWidth={2.5} />
        <span className="font-semibold">Back</span>
      </Link>

      <div className="py-6">
        <h2 className="text-2xl font-semibold">US stocks</h2>
        <p className="text-brand-gray-60 dark:text-brand-gray-30 font-semibold">
          $41,562.08
        </p>

        <div className="text-sm font-medium my-4">
          <div className="flex items-center space-x-0.5">
            <MoveUp strokeWidth={3} className="w-3 text-brand-green-70" />
            <p>
              <span className="text-brand-green-70">$100,11 (18.7%) </span>{" "}
              <span className="text-brand-gray-50">time-weight return</span>
            </p>
          </div>
          <div className="flex items-center space-x-0.5">
            <MoveUp strokeWidth={3} className="w-3 text-brand-green-70" />
            <p>
              <span className="text-brand-green-70">$100,11 (18.7%) </span>{" "}
              <span className="text-brand-gray-50">time-weight return</span>
            </p>
          </div>
        </div>
        <p className="text-sm text-brand-gray-60 font-medium">
          US stocks refer to the shares of publicly traded companies that are
          listed on stock exchanges in the United States.
        </p>

        <ul className="border-t border-brand-gray-20 space-y-1 py-6 mt-6">
          <li className="flex items-center justify-between">
            <p className="font-semibold">VTI</p>
            <p>$41,562.08</p>
          </li>
          <li className="text-sm font-medium text-brand-gray-60 space-y-1">
            <p>Vanguard Total Stock Market ETF</p>
            <p>28 shares</p>
            <p>$36,111.01 basis cost</p>
          </li>
        </ul>
      </div>
    </main>
  )
}

export default SinglePortfolio
