import { callGetApiWithAuth } from "@/utils/api"

export const getLatestTraderBySymbol = (symbolId: string, token: string) => {
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `/v2/stocks/${symbolId}/trades/latest`,

      (e) => {
        resolve(e)
      },
      token,
      (err) => {
        reject(err?.response?.data?.error?.message)
      }
    )
  })
}
