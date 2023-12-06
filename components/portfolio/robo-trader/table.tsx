import React, { Fragment } from "react"
import Image from "next/image"
import { roboTrader } from "@/utils/portifolio"

const Table = () => {
  return (
    <div className="mt-4 -mx-1 md:mx-0">
      <table className="w-full table-fixed">
        <thead className="border-b border-brand-gray-10 dark:border-brand-blue-90">
          <tr className="text-xs text-brand-gray-60 dark:text-brand-gray-40">
            <th className="py-2.5 w-12 md:w-14 text-left">Event</th>
            <th className="py-2.5 text-left">Asset</th>
            <th className="hidden md:block py-2.5 text-left">Type</th>
            <th className="py-2.5 text-right">Order Price</th>
            <th className="py-2.5 text-right">Amount</th>
            <th className="hidden md:block py-2.5 text-right">Allocation</th>
          </tr>
        </thead>
        <tbody className="relative divide-y divide-brand-gray-10 dark:divide-brand-blue-90 before:content-[''] before:h-2 before:block">
          {roboTrader.map((item) => (
            <Fragment key={item.id}>
              <tr className="td-heading">
                <td
                  colSpan={4}
                  scope="colgroup"
                  className="font-medium text-left text-xs text-brand-gray-60 dark:text-brand-gray-40 pt-2.5 pb-3 px-1 "
                >
                  {item.date}
                </td>
              </tr>
              {item.trade.map((t, idx) => (
                <tr key={idx}>
                  <td
                    className={`${
                      t.event == "buy"
                        ? "text-brand-green-70"
                        : "text-brand-red-70"
                    } h-14 align-top text-sm font-semibold capitalize py-2.5 px-1`}
                  >
                    {t.event}
                  </td>
                  <td className="h-14 align-top py-2.5 px-1">
                    <div className="flex items-start md:items-center space-x-2">
                      <div className="relative w-6 h-6 bg-white shrink-0 border border-brand-gray-20 rounded-full overflow-hidden p-1">
                        <Image src={t.img} alt="TGT" width={24} height={24} />
                      </div>
                      <div className="relative">
                        <h5 className="text-sm font-medium">{t.asset}</h5>
                        <p className="line-clamp-1 text-smx text-brand-gray-60 dark:text-brand-gray-30  md:hidden">
                          <span className="whitespace-nowrap">US stocks</span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:block h-14 text-sm font-medium align-top py-2.5 px-1">
                    <p>{t.type}</p>
                  </td>
                  <td className="h-14 text-sm font-medium text-right align-top py-2.5 px-1 ">
                    {t.price}
                  </td>
                  <td className="h-14 text-sm font-medium text-right align-top py-2.5 px-1 ">
                    <p>{t.amount}</p>
                    <p className="md:hidden">
                      {t.allocation === "" ? (
                        <svg
                          className="ml-auto mt-1.5"
                          width={10}
                          height={2}
                          viewBox="0 0 10 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.87122 0.67V1.918H0.121219V0.67H9.87122Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        <span className="text-xs text-brand-gray-60 dark:text-brand-gray-30">
                          {t.allocation}
                        </span>
                      )}
                    </p>
                  </td>
                  <td className="hidden md:block h-14 text-sm font-medium text-right align-top py-2.5 px-1">
                    {t.allocation === "" ? (
                      <svg
                        className="ml-auto mt-1.5"
                        width={10}
                        height={2}
                        viewBox="0 0 10 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.87122 0.67V1.918H0.121219V0.67H9.87122Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      t.allocation
                    )}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>

      <div className="text-center py-2.5">
        <button
          type="button"
          className="text-sm font-semibold text-brand-green-70 hover:text-brand-green-80 transition duration-200"
        >
          Show more
        </button>
      </div>
    </div>
  )
}

export default Table
