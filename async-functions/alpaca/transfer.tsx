import { callGetApiWithAuth, callPostApiWithAuth } from "@/utils/api"

// Post Transfer Entity
export const PostTransferEntity = (data: any, token: string) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callPostApiWithAuth(
      "alpaca",
      `v1/accounts/${accountId}/transfers`,
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

// Get Transfers By Accounts
export const getTransfersByAccountId = (token: string) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `v1/accounts/${accountId}/transfers`,

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

export const getTransferHistory = (token: string) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `v2/account/activities?account_id=${accountId}`,

      (e) => {
        console.log("resolved")
        resolve(e)
      },
      token,
      (err) => {
        reject(err?.response?.data?.error?.message)
      }
    )
  })
}
