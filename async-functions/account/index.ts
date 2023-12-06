"use client"

import { resetApp } from "@/store/slices/app-slice"
import { resetBankDetails } from "@/store/slices/bank-slice"
import { resetUserDetails, setUser } from "@/store/slices/user-slice"
import { callPutApiWithAuth } from "@/utils/api"
import { Dispatch } from "@reduxjs/toolkit"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SupabaseClient } from "@supabase/supabase-js"
import { uuid } from "uuidv4"

import { AuthStepsName, AuthStepsSlug } from "@/types/auth"
import { toast } from "@/components/ui/use-toast"

export const setCurrentStep =
  (current_step: AuthStepsName, step_slug: AuthStepsSlug) =>
  async (supabase: SupabaseClient) => {
    const { data, error } = await supabase
      .from("user_progress")
      .update({ step_slug, current_step })
  }

export const getUserDetails =
  (supabase: SupabaseClient, userId: string) => async (dispatch: Dispatch) => {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("uid", userId)
      .single()
    console.log(data)

    if (data) {
      dispatch(setUser(data))
      return true
    }
    return false
  }

const showToast = (field: string, error: any) => {
  error
    ? toast({
        variant: "destructive",
        title: error.code,
        description: error.message,
      })
    : toast({
        variant: "success",
        title: `User ${field} updated!`,
        description: "This may take some time to reflect.",
      })
}
export const updateUserName =
  (value: string, uid: string, token: string) =>
  async (supabase: SupabaseClient, dispatch: Dispatch) => {
    const { data, error } = await supabase
      .from("profile")
      .update({ name: value })
      .eq("uid", uid)
    await callPutApiWithAuth(
      "lemmy",
      "/user/save_user_settings",
      {
        display_name: value,
        theme: "dark",
      },

      (res) => console.log(res),
      token,
      (error) => console.error(error)
    )
    showToast("name", error)
    if (!error) {
      dispatch(setUser({ name: value }))
      return true
    }
  }

export const updateUserEmail =
  (value: string, uid: string) =>
  async (supabase: SupabaseClient, dispatch: Dispatch) => {
    const { data, error } = await supabase
      .from("profile")
      .update({ email: value })
      .eq("uid", uid)
    showToast("email", error)
    if (!error) {
      dispatch(setUser({ email: value }))
      return true
    }
  }

export const updateUserAddress =
  (value: string, uid: string) =>
  async (supabase: SupabaseClient, dispatch: Dispatch) => {
    const { data, error } = await supabase
      .from("profile")
      .update({ street_address: value })
      .eq("uid", uid)
    showToast("street Address", error)
    if (!error) {
      dispatch(setUser({ street_address: value }))
      return true
    }
  }
export const uploadImageAndSaveToProfile =
  (file: File, uid: string, token: string) =>
  async (supabase: SupabaseClient, dispatch: Dispatch) => {
    try {
      const filename = `${uuid()}-${file.name}`
      const { data, error } = await supabase.storage
        .from("web-app")
        .upload(`profile/${filename}`, file, {
          cacheControl: "3600",
          upsert: false,
        })
      // Get the public URL of the uploaded image
      const { data: imgUrl } = await supabase.storage
        .from(`web-app`)
        .getPublicUrl(`${data?.path}`)

      if (error) {
        // Handle the error (e.g., show a notification)
        showToast("image", error)
        return false
      }
      // Update the user's profile with the image URL
      const { data: updateData, error: updateError } = await supabase
        .from("profile")
        .update({ profile_url: imgUrl?.publicUrl })
        .eq("uid", uid)
      await callPutApiWithAuth(
        "lemmy",
        "/user/save_user_settings",
        {
          avatar: imgUrl?.publicUrl,
          theme: "dark",
        },

        (res) => console.log(res),
        token,
        (error) => console.error(error)
      )
      // Optionally, update the user's state and show notifications
      if (!updateError) {
        dispatch(setUser({ profile_url: imgUrl?.publicUrl }))
        showToast("image", updateError)
        return true
      }
    } catch (error) {
      // console.error("Error during image upload and saving:", error)
      showToast("image", error)
      return false // Return false if an error occurs
    }
  }

export const changePasswordByUserId =
  (password: string) =>
  async (supabase: SupabaseClient, dispatch: Dispatch) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      })
      if (error) {
        showToast("password", error) // Show error toast
        return false
      }
      if (data) {
        showToast("password", false)
        return true // Password update successful
      }
    } catch (error) {
      showToast("password", error) // Show error toast
      return false
    }
  }
export const addFactorId =
  (value: string, uid: string) =>
  async (supabase: SupabaseClient, dispatch: Dispatch) => {
    const { data, error } = await supabase
      .from("profile")
      .update({ factorId: value })
      .eq("uid", uid)
  }

export const logoutUser =
  (supabase: SupabaseClient) => async (dispatch: Dispatch) => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast({
        title: "Unable to logout!",
        description: error.message,
        variant: "destructive",
      })
      return false
    }
    dispatch(resetUserDetails())
    dispatch(resetBankDetails())
    dispatch(resetApp())
    return true
  }

export const getMeetingType =
  (id: string, user?: boolean) => async (supabase: SupabaseClient) => {
    try {
      const { data, error } = await supabase
        .from("dyte_meetings")
        .select("type,meeting_preset")
        .eq("meeting", id)
        .single()
      console.log("hassan", data)
      if (error) {
        console.error("Error fetching data:", error.message)
        return null
      }
      const type = data?.type
      if (!type) {
        console.error("Data not found or type is missing.")
        return null
      }
      let preset_name = ""
      switch (type) {
        case "Group":
          preset_name = user ? "ST-Group-Host" : data?.meeting_preset
          break
        case "Webinar":
        case "Livestream":
          preset_name = user ? `ST-${type}-Host` : data?.meeting_preset
          break
        default:
          console.error("Unknown type:", type)
      }
      return preset_name
    } catch (error) {
      showToast("Preset Name", "Unable to get Preset Name")
      return null
    }
  }

export const createMeetingLink = (meetingId: string) => {
  const isDevelopment = process.env.NODE_ENV === "development"
  const protocol = isDevelopment ? "http://" : window.location.protocol + "//"
  const host = isDevelopment ? "localhost:3000" : window.location.host
  return `${protocol}${host}/meet/${meetingId}`
}

export const createMeetingLinkWithToken = (
  meetingId: string,
  token: string
) => {
  const isDevelopment = process.env.NODE_ENV === "development"
  const protocol = isDevelopment ? "http://" : window.location.protocol + "//"
  const host = isDevelopment ? "localhost:3000" : window.location.host
  return `${protocol}${host}/meet/${meetingId}?authToken=${token}`
}
