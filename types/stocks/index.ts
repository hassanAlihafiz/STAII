interface Address {
  address1: string
  address2: string
  city: string
  state: string
  postal_code: string
}

interface Branding {
  logo_url: string
  icon_url: string
}

interface Change {
  todaysChange: string
  todaysChangePerc: string
  fmv: string
  prevDay: [
    {
      id: string
      name: string
      value: string
    }
  ]
}

interface CData {
  timePeriod: string
  value: number
}

interface Price {
  P: number
  S: number
  p: number
  s: number
  t: number
}

interface Range {
  fiftyTwoWeekHigh: number
  fiftyTwoWeekLow: number
}

export interface StockDetails extends Base {
  change: Change
  price: Price
  details: StockDetails
  range: Range
  changeData: CData[]
}

interface Base {
  ticker: string
  name: string
  market: string
  locale: string
  primary_exchange: string
  type: string
  active: boolean
  currency_name: string
  cik: string
  composite_figi: string
  share_class_figi: string
  market_cap: number
  phone_number: string
  address: Address
  description: string
  sic_code: string
  sic_description: string
  ticker_root: string
  homepage_url: string
  total_employees: number
  list_date: string
  branding: Branding
  share_class_shares_outstanding: number
  weighted_shares_outstanding: number
  round_lot: number
}

export interface CompanyDetails {
  details: StockDetails
  range: Range
}
