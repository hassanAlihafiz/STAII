import { addBankAccounts, setBankAccounts } from "@/store/slices/bank-slice"
import { callPostApi } from "@/utils/api"
import { Dispatch } from "@reduxjs/toolkit"
import { SupabaseClient } from "@supabase/supabase-js"
import axios from "axios"

import { BankDetails } from "@/types/user"
import { toast } from "@/components/ui/use-toast"

export const generateUserQuiltToken = async (userId: string) => {
  try {
    const { data } = await axios.post(
      "https://auth.quiltt.io/v1/users/sessions",
      {
        userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_QUILTT_API_KEY}`,
        },
      }
    )
    return { token: data.token }
  } catch (error) {
    return { token: "" }
  }
}

export const addBankAccountDetails =
  (data: any) => async (dispatch: Dispatch, supabase: SupabaseClient) => {
    console.log(data?.ibAccount)
    const { data: bankDetails, error } = await supabase
      .from("bank_details")
      .insert({
        account_no: data.AccountNumber,
        bank_name: data.bankName,
        routing_no: data.routingNumber,
        user_id: data?.userId,
        ib_account_no: data?.ibAccount,
      } as BankDetails)
      .select("*")
      .single()
    if (error || !bankDetails) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      })
      return false
    }
    dispatch(addBankAccounts(bankDetails as BankDetails))
    toast({
      variant: "success",
      title: "Bank Account Added Successfully!",
      description: "you can now deposite and withdraw funds using this account",
    })
    return true
  }

export const fetchBankAccounts =
  () => async (dispatch: Dispatch, supabase: SupabaseClient) => {
    const { data: bankDetails, error } = await supabase
      .from("bank_details")
      .select("*")

    if (error || !bankDetails) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
      return false
    }
    dispatch(setBankAccounts(bankDetails as BankDetails[]))
  }
enum TransferType {
  DEPOSITE = "DEPOSITE",
  WITHDRAW = "WITHDRAW",
}
export const initiateDeposite =
  (
    data: {
      account_number: string
      amount: number
      method: string
      institution: string
      acc_no: string
      user_id: string
    },
    isDeposite: boolean
  ) =>
  async (supabase: SupabaseClient): Promise<boolean> => {
    let body = {
      ...data,
      amount: Number(data?.amount),
      // instr_id: 110,
    }
    let response = false
    await callPostApi(
      "default",
      isDeposite ? "/ib/initiate_deposite" : "/ib/initiate_withdrawal",
      body,

      async (res) => {
        const result =
          res?.instr_result_set?.deposit_result || res?.instr_result_set?.result
        const status: string = result?.status?._text

        const { data: depositeReq, error } = await supabase
          .from("ib_transfer_requests")
          .insert({
            ...data,
            ib_instr_id: result?.ib_instr_id?._text,
            instr_id: result?.instr_id?._text,
            status,
            type: isDeposite ? TransferType.DEPOSITE : TransferType.WITHDRAW,
          })
        if (!status || status === "REJECTED") {
          console.error(res)
          toast({
            variant: "destructive",
            title: "Error",
            description: result?.description?._text || "Something went wrong",
          })
          response = false
        }

        if (error) {
          console.error(error)
        }

        response = true
      },
      (error) => {
        console.log(error)
        response = false
      }
    )
    return response
  }
