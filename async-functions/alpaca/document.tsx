import { callGetApiWithAuth, callPostApiWithAuth } from "@/utils/api"

//Upload Document
export const UploadDocument = (data: any, token: string) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callPostApiWithAuth(
      "alpaca",
      `v1/accounts/${accountId}/documents/upload`,
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

//Download Document
export const DownloadDocument = (documentId: string, token: string) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `v1/accounts/${accountId}/documents/${documentId}/download`,

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

//Get Document By Document Id
export const getDocumentById = (documentId: string, token: string) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `v1/accounts/${accountId}/documents/${documentId}`,

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

//Get Document for one account
export const getDocumentForOneAccount = (token: string) => {
  let accountId = "47c18d86-c2b7-4a38-82fe-9279bfd0e415"
  return new Promise((resolve, reject) => {
    callGetApiWithAuth(
      "alpaca",
      `v1/accounts/${accountId}/documents`,

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
