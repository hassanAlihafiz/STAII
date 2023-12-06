import * as RadioGroup from "@radix-ui/react-radio-group"

const settings = [
  {
    id: 1,
    title: "I want to manage the trades that the RoboTrader makes",
    text: "You will receive a notification to confirm the transaction every time a robot trader initiates a trade",
    value: "manage",
  },
  {
    id: 2,
    title: "Allow RoboTrader trade automatically",
    text: "RoboTrader will automatically trade your assets on the exchange. You will not be notified to confirm transactions",
    value: "auto",
  },
]

const RoboTraderSettings = () => {
  return (
    <div className="py-7">
      <h3 className="font-semibold">RoboTrader trading settings</h3>
      <RadioGroup.Root
        className="flex flex-col gap-2.5 mt-5"
        defaultValue="manage"
      >
        {settings.map((setting) => (
          <div key={setting.id} className="flex space-x-2.5">
            <RadioGroup.Item
              className="bg-white w-6 h-6 shrink-0 ring-1 ring-brand-gray-30 rounded-full p-1"
              value={setting.value}
              id={`radion-${setting.id}`}
            >
              <RadioGroup.Indicator className="relative block w-full h-full after:absolute after:inset-0 after:w-full after:h-full after:bg-brand-green-70 after:rounded-full" />
            </RadioGroup.Item>
            <label
              className="block cursor-pointer"
              htmlFor={`radion-${setting.id}`}
            >
              <span className="block font-semibold">{setting.title}</span>
              <span className="block text-sm text-brand-gray-50 mt-0.5">
                {setting.text}
              </span>
            </label>
          </div>
        ))}
      </RadioGroup.Root>
    </div>
  )
}

export default RoboTraderSettings
