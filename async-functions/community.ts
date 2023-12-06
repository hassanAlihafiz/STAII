import { setCommunityData } from "@/store/slices/community-slice"
import { callGetApiWithAuth } from "@/utils/api"
import { Dispatch } from "redux"

export const fetchCommunities =
  (token: string) => async (dispatch: Dispatch) => {
    callGetApiWithAuth(
      "lemmy",
      "/community/list",

      (e) => {
        dispatch(setCommunityData(e?.communities))
      },
      token,
      (err) => {
        console.error(err)
      }
    )
  }
