import { callGetApiWithAuth, callPostApiWithAuth } from "@/utils/api"

// Post Bank with ACH RelationShip
export const PostAchRelationship = (data: any, token: string) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callPostApiWithAuth(
      "alpaca",
      `v1/accounts/${accountId}/ach_relationships`,
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
// Get All ACH accounts
export const getACHAccount = (token: string) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `v1/accounts/${accountId}/ach_relationships?statuses=APPROVED`,

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

//Bank Relationship
export const BankRelationship = (
  data: any,
  token: string,
  relationship_id: string
) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callPostApiWithAuth(
      "alpaca",
      `/v1/accounts/${accountId}/ach_relationships/${relationship_id}`,
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
