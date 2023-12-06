type Image = {
  thumbnail?: {
    contentUrl: string
  }
}

export interface NewsFeed {
  // item: {
    id?: number
    name: string

    image: Image
    provider: {
      name: string
      image: Image
    }[]
    url: string
    likes: number
    mentions?: {
      name: string
    }[]
    bgColor: string
    tagBgColor: string
    description: string
    datePublished: string
  // }
}

export type NewsCategories = "stocks" | "business" | "crypto" | "economy"
