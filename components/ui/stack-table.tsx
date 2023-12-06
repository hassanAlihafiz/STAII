"use client"

import React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Trash } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "./button"
import { Checkbox } from "./checkbox"

interface StackTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  checked?: any
  onCheckedChange?: any
}

export function StackTable<TData, TValue>({
  columns,
  data,
  checked,
  onCheckedChange,
}: StackTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Table>
        <TableHeader className="relative ">
          {table?.getHeaderGroups()?.map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="text-xs text-brand-gray-60 dark:text-brand-gray-90 dark:border-brand-blue-90"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="py-3 text-left font-bold text-brand-gray-60"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
          {checked && checked?.length !== 0 && (
            <div className="absolute top-0 left-0 w-full bg-brand-green-70 h-full px-3 flex items-center gap-6 text-white ">
              <Checkbox onCheckedChange={onCheckedChange} />

              <div className="flex items-center text-sm font-semibold gap-2">
                Selected:{" "}
                <div className="flex items-center justify-center bg-white rounded-full h-5 min-w-unit-5 w-auto text-sm  text-brand-green-70 p-1">
                  {checked?.length}
                </div>
              </div>
              <Button
                className="flex items-center text-sm font-semibold gap-2 text-white"
                variant="default"
                size="sm"
              >
                <Trash size={18} strokeWidth={2} />
                Remove selected
              </Button>
            </div>
          )}
        </TableHeader>
        <TableBody>
          {table?.getRowModel()?.rows?.length ? (
            table?.getRowModel()?.rows?.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`dark:border-brand-blue-90 align-middle ${
                  checked?.includes(index + 1)
                    ? "bg-brand-green-10 dark:bg-[#122a23]"
                    : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="max-md:!p-2 black-500 text-sm py-3 text-left dark:!text-white"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
