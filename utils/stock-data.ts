const generateRandomPrice = (from: number, to: number) => {
  // Generate a random price within the specified range
  return Math.floor(Math.random() * (to - from + 1)) + from
}

export const generateStockData = (from: number, to: number, volatile = 20) => {
  const startDate = new Date("2023-06-12")
  const stockData = []

  const isUptrend = from < to
  const trendDiff = isUptrend ? to - from : from - to
  const hourlyChange = trendDiff / (6 * 24)

  let currentPrice = from

  for (let i = 0; i < 6; i++) {
    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)

    for (let j = 0; j < 24; j++) {
      const timestamp = new Date(
        currentDate.getTime() + j * 60 * 60 * 1000
      ).getTime()

      let difference = (volatile / 100) * trendDiff
      if (!isUptrend) difference *= -1

      const price = currentPrice + generateRandomPrice(-difference, difference)

      stockData.push({ timestamp, price })

      currentPrice += (isUptrend ? 1 : -1) * hourlyChange
    }
  }

  return stockData
}

export const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString()
}
