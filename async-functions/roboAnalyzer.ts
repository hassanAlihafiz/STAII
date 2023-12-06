import { format } from "path"
import { setUser } from "@/store/slices/user-slice"
import { formattedValueToNumber } from "@/utils/format-input"
import { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"

import { toast } from "@/components/ui/use-toast"

export const callPostRoboAnalyzer = async (data: any, dispatch: Dispatch) => {
  let body = {
    ...data,
    annual_income: formattedValueToNumber(data.annual_income),
    monthly_expenses: formattedValueToNumber(data.monthly_expenses),
    net_worth: formattedValueToNumber(data.net_worth),
  }

  try {
    let config = {
      method: "post",
      url: "https://roboanalyzer.socialtraderapi.com",
      headers: {
        "X-API-KEY": "2zPb1VuFEq3jceuCpSgWz7hh515wQYvr4SLfIWz1",
        "Content-Type": "application/json",
      },
      data: body,
    }

    const response = await axios.request(config)

    if (response.data?.errorMessage) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: response.data?.errorMessage,
      })
      return false
    }

    toast({
      variant: "success",
      title: `Analyzer Completed`,
      description: "This may take some time to reflect.",
    })

    dispatch(setUser({ investment_accomodation: response?.data?.body }))
    return true
  } catch (error) {
    console.log(error, "ddd")
    return false
  }
}
