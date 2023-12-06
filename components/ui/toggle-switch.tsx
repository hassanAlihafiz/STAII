import React from "react"

interface toggleProps {
  description?: string
  hide?: string
  onChange: (value: boolean) => void
}
const ToggleSwitch: React.FC<toggleProps> = ({
  description,
  hide,
  onChange,
}) => {
  return (
    <label
      className={`relative inline-flex items-center  cursor-pointer ${hide}`}
    >
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={(input) => onChange(input.target.checked)}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      {description && (
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {description}
        </span>
      )}
    </label>
  )
}

export default ToggleSwitch
