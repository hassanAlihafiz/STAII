import moment from "moment"

export function calculateDate(amount: number, unit: string) {
  const currentDate = moment()
  const formattedDate = currentDate
    .subtract(amount, unit as moment.DurationInputArg2)
    .format("YYYY-MM-DD")
  return formattedDate
}

export function calculateYTDDate() {
  const currentDate = moment()
  const year = currentDate.year()
  const formattedDate = moment({ year, month: 0, day: 1 }).format("YYYY-MM-DD")
  return formattedDate
}
