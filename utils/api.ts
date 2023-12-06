import axios, { AxiosResponse } from "axios"

import { getApiConfig } from "@/lib/api"

interface RequestOptions {
  headers?: {
    Authorization?: string
  }
}

type doneCallbackType = (data: any) => void
type failCallbackType = (err: any) => void

const callApi = async (
  key: string,
  path: string,
  method: "POST" | "GET" | "PUT" | "DELETE" | "GET_AUTH" = "GET",
  data: any = null,
  doneCallback: doneCallbackType,
  failCallback: failCallbackType | undefined,
  token: string | null | null
) => {
  let options: RequestOptions = {}
  let axiosResponse: AxiosResponse | null = null

  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    }
  }
  const { baseURL, headers } = getApiConfig(key)
  if (headers) {
    options.headers = headers
  }

  try {
    const url = baseURL + path
    if (method === "POST") {
      axiosResponse = await axios.post(url, data, options)
    } else if (method === "GET") {
      axiosResponse = await axios.get(url, options)
    } else if (method === "PUT") {
      axiosResponse = await axios.put(url, data, options)
    } else if (method === "DELETE") {
      axiosResponse = await axios.delete(url, options)
    }
    if (doneCallback) doneCallback(axiosResponse?.data)
  } catch (err: any) {
    console.error("Network error:", err)
    if (failCallback) {
      failCallback(err)
    }
  }
}

export default callApi

export const callGetApiWithAuth = async (
  key: string,
  path: string,

  doneCallback: doneCallbackType,
  token: string | null,
  failCallback?: failCallbackType
) => {
  await callApi(key, path, "GET", null, doneCallback, failCallback, token)
}

export const callGetApi = async (
  key: string,
  path: string,
  doneCallback: doneCallbackType,
  failCallback?: failCallbackType
) => {
  await callApi(
    key,
    path,
    "GET",
    null,

    doneCallback,
    failCallback,
    null
  )
}

export const callPostApiWithAuth = async (
  key: string,
  path: string,
  data: any,

  doneCallback: doneCallbackType,
  token: string | null,
  failCallback?: failCallbackType
) => {
  await callApi(key, path, "POST", data, doneCallback, failCallback, token)
}

export const callPostApi = async (
  key: string,
  path: string,
  data: any,

  doneCallback: doneCallbackType,
  failCallback?: failCallbackType
) => {
  await callApi(
    key,
    path,
    "POST",
    data,

    doneCallback,
    failCallback,
    null
  )
}

export const callPutApi = async (
  key: string,
  path: string,
  data: any,

  doneCallback: doneCallbackType,
  token: string | null,
  failCallback?: failCallbackType
) => {
  await callApi(key, path, "PUT", data, doneCallback, failCallback, token)
}

export const callDeleteApi = async (
  key: string,
  path: string,

  doneCallback: doneCallbackType,
  token: string | null,
  failCallback?: failCallbackType
) => {
  await callApi(
    key,
    path,
    "DELETE",
    null,

    doneCallback,
    failCallback,
    token
  )
}

export const callPutApiWithAuth = async (
  key: string,
  path: string,
  data: any,

  doneCallback: doneCallbackType,
  token: string | null,
  failCallback?: failCallbackType
) => {
  await callApi(key, path, "PUT", data, doneCallback, failCallback, token)
}
