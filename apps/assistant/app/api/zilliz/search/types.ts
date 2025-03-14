import { memory } from "../../memory/types"

export interface zilliz_search_similar_memories {
  code: number
  cost: number
  data: memory[]
}

export interface zilliz_search_post_response {
  memories: memory[] | null
  error: string | null
}
