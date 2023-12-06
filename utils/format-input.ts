export const formatNumberInputs = (
  e: React.ChangeEvent<HTMLInputElement>
): string => {
  const inputValue = e.target.value
  const numericValue = parseFloat(inputValue.replace(/,/g, ""))

  if (!isNaN(numericValue)) {
    const formattedValue = numericValue.toLocaleString()
    e.target.value = formattedValue
    return formattedValue
  } else {
    e.target.value = ""
    return ""
  }
}

export const formatNumberValues = (value?: string | number): string => {
  if (!value) return ""
  if (typeof value === "number") value = value.toString()
  const numericValue = parseFloat(value.replace(/,/g, ""))
  return isNaN(numericValue) ? "" : numericValue.toString()
}

export function formattedValueToNumber(formattedValue: string | number) {
  console.log(formattedValue, "formattedValue")
  if (typeof formattedValue === "number")
    formattedValue = formattedValue.toString()
  const numericValue = parseFloat(formattedValue.replace(/,/g, ""))
  return isNaN(numericValue) ? undefined : numericValue
}
