import { Memory } from "../../memories/types"

export interface zilliz_search_similar_memories {
  code: number
  cost: number
  data: Memory[]
}

export interface zilliz_search_post_response {
  memories: Memory[] | null
  error: string | null
}
