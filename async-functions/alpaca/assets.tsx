import { callGetApiWithAuth, callPostApiWithAuth } from "@/utils/api"

//Get All Assets
export const getAssets = (token: string, page: number) => {
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `v1/assets?count=10&page=${page}&exchange=NASDAQ&class=us_equity&tradable=true`,

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

//Get Asset By Symbol Id
export const getAssetBySymbolId = (symbolId: string, token: string) => {
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `v1/assets/${symbolId}`,

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
export const getAssetBarSymbol = (
  symbol: string,
  token: string,
  params: string
) => {
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `/v2/stocks/${symbol}/bars?${params}`,

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
