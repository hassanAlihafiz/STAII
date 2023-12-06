import React from "react"
import CreatableSelect from "react-select/creatable"
import TimezoneSelect from "react-timezone-select"

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "black" : "gray",
  }),
  menuList: (provided: any, state: any) => ({
    ...provided,
    height: 100,
  }),
}
const classNames = {
  input: () => "dark:text-inherit ",
  control: () => "dark:!bg-brand-blue-90 dark:border-brand-gray-60",
  singleValue: () => "dark:text-inherit",
  menu: () => "dark:bg-brand-gray-100",
  option: (props: any) =>
    props.isSelected
      ? "dark:text-white dark:bg-brand-blue-90"
      : "dark:bg-transparent dark:text-[#999999] dark:hover:text-white dark:hover:bg-brand-blue-90 ",
}
export const MyCreatableSelect = ({ show = true, ...props }) => {
  return (
    <>
      <CreatableSelect
        {...props}
        closeMenuOnSelect={true}
        styles={customStyles}
        classNames={classNames}
      />
    </>
  )
}
export const SelectTimezone = ({ ...props }) => {
  return (
    <>
      <TimezoneSelect
        {...props}
        value={props.value}
        closeMenuOnSelect={true}
        styles={customStyles}
        classNames={classNames}
      />
    </>
  )
}
