export const recurrenceOptions = [
  { label: "Daily (5 occurrences)", value: "RRULE:FREQ=DAILY;COUNT=5" },
  { label: "Daily (Every 2 days)", value: "RRULE:FREQ=DAILY;INTERVAL=2" },
  {
    label: "Weekly (Mondays, Wednesdays, Fridays - 10 occurrences)",
    value: "RRULE:FREQ=WEEKLY;COUNT=10;BYDAY=MO,WE,FR",
  },
  {
    label: "Weekly (Every 2 weeks on Tuesdays)",
    value: "RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TU",
  },
  {
    label: "Monthly (15th day of the month)",
    value: "RRULE:FREQ=MONTHLY;BYMONTHDAY=15",
  },
  {
    label: "Monthly (2nd Monday of the month)",
    value: "RRULE:FREQ=MONTHLY;BYDAY=2MO",
  },
  {
    label: "Yearly (June 21st)",
    value: "RRULE:FREQ=YEARLY;BYMONTH=6;BYMONTHDAY=21",
  },
  {
    label: "Yearly (3rd Tuesday of November)",
    value: "RRULE:FREQ=YEARLY;BYDAY=3TU;BYMONTH=11",
  },
  {
    label: "Custom (Every other Monday and Wednesday)",
    value: "RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE",
  },
  {
    label: "Daily (Until October 31, 2023)",
    value: "RRULE:FREQ=DAILY;UNTIL=20231031",
  },
  { label: "Weekly (12 occurrences)", value: "RRULE:FREQ=WEEKLY;COUNT=12" },
  {
    label: "Monthly (15th day of the month or Mondays/Wednesdays)",
    value: "RRULE:FREQ=MONTHLY;BYMONTHDAY=15;BYDAY=MO,WE",
  },
]
