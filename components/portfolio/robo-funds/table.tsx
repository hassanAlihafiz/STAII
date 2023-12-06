import React, { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"
import { roboFunds } from "@/utils/portifolio"
import { MoveUp } from "lucide-react"

const Table = () => {
  return (
    <div className="mt-4 -mx-1 md:mx-0">
      <table className="w-full table-fixed">
        <thead className=" border-b border-brand-gray-10 dark:border-brand-blue-90">
          <tr className="text-brand-gray-60 dark:text-brand-gray-40 text-xs text-left">
            <th className="font-medium px-1 py-2.5">Name</th>
            <th className="font-medium px-1 py-2.5">Portfolio Allocation</th>
            <th className="w-7 font-medium px-1 py-2.5"></th>
          </tr>
        </thead>
        <tbody className="relative divide-y divide-brand-gray-10 dark:divide-brand-blue-90 before:content-[''] before:h-2 before:block">
          {roboFunds.map((item, idx) => (
            <Fragment key={idx}>
              <tr className="hover:bg-brand-gray-5/75">
                <td className="h-14 align-top py-2 px-1">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 shrink-0 border border-brand-gray-20 rounded-full">
                      <Image width={24} height={24} src={item.img} alt="" />
                    </div>
                    <div>
                      <h4 className="text-smx md:text-sm font-semibold">
                        Growth Financial
                      </h4>
                      <p className="flex items-center text-xs space-x-px md:space-x-0.5">
                        <MoveUp
                          strokeWidth={3}
                          className="w-2.5 text-brand-green-70"
                        />
                        <span className="font-semibold text-brand-green-70">
                          32.7%
                        </span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="h-14 text-sm font-medium py-2 px-1">
                  <p className="block">{item.allocation}</p>
                  <p className="text-xs font-normal text-brand-gray-60 dark:text-brand-gray-40">
                    {item.price}
                  </p>
                </td>
                <td className="h-14 text-sm font-medium text-right text-gray-500 py-2 px-1">
                  <Link href={item.link}>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.26101 14.8572L12.5244 10.4076C12.6501 10.2585 12.7013 10.1188 12.7013 10.0001C12.7013 9.88134 12.6497 9.72138 12.5456 9.61381L8.26101 5.14322C8.04913 4.91979 7.67425 4.91252 7.47168 5.12646C7.24757 5.33893 7.24028 5.69413 7.45494 5.91603L11.3695 10.0001L7.45771 14.0842C7.24305 14.3054 7.25034 14.6611 7.47444 14.8737C7.67425 15.0877 8.04913 15.0807 8.26101 14.8572Z"
                        fill="#9CA5AF"
                      />
                    </svg>
                  </Link>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
