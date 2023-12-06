import { callGetApi } from "@/utils/api"
import moment from "moment"

export const getPolygonAssetDetails = (symbol: string) => {
  return new Promise((resolve, reject) => {
    callGetApi(
      "polygon",
      `v3/reference/tickers/${symbol}?apiKey=JtHWLrRwS7tJfrkJrkK6ddOsEBdvZFND`,
      (e) => {
        resolve(e?.results)
      },
      (err) => {
        reject(err?.response?.data?.error?.message)
      }
    )
  })
}
export const getRangeByWeek = (ticker: string) => {
  const today = moment().format("YYYY-MM-DD")
  const lastYearMonth = moment().subtract(1, "year").format("YYYY-MM-DD")
  return new Promise((resolve, reject) => {
    callGetApi(
      "polygon",
      `v2/aggs/ticker/${ticker}/range/1/day/${lastYearMonth}/${today}?apiKey=JtHWLrRwS7tJfrkJrkK6ddOsEBdvZFND`,
      (e) => {
        const highPrices = e?.results.map((bar: any) => bar.h)
        const lowPrices = e?.results.map((bar: any) => bar.l)
        const fiftyTwoWeekHigh = Math.max(...highPrices)
        const fiftyTwoWeekLow = Math.min(...lowPrices)
        resolve({
          fiftyTwoWeekHigh,
          fiftyTwoWeekLow,
        })
      },
      (err) => {
        reject(err?.response?.data?.error?.message)
      }
    )
  })
}
export const getChange = (ticker: string) => {
  return new Promise((resolve, reject) => {
    callGetApi(
      "polygon",
      `v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=JtHWLrRwS7tJfrkJrkK6ddOsEBdvZFND`,
      (e) => {
        const todaysChange =
          e?.ticker?.todaysChange?.toFixed(2) === "0.00"
            ? (e?.ticker.day.o - e?.ticker.prevDay.o).toFixed(2)
            : e?.ticker?.todaysChange?.toFixed(2)
        const todaysChangePerc =
          e?.ticker?.todaysChangePerc.toFixed(2) === "0.00"
            ? (
                ((e?.ticker?.day.o - e?.ticker?.prevDay.o) /
                  e?.ticker?.prevDay.o) *
                100
              ).toFixed(2)
            : e?.ticker?.todaysChangePerc.toFixed(2)
        const fmv = e?.ticker?.fmv

        const prevDay = [
          {
            id: "1",
            name: "Open",
            value: e?.ticker?.prevDay.o.toFixed(2),
          },
          {
            id: "2",
            name: "Close",
            value: e?.ticker?.prevDay.c.toFixed(2),
          },
          {
            id: "3",
            name: "High",
            value: e?.ticker?.prevDay.h.toFixed(2),
          },
          {
            id: "4",
            name: "Low",
            value: e?.ticker?.prevDay.l,
          },
          {
            id: "5",
            name: "Volume",
            value: numberWithCommasAndDecimals(e?.ticker?.prevDay.v),
          },
          {
            id: "6",
            name: "Volume Weighted",
            value: e?.ticker?.prevDay.vw,
          },
        ]

        resolve({
          todaysChange,
          todaysChangePerc,
          fmv,
          prevDay,
        })
      },
      (err) => {
        reject(err?.response?.data?.error?.message)
      }
    )
  })
}

export const getChangeGraph = (ticker: string) => {
  const today = moment().format("YYYY-MM-DD")
  const dayBefore = moment().subtract(30, "day").format("YYYY-MM-DD")
  return new Promise((resolve, reject) => {
    callGetApi(
      "polygon",
      `v2/aggs/ticker/${ticker}/range/1/day/${dayBefore}/${today}?apiKey=JtHWLrRwS7tJfrkJrkK6ddOsEBdvZFND`,
      (e) => {
        const dataFromPolygon = e.results.map((entry: any) => {
          return {
            timePeriod: moment(entry.t).format("YYYY-MM-DD"),
            value: entry.o,
          }
        })
        resolve(dataFromPolygon)
      },
      (err) => {
        reject(err?.response?.data?.error?.message)
      }
    )
  })
}

export const getBuySellPrice = (ticker: string) => {
  return new Promise((resolve, reject) => {
    callGetApi(
      "polygon",
      `v2/snapshot/locale/us/markets/stocks/tickers?tickers=${ticker}&apiKey=JtHWLrRwS7tJfrkJrkK6ddOsEBdvZFND`,
      (e) => {
        resolve(e?.tickers[0]?.lastQuote)
      },
      (err) => {
        reject(err?.response?.data?.error?.message)
      }
    )
  })
}

// Define the getAssetDetails function using promises
const getAssetDetails = (ticker: any) => {
  return new Promise((resolve, reject) => {
    callGetApi(
      "polygon",
      `v3/reference/tickers/${ticker}?apiKey=JtHWLrRwS7tJfrkJrkK6ddOsEBdvZFND`,
      (detailsResponse) => {
        resolve(detailsResponse?.results)
      },
      (detailsError) => {
        reject(
          detailsError?.response?.data?.error?.message ||
            "Error fetching asset details"
        )
      }
    )
  })
}
export const getUniversalSnapshot = (ticker: any) => {
  return new Promise((resolve, reject) => {
    callGetApi(
      "polygon",
      `v3/snapshot?ticker.any_of=${ticker}&apiKey=cD0lnQuVpL1PSNGoVaR99ydwbmdCb_ep`,
      (detailsResponse) => {
        resolve(detailsResponse?.results)
      },
      (detailsError) => {
        reject(
          detailsError?.response?.data?.error?.message ||
            "Error fetching asset details"
        )
      }
    )
  })
}

// Modify the getAllPolygonAssets function to return a promise
export const getAllPolygonAssets = (stocks: string) => {
  return new Promise((resolve, reject) => {
    const assetDetailsPromises = stocks_data.map((ass: any) =>
      getAssetDetails(ass.ticker)
    )
    Promise.all(assetDetailsPromises)
      .then((assetDetails) => {
        const assets = stocks_data.map((ticker: any, index: number) => ({
          ...ticker,
          details: assetDetails[index],
        }))
        resolve(assets)
      })
      .catch((error) => {
        reject(
          error?.response?.data?.error?.message ||
            "Error fetching asset details"
        )
      }),
      (error: any) => {
        reject(error?.response?.data?.error?.message || "Error fetching assets")
      }
  })
}

const stocks_data = [
  { ticker: "AAPL" },
  { ticker: "MSFT" },
  { ticker: "GOOG" },
  { ticker: "AMZN" },
  { ticker: "NVDA" },
  { ticker: "META" },
  { ticker: "TSLA" },
  { ticker: "LLY" },
  { ticker: "V" },
  { ticker: "UNH" },
  { ticker: "WMT" },
  { ticker: "JPM" },
  { ticker: "XOM" },
  { ticker: "AVGO" },
  { ticker: "MA" },
  { ticker: "PG" },
  { ticker: "JNJ" },
  { ticker: "ORCL" },
  { ticker: "HD" },
  { ticker: "ADBE" },
  { ticker: "CVX" },
  { ticker: "MRK" },
  { ticker: "COST" },
  { ticker: "KO" },
  { ticker: "ABBV" },
  { ticker: "PEP" },
  { ticker: "BAC" },
  { ticker: "CSCO" },
  { ticker: "CRM" },
  { ticker: "NFLX" },
  { ticker: "MCD" },
  { ticker: "AMD" },
  { ticker: "TMO" },
  { ticker: "TMUS" },
  { ticker: "CMCSA" },
  { ticker: "PFE" },
  { ticker: "INTC" },
  { ticker: "ABT" },
  { ticker: "NKE" },
  { ticker: "DIS" },
  { ticker: "VZ" },
  { ticker: "WFC" },
  { ticker: "INTU" },
  { ticker: "DHR" },
  { ticker: "AMGN" },
  { ticker: "PM" },
  { ticker: "QCOM" },
  { ticker: "COP" },
  { ticker: "IBM" },
  { ticker: "IBM" },
]

const calculateFrom = (timeframe: string) => {
  const now = moment()
  switch (timeframe) {
    case "1D":
      return now.subtract(1, "days").format("YYYY-MM-DD")
    case "1W":
      return now.subtract(1, "weeks").format("YYYY-MM-DD")
    case "1M":
      return now.subtract(1, "months").format("YYYY-MM-DD")
    case "3M":
      return now.subtract(3, "months").format("YYYY-MM-DD")
    case "1Y":
      return now.subtract(1, "years").format("YYYY-MM-DD")
    default:
      return now.format("YYYY-MM-DD")
  }
}

const timeFrame = (timeframe: string) => {
  const now = "day"
  switch (timeframe) {
    case "1D":
      return "hour"
    case "1W":
      return "day"
    case "1M":
      return "day"
    case "3M":
      return "day"
    case "1Y":
      return "month"
    default:
      return "hour"
  }
}

const calculateTo = () => {
  return moment().format("YYYY-MM-DD") // Current date and time
}
export const getAssetsBarData = (symbol: string, timeframe: string) => {
  return new Promise((resolve, reject) => {
    callGetApi(
      "polygon",
      `v2/aggs/ticker/${symbol}/range/1/${timeFrame(timeframe)}/${calculateFrom(
        timeframe
      )}/${calculateTo()}?apiKey=JtHWLrRwS7tJfrkJrkK6ddOsEBdvZFND`,
      (e) => {
        const data = e.results.map((entry: any) => {
          return {
            ...entry,
            t: moment(entry.t).format("YYYY-MM-DD HH:mm:ss"),
          }
        })
        resolve(data)
      },
      (err) => {
        reject(err?.response?.data?.error?.message)
      }
    )
  })
}
export const formatMarketCap = (value: number) => {
  // Divide by 1 trillion (10^12)
  if (value >= 1e12) {
    return (value / 1e12).toFixed(2) + " T"
  }
  // Divide by 1 billion (10^9)
  else if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + " B"
  }
  // Return as is if less than 1 billion
  else {
    return value.toString()
  }
}
export const numberWithCommasAndDecimals = (number: number) => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
