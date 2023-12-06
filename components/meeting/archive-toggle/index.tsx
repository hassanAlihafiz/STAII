import React, { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

interface ArchiveToggleProps {
  id: string
  getEmails: () => void
  value: boolean
}

const ArchiveToggle: React.FC<ArchiveToggleProps> = ({
  id,
  value,
  getEmails,
}) => {
  const [checked, setChecked] = useState(value)
  const supabase = createClientComponentClient()
  const onArchiveChange = (e: any) => {
    setChecked(e)
    updateMeeting(e)
  }
  const updateMeeting = async (e: boolean) => {
    const { error } = await supabase
      .from("dyte_meetings")
      .update({
        archive: e,
      })
      .eq("meeting", id)
    if (error) {
      toast({
        variant: "destructive",
        title: "Update Meeting",
        description: error?.message,
      })
    } else {
      getEmails()
      toast({
        variant: "success",
        title: "Update Meeting",
        description: "Meeting Updated Successfully!",
      })
    }
  }
  return <Switch checked={checked} onCheckedChange={onArchiveChange} />
}
export default ArchiveToggle
