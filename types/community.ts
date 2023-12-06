interface Counts {
  id: number
  community_id: number
  subscribers: number
  posts: number
  comments: number
  published: string
  users_active_day: number
  users_active_week: number
  users_active_month: number
  users_active_half_year: number
  hot_rank: number
}

interface Community {
  id: number
  name: string
  title: string
  description: string
  removed: boolean
  published: string
  deleted: boolean
  nsfw: boolean
  actor_id: string
  local: boolean
  icon: string
  hidden: boolean
  posting_restricted_to_mods: boolean
  instance_id: number
}

export interface CommunityData {
  community: Community
  subscribed: communitySubscribeEvents
  blocked: boolean
  counts: Counts
}

export enum communitySubscribeEvents {
  Subscribed = "Subscribed",
  NotSubscribed = "NotSubscribed",
}
