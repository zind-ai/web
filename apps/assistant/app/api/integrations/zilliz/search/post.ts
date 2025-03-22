import { callAPI, catchErrorMessage } from "@zind/utils"
import {
  collection_name,
  db_name,
  zilliz_api_key,
  zilliz_api_url,
} from "../consts"
import { zilliz_search_similar_memories } from "./types"

export async function POST(req: Request) {
  try {
    const { embedding } = await req.json()

    if (!embedding) {
      return new Response(JSON.stringify({ error: "Embedding is required" }), {
        status: 400,
      })
    }

    let memories: zilliz_search_similar_memories["data"] | null = null

    if (zilliz_api_url && zilliz_api_key) {
      await callAPI({
        url: `${zilliz_api_url}/entities/search`,
        method: "post",
        headers: { Authorization: `Bearer ${zilliz_api_key}` },
        formData: {
          dbName: db_name,
          collectionName: collection_name,
          data: [embedding],
          annsField: "vector",
          limit: 3,
          outputFields: ["id", "memory", "source", "source_id", "created_at"],
        },

        onError: (error) => {
          throw new Error(error.message)
        },

        onSuccess: (data: zilliz_search_similar_memories) => {
          memories = data.data
        },
      })
    } else {
      throw new Error("Zilliz API url or key missing")
    }

    return new Response(JSON.stringify({ error: null, memories }), {
      status: 200,
    })
  } catch (error) {
    const message = catchErrorMessage(error)
    return new Response(JSON.stringify({ error: message, memories: null }), {
      status: 500,
    })
  }
}
