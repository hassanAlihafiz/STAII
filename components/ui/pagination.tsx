import React, { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PaginationProps {
  data: any[]
  totalData: number
  setDataPerPage: any
}

const Pagination: React.FC<PaginationProps> = ({
  data,
  totalData,
  setDataPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [totalPages, setTotalPages] = useState<number>(0)

  const rowOptions = [
    { id: 1, label: "10", value: "10" },
    { id: 2, label: "20", value: "20" },
    { id: 3, label: "30", value: "30" },
    { id: 4, label: "40", value: "40" },
  ]

  // Calculate the number of pages
  const calculateTotalPages = () => {
    setTotalPages(Math.ceil(totalData / itemsPerPage))
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalData)

  useEffect(() => {
    calculateTotalPages()
    const slicedData = data?.slice(startIndex, endIndex)
    setDataPerPage(slicedData)
  }, [data, totalPages, currentPage, itemsPerPage])

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      window.scrollTo(0, 0)
    }
  }

  const maxPageButtons = 5

  const totalPagesList = Math.ceil(data.length / itemsPerPage)

  const startIndexList = (currentPage - 1) * itemsPerPage
  const endIndexList = startIndexList + itemsPerPage
  const currentItemsList = data.slice(startIndexList, endIndexList)

  const handleNextPageList = () => {
    handlePageChange(currentPage + 1)
  }

  const handlePrevPageList = () => {
    handlePageChange(currentPage - 1)
  }

  let startPageList = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
  let endPageList = startPageList + maxPageButtons - 1
  if (endPageList > totalPagesList) {
    endPageList = totalPagesList
    startPageList = Math.max(1, endPageList - maxPageButtons + 1)
  }

  return (
    <div className="flex items-center justify-between  pt-5 ">
      {totalPagesList > 1 && (
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={handlePrevPageList}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPageList}
            disabled={currentPage === totalPagesList}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      <div className="hidden sm:flex sm:flex-1 items-center justify-between">
        <div className="w-64">
          <p className="text-sm text-brand-gray-60 font-normal">
            Showing <span className="font-medium">{startIndexList + 1} </span>-
            <span className="font-medium">{endIndexList} </span>
            out of <span className="font-medium">{totalData} </span>
          </p>
        </div>

        <div className="w-full flex justify-center">
          <nav
            className="isolate inline-flex -space-x-px rounded-md"
            aria-label="Pagination"
          >
            <button
              onClick={handlePrevPageList}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400  ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <ul className="flex justify-center space-x-2 w-[auto] truncate">
              {startPageList > 1 && (
                <button
                  onClick={() => handlePageChange(1)}
                  className={`px-3 rounded-md ${
                    1 === currentPage
                      ? "bg-brand-green-70 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  1
                </button>
              )}

              {startPageList > 2 && <span>...</span>}
              {Array.from(
                { length: endPageList - startPageList + 1 },
                (_, i) => {
                  const pageNumber = startPageList + i
                  console.log(pageNumber, "sssssss", totalPages, totalPagesList)
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 rounded-md  ${
                        currentPage === pageNumber
                          ? "bg-brand-green-70 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                }
              )}

              {endPageList < totalPagesList - 1 && <span>...</span>}
              {endPageList < totalPagesList && (
                <button
                  onClick={() => handlePageChange(totalPagesList)}
                  className={`px-3 rounded-md  ${
                    totalPagesList === currentPage
                      ? "bg-brand-green-70 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {totalPagesList}
                </button>
              )}
            </ul>

            <button
              onClick={handleNextPageList}
              disabled={currentPage === totalPagesList}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 11.04-1.08l4.5 4.25a.75.75 0 010-1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div>
          <h3 className="text-sm text-brand-gray-60 font-normal">Show Rows </h3>
        </div>

        <div>
          <Select
            onValueChange={(e: any) => {
              setItemsPerPage(Number(e))
              setCurrentPage(1)
            }}
            defaultValue={itemsPerPage.toString()}
          >
            <SelectTrigger className="w-24 h-10 !rounded-xl cursor-pointer">
              <SelectValue placeholder="Show Rows" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {rowOptions.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default Pagination
