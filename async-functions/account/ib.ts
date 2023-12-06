import { setIBAccount } from "@/store/slices/user-slice"
import { callPostApi, callPostApiWithAuth } from "@/utils/api"
import { Dispatch } from "@reduxjs/toolkit"
import { SupabaseClient } from "@supabase/supabase-js"

import { IBAccountDetails, Profile } from "@/types/auth"
import { toast } from "@/components/ui/use-toast"

export const createUserIBAccount =
  (profile: Profile) =>
  async (
    supabase: SupabaseClient,
    dispatch: Dispatch
  ): Promise<{ data: any }> => {
    const fullNameParts = profile?.name?.split(" ")
    const firstName = fullNameParts[0]
    const lastName = fullNameParts.slice(1).join(" ")
    console.log(profile)
    const inputDate = new Date(profile?.date_of_birth!)
    const formattedDate = inputDate.toISOString().slice(0, 10)
    let data = null
    await callPostApi(
      "default",
      "/ib/create_user",
      {
        firstName: firstName,
        lastName: lastName,
        email: profile.email,
        countryOfBirth: profile.tax_residence_country,
        countryOfResidence: profile.tax_residence_country,
        userId: profile.uid,
        dateOfBirth: formattedDate,
        state: profile.state,
        city: profile.city,
        street: profile.street_address,
        zipCode: profile.zip_code,
      },
      async (res) => {
        const application = res?.Process?.Applications?.Application
        let errors = application?.Errors
        if (errors) {
          toast({
            title: "Something went wrong!",
            description: Array.isArray(errors?.Error)
              ? errors?.Error[0]?._text
              : errors?.Error?._text,
            variant: "destructive",
          })
          return (data = null)
        }
        await setUserIBAccount(res, profile?.uid!)(supabase, dispatch)
        await supabase
          .from("profile")
          .update({ ...profile })
          .eq("uid", profile.uid)
        toast({
          title: "Account created successfully!",
          description: "Lets get you started with your investment journey",
          variant: "success",
        })
      },
      (error) => {
        toast({
          title: "Something went wrong!",
          description: error?.message || "Please try again later",
          variant: "destructive",
        })
        data = null
      }
    )
    return { data }
  }

export const getUsersIBDetails =
  (userId: string) => async (supabase: SupabaseClient, dispatch: Dispatch) => {
    try {
      const { data, error } = await supabase
        .from("ib_profile")
        .select("*")
        .eq("uid", userId)

      if (data && data?.length > 0) {
        dispatch(setIBAccount(data[0] as IBAccountDetails))
        return data
      }
      return null
    } catch (error) {
      console.log(error)
      return null
    }
  }

const setUserIBAccount =
  (data: any, userId: string) =>
  async (supabase: SupabaseClient, dispatch: Dispatch) => {
    try {
      const { data: res, error: err } = await supabase
        .from("ib_profile")
        .insert({
          user_id:
            data?.Process?.Applications?.Application?.Users?.User?._attributes
              ?.user_id,
          password:
            data?.Process?.Applications?.Application?.Users?.User?._attributes
              ?.password,
          username:
            data?.Process?.Applications?.Application?.Users?.User?._text,
          account_no:
            data?.Process?.Applications?.Application?.Accounts?.Account?._text,

          uid: userId,
        })
        .select("*")
      // .single()

      if (res) {
        dispatch(setIBAccount(res[0] as IBAccountDetails))
      }
    } catch (error) {
      console.log(error)
    }
  }

export const createUserSSO = async (
  username: string
): Promise<{ data: any } | null> => {
  let data = null
  await callPostApi(
    "default",
    "/ib/create_user_session",
    {
      username,
    },
    (res) => {
      console.log(res)
      if (res?.RESULT === false) {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: res?.ERROR,
        })
        return (res = null)
      }
      data = res
    },
    (error) => {
      console.log(error)
      return (data = null)
    }
  )
  console.log(data)
  return data
}
