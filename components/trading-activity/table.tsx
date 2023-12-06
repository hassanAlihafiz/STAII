"use client"

import React, { Fragment, useEffect, useState } from "react"
import Image from "next/image"
import Pagination from "@/ui/pagination"

import {
  Table as ShadeTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Table = ({ data }: any) => {
  const [dataPerPage, setDataPerPage] = useState<any[]>([])
  const totalData = data.length

  return (
    <div className="mt-4 -mx-1 md:mx-0">
      <ShadeTable className="w-full table-fixed">
        <TableHeader className="border-b border-brand-gray-10 dark:border-brand-blue-90 max-md:hidden">
          <TableRow className="text-xs text-brand-gray-60 dark:text-brand-gray-40">
            <TableHead className="py-2.5 w-12 md:w-14 text-left">
              Event
            </TableHead>
            <TableHead className="py-2.5 text-left">Asset</TableHead>
            <TableHead className="py-2.5 text-left ">Type</TableHead>
            <TableHead className="py-2.5 text-right">Order Price</TableHead>
            <TableHead className="py-2.5 text-right">Amount</TableHead>
            <TableHead className="py-2.5 text-right">Allocation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative divide-y divide-brand-gray-10 dark:divide-brand-blue-90 before:content-[''] before:h-2 before:block">
          {dataPerPage?.map((item) => (
            <Fragment key={item.id}>
              <TableRow className="td-heading border-b-0">
                <TableCell
                  colSpan={4}
                  scope="colgroup"
                  className="font-medium text-left text-xs text-brand-gray-60 dark:text-brand-gray-40 pt-2.5 pb-3 px-1 "
                >
                  {item.date}
                </TableCell>
              </TableRow>
              {item.trade.map((t: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell
                    className={`${
                      t.event == "buy"
                        ? "text-brand-green-70"
                        : "text-brand-red-70"
                    } h-14 align-top text-sm font-semibold capitalize py-2.5 px-1`}
                  >
                    {t.event}
                  </TableCell>
                  <TableCell className="h-14 align-top py-2.5 px-1">
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
                  </TableCell>
                  <TableCell className="hidden md:block h-14 text-sm font-medium align-top py-2.5 px-1">
                    <p>{t.type}</p>
                  </TableCell>
                  <TableCell className="h-14 text-sm font-medium text-right align-top py-2.5 px-1 ">
                    {t.price}
                  </TableCell>
                  <TableCell className="h-14 text-sm font-medium text-right align-top py-2.5 px-1 ">
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
                  </TableCell>
                  <TableCell className="hidden md:block h-14 text-sm font-medium text-right align-top py-2.5 px-1">
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
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </ShadeTable>

      <div className="text-center py-2.5">
        <button
          type="button"
          className="text-sm font-semibold text-brand-green-70 hover:text-brand-green-80 transition duration-200"
        >
          Show more
        </button>
      </div>
      <div className="max-md:hidden">
        <Pagination
          data={data}
          totalData={totalData}
          setDataPerPage={setDataPerPage}
        />
      </div>
    </div>
  )
}

export default Table
