import moment from "moment"

export const getUserAgeWithDOB = (dateOfBirth: string): number => {
  const dob = moment(dateOfBirth)
  const now = moment()

  const age = now.diff(dob, "years")
  return age
}
