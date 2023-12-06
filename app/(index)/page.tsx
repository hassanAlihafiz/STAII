"use client"

import { useEffect, useState } from "react"
import { getAccountActivities } from "@/async-functions/alpaca/account"
import { useAppSelector } from "@/store"
import { watchlist, yourTopPerformers } from "@/utils/home"
import { sliderNews } from "@/utils/news"
import { roboPlans } from "@/utils/robo"
import { sliderStocks } from "@/utils/stocks"
import moment from "moment"

import polygon from "@/lib/polygon"
import ChartComponent from "@/components/chart"
import MultiCardSlider from "@/components/features/multicard-slider"
import { UserProfile } from "@/components/header/auth-header/profile-dropdown"
import NewsSection from "@/components/home/news"
import RoboFundsCard, {
  roboFundsCardRespnosiveness,
} from "@/components/home/robo-funds/robo-funds-card"
import RoboTraderMonthlyInsightAlert from "@/components/home/robo-trader/monthly-insight-alert"
import SocialFeeds from "@/components/home/social-feeds"
import NewsCard, {
  newsCardRespnosiveness,
} from "@/components/news/news-slider-card"
import PerformerList from "@/components/portfolio/performers/performers-list"
import PortfolioHeader from "@/components/portfolio/portfolio-header"
import StockSliderCard, {
  stockSliderCardRespnosiveness,
} from "@/components/stock/stock-cards/slider-card"
import Watchlist from "@/components/watchlist/watchlist"

export default function IndexPage() {
  const [totalAmount, setTotalAmount] = useState(0)
  const token = useAppSelector((state) => state?.user?.token)
  const [data, setData] = useState([
    {
      date: "2023-11-13",
      net_amount: 200,
    },
    {
      date: "2023-11-13",
      net_amount: 250,
    },
    {
      date: "2023-11-13",
      net_amount: 400,
    },
    {
      date: "2023-11-13",
      net_amount: 300,
    },
  ])
  const currentDate = moment()
  const currentMonthDate = currentDate.startOf("month").format("YYYY-MM-DD")

  const numberWithCommasAndDecimals = (number: number) => {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const getAccountActivityToday = () => {
    const currentDate = moment()
    const yesterdayDate = currentDate.subtract(1, "days").format("YYYY-MM-DD")
    console.log(yesterdayDate, "ssssssssssssssssssssssssss")
    getAccountActivities(token!, `&date=${yesterdayDate}`)
      .then((e: any) => {
        setData(e)
        let totalNetAmount = 0
        e?.forEach((item: any) => {
          const netAmount = parseFloat(item.net_amount)
          totalNetAmount += netAmount
        })
        setTotalAmount(totalNetAmount)
      })
      .catch((e) => {
        console.log("e")
      })
  }

  const getAccountActivityLastMonth = () => {
    const lastDayOfLastMonth = currentDate
      .clone()
      .subtract(1, "month")
      .endOf("month")
      .format("YYYY-MM-DD")
    getAccountActivities(token!, `&until=${lastDayOfLastMonth}`)
      .then((e: any) => {
        let totalNetAmount = 0
        e?.forEach((item: any) => {
          const netAmount = parseFloat(item.net_amount)
          if (!isNaN(netAmount)) {
            totalNetAmount += netAmount
          }
        })
        console.log("Total Net Amount:", totalNetAmount)
      })
      .catch((e) => {
        console.log("e")
      })
  }

  useEffect(() => {
    // getAccountActivityToday()
    // getAccountActivityLastMonth()
  }, [])

  useEffect(() => {
    polygon()
  }, [])
  return (
    <main className="container lg:mt-10 flex overflow-hidden xl:p-0">
      <div className="lg:my-6 lg:mr-4 flex w-full xl:max-w-[795px]  flex-1 flex-col lg:px-2">
        <div className="lg:hidden flex items-center mt-9 mb-2">
          <UserProfile />
        </div>
        <PortfolioHeader amount={numberWithCommasAndDecimals(1150)} />
        <hr className="mx-auto my-4 w-full bg-[#EDEEF3] dark:border-[#2D374E] dark:bg-[#2D374E]" />
        <ChartComponent data={data} />
        <RoboTraderMonthlyInsightAlert description="Your portfolio is performing well" />
        <div className="block xl:hidden">
          <PerformerList list={yourTopPerformers} />
        </div>
        <NewsSection />

        <SocialFeeds />
        <MultiCardSlider
          cardComponent={RoboFundsCard}
          data={roboPlans}
          heading="Top RoboFunds"
          subHeading="An alternative way to invest to hedge funds without a legal nightmare"
          responsiveness={roboFundsCardRespnosiveness}
          seeAllLink="/robo"
          showButtons={false}
        />
      </div>
      <div className="max-h-[800px] hidden xl:block min-w-[378px] max-w-[368px] rounded-xl shadow-md dark:border dark:border-[#3E4856] dark:bg-[#202A41]">
        <PerformerList list={yourTopPerformers} />
        <hr className="mx-auto w-11/12 bg-[#EDEEF3] dark:border-[#3E4856] dark:bg-[#3E4856] " />
        <Watchlist list={watchlist} />
      </div>
    </main>
  )
}
