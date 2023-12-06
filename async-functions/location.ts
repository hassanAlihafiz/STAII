import { countries } from "@/utils/operating-locations"
import axios from "axios"

export const fetchCities = async (
  countryCode: string,
  stateCode: string,
  states: { name: string; state_code: string }[]
) => {
  try {
    let country = countries.find((i) => i.value === countryCode)?.label
    let state = states.find((i) => i.state_code === stateCode)?.name
    const { data } = await axios.post(
      `https://countriesnow.space/api/v0.1/countries/state/cities`,
      {
        country,
        state,
      }
    )
    console.log(data)
    return data?.data
  } catch (error) {
    console.error("Error:", error)
  }
}

export const fetchStates = async (countryCode: string) => {
  try {
    let country = countries.find((i) => i.value === countryCode)?.label
    const { data } = await axios.post(
      `https://countriesnow.space/api/v0.1/countries/states`,
      {
        country,
      }
    )

    return data?.data?.states
  } catch (error) {
    console.error("Error:", error)
    return []
  }
}
