export type AuthStepsSlug = "/sign-up/address" | "/sign-up/connect-bank"
export type AuthStepsName = "address" | "connect-bank"
export type AdditionalProfileProps = { firstName?: string; lastName?: string }
export interface Profile extends AdditionalProfileProps {
  id?: string
  email?: string
  profile_url?: string
  city?: string
  name: string
  state?: string
  zip_code?: string
  uid?: string
  date_of_birth?: string
  country_of_birth?: string
  tax_residence_country?: string
  age?: number
  street_address?: string
  investment_accomodation?: any
  user_type?: string
}

export interface UsersFinancialInfo {
  primary_goal?: number
  investment_experience?: number
  investment_time_horizon?: number
  reaction_to_investment_loss?: number
  risk_tolerance?: number
  marital_status?: number
  employment_status?: number
  age?: number
  annual_income?: number
  net_worth?: number
  monthly_expenses?: number
  num_dependents?: number
}

export interface UsersFinancialInfoIB {
  primary_goal?: string
  investment_experience?: string
  investment_time_horizon?: string
  reaction_to_investment_loss?: string
  risk_tolerance?: string
  marital_status?: string
  employment_status?: string
  age?: string
  annual_income?: string
  net_worth?: string
  monthly_expenses?: string
  num_dependents?: string
}

export interface IBAccountDetails {
  userId: string
  password: string
  username: string
  account_no: string
}
