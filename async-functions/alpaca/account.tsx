import { callGetApiWithAuth, callPostApiWithAuth } from "@/utils/api"

// Post Account
export const PostAccount = (data: any, token: string) => {
  return new Promise((resolve, reject) => {
    callPostApiWithAuth(
      "alpaca",
      `v1/accounts`,
      data,
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

// Get Brokerage accounts by id
export const getBrokerageAccountById = (token: string) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `v1/accounts/${accountId}`,
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

// Get Trading accounts
export const getTradingAccountById = (token: string) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `v1/trading/accounts/${accountId}/account`,
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

export const getAccountActivities = (token: string, params: string) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `v1/accounts/activities?account_id=${accountId}${params}`,
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
