"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { portfolios } from "@/utils/portifolio"
import { ChevronRight, MoveUp } from "lucide-react"
import moment from "moment"

import BasicAreaChart from "@/components/ui/basic-area-chart"
import ChartTimeFrame from "@/components/chart/TimeFrame"
import RoboFunds from "@/components/portfolio/robo-funds"
import RoboTrader from "@/components/portfolio/robo-trader"
import Statistics from "@/components/portfolio/statistic"

interface Props {
  list: {
    name: string
    current: string
    value: string
    change: string
    status: boolean
    color: string
  }[]
}

const Portfolio = () => {
  const [data, setData] = useState([])
  const [activeTimeFrame, setActiveTimeFrame] = useState("1Day")

  useEffect(() => {
    asyncFetch()
  }, [])

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => {
        const data = json.map((entry: any) => {
          return {
            ...entry,
            t: moment(entry.Date).format("YYYY-MM-DD HH:mm:ss"),
            h: entry?.scales,
          }
        })
        setData(data)
      })
      .catch((error) => {
        console.log("fetch data failed", error)
      })
  }

  return (
    <main className="mx-auto max-w-7xl px-5 pt-10 xl:p-8 !pb-16">
      <h1 className="page-h1">Portfolio</h1>
      <div className="lg:flex items-start gap-6 xl:gap-11 mt-5 md:mt-7">
        {/* left */}
        <div className="flex-1">
          {/* Chart header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="md:hidden text-smx font-medium text-brand-gray-50 ">
                Current balance
              </p>
              <h2 className="text-h1 lg:text-2xl/9 font-semibold">
                $96,656.32
              </h2>

              <div className="md:flex items-center font-medium text-sm text-brand-gray-50 dark:text-brand-gray-30 gap-x-3 gap-y-1 mt-2 md:mt-1">
                <div className="flex items-center space-x-0.5">
                  <MoveUp strokeWidth={3} className="w-3 text-brand-green-70" />
                  <p>
                    <span className="text-brand-green-70">$100.11 (1.7%)</span>{" "}
                    <span>last month</span>
                  </p>
                </div>
                <div className="flex items-center space-x-0.5">
                  <MoveUp strokeWidth={3} className="w-3" />
                  <p>
                    <span>$1.02 (0.11%)</span> <span>today</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button className="rounded-xl text-sm xl:text-base font-semibold ring-1 ring-brand-green-40 bg-brand-green-20 px-5 py-2.5 xl:py-3.5 text-brand-green-70 hover:ring-brand-green-70 transition duration-200">
                Withdraw
              </button>
              <button className="rounded-xl text-sm xl:text-base font-semibold ring-1 ring-brand-green-40 bg-brand-green-20 px-5 py-2.5 xl:py-3.5 text-brand-green-70 hover:ring-brand-green-70 transition duration-200">
                Deposit
              </button>
            </div>
          </div>
          <div className="mt-3 lg:mt-6">
            <div className="h-48 xl:h-[314px] rounded-md">
              <BasicAreaChart data={data} />
            </div>
            <ChartTimeFrame
              activeTime={activeTimeFrame}
              setActiveTime={setActiveTimeFrame}
            />
            <div className="flex items-center justify-between space-x-3">
              <p className="text-sm text-brand-gray-50 dark:text-brand-gray-30 tracking-wide">
                Withdraw/Buying Power
              </p>
              <span className="h-px flex-1 bg-brand-gray-10 dark:bg-brand-blue-90 mt-2.5"></span>

              <button
                type="button"
                className="inline-flex items-center text-sm font-medium"
              >
                <span>$100.11</span>
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>
          </div>

          <PortfoliosSidebar className="lg:hidden" />

          <div className="space-y-10 mt-6 xl:mt-10">
            {/* Statistics */}
            <Statistics />

            {/* RoboTrader   */}
            <RoboTrader />

            {/* RoboFunds */}
            <RoboFunds />
          </div>
        </div>
        {/* right */}
        <div className="hidden lg:block max-w-xs xl:max-w-sidebar w-full sticky top-6">
          <PortfoliosSidebar />
        </div>
      </div>
    </main>
  )
}

const PortfoliosSidebar = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`bg-white dark:bg-brand-blue-120 rounded-xl lg:shadow-base dark:ring-1 dark:ring-brand-blue-90 py-6 xl:min-w-[375px] lg:px-6 ${className}`}
    >
      <div className="flex items-center rounded-full overflow-hidden">
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
      <ul className="mt-6 space-y-6">
        {portfolios.map((item, idx) => (
          <li key={idx}>
            <Link href="#" className="flex w-full items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold dark:text-white">{item.name}</h4>
                <div className="flex items-center leading-4 gap-2 mt-1">
                  <p className="w-20 shrink-0 text-smx font-medium text-brand-gray-60 dark:text-brand-gray-30">
                    {item.current} current
                  </p>
                  <div className="relative w-full ">
                    <div
                      className="h-1 rounded-full overflow-hidden"
                      style={{
                        width: item.current,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-medium dark:text-white">{item.value}</p>
                <p className="flex items-center text-sm font-semibold  text-brand-green-70">
                  <MoveUp strokeWidth={3} className="w-3" />{" "}
                  <span>{item.change}</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/portfolio/all"
        className="block text-center rounded-xl font-semibold ring-1 ring-brand-green-40 bg-brand-green-20 px-5 py-3.5 text-brand-green-70 hover:ring-brand-green-70 transition duration-200 mt-6"
      >
        View Portfolio
      </Link>
    </div>
  )
}

export default Portfolio
