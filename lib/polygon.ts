import { restClient, websocketClient } from "@polygon.io/client-js"

export const rest = restClient(process.env.NEXT_PUBLIC_POLYGON_KEY)
const socketConnection = async () => {
  const stocksWS = websocketClient(
    "JtHWLrRwS7tJfrkJrkK6ddOsEBdvZFND",
    "wss://business.polygon.io"
  ).stocks()
  stocksWS.onerror = (error: any) => {
    console.log(error)
  }
  stocksWS.onmessage = ({ data }: any) => {
    const [message] = JSON.parse(data)
    console.log("--------------------")
    stocksWS.send('{"action":"subscribe", "params":"AM.*"}')
    console.log("message", message)
    switch (message.ev) {
      case "AM":
        // your trade message handler
        break
      case "A":
        // your trade message handler
        break
    }
  }
}

export default socketConnection
