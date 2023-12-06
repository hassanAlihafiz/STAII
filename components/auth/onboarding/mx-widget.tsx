import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { setGuids } from "@/store/slices/bank-slice"

import { toast } from "@/components/ui/use-toast"

interface MXConnectWidgetProps {
  widgetUrl: string
}

function MXConnectWidget({ widgetUrl }: MXConnectWidgetProps): JSX.Element {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    window.addEventListener("message", onPostMessage)
    return () => {
      window.removeEventListener("message", onPostMessage)
    }
  }, [])

  const onPostMessage = (event: MessageEvent): void => {
    if (event.data && event.data.mx === true) {
      console.log("MX PostMessage: ", event)
      if (event.data.type === "mx/connect/memberConnected") {
        console.log(event)
        dispatch(
          setGuids({
            userGuid: event.data.metadata.user_guid,
            memberGuid: event.data.metadata.member_guid,
          })
        )
        toast({
          title: "Bank account connected Successfully!",
          variant: "success",
          description: "Lets Analyze your financial health",
        })
        router.push("/sign-up/financial-goal")
      }
    }
  }

  return (
    <div className="grid w-full max-w-full place-items-center overflow-hidden">
      <iframe
        frameBorder="0"
        height={650}
        marginHeight={0}
        marginWidth={0}
        src={widgetUrl}
        title="MX Connect Widget"
        className="w-full max-w-full rounded-lg"
      />
    </div>
  )
}

export default MXConnectWidget
