"use client"

export const getApiConfig = (apiName: string) => {
  let baseURL = "" as any
  let headers = null as any

  switch (apiName) {
    case "socialtrader":
      baseURL = process.env.NEXT_PUBLIC_API_SERVER_URL
      break
    case "lemmy":
      baseURL = process.env.NEXT_PUBLIC_LEMMY_URL
      break
    case "dyte":
      baseURL = process.env.NEXT_PUBLIC_DYTE_URL
      const credentials = Buffer.from(
        "88daaaa2-db5c-495f-97dc-8823356ac418:13787b3f0b9511b62972"
      ).toString("base64")
      headers = { Authorization: `Basic ${credentials}` }
      break
    case "alpaca":
      baseURL = process.env.NEXT_PUBLIC_ALPACA_API
      break
    case "polygon":
      baseURL = "https://api.polygon.io/"
      break
    default:
      baseURL = process.env.NEXT_PUBLIC_API_SERVER_URL
  }

  return { baseURL, headers }
}
