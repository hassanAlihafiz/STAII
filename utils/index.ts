import { toast } from "@/components/ui/use-toast"

const extractErrorFromPath = (path: string) => {
  const errorMatch = path.match(/#error=([^&]+)/)
  return errorMatch ? decodeURIComponent(errorMatch[1]) : null
}

export const validateLink = (errMsg:string) => {
  const path = window.location.hash
  const error = extractErrorFromPath(path)
  if (error) {
    toast({
      variant: "destructive",
      title: "Link is invalid or expired",
      description: errMsg,
    })
    return false
  }
  return true;
}
