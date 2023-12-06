import { ColumnDef } from "@tanstack/react-table"
import moment from "moment"

export type HistoricalColumn = {
  c: string
  o: string
  v: string
  h: string
  l: string
  t: string
}

export const HistoricalDataColumns: ColumnDef<HistoricalColumn>[] = [
  {
    id: "1",
    accessorKey: "t",
    header: "Date",
    cell: ({ row }) => (
      <div>{moment(row?.original?.t).format("MMM D, YYYY")}</div>
    ),
  },
  {
    id: "2",
    accessorKey: "c",
    header: "Close",
  },
  {
    id: "3",
    accessorKey: "o",
    header: "Open",
  },
  {
    id: "4",
    accessorKey: "v",
    header: "Volume",
  },
  {
    id: "5",
    accessorKey: "h",
    header: "High",
  },
  {
    id: "6",
    accessorKey: "l",
    header: "Low",
  },
]
