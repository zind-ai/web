import { callAPI, catchErrorMessage, trim } from "@zind/utils"
import { gpt_endpoint_url } from "../../integrations/gpt/consts"
import { gpt_post_response } from "../../integrations/gpt/types"
import { gpt_embedding_endpoint_url } from "../../integrations/gpt/embedding/consts"
import { gpt_embedding_post_response } from "../../integrations/gpt/embedding/types"
import { zilliz_search_post_response } from "../../integrations/zilliz/search/types"
import { zilliz_search_endpoint_url } from "../../integrations/zilliz/search/consts"
import { search_memory_instructions } from "./consts"

export async function POST(req: Request) {
  try {
    const { user_id: _user_id, message: _message } = await req.json()

    const user_id = trim(_user_id)
    const message = trim(_message)

    if (!user_id || !message) {
      return new Response(
        JSON.stringify({ error: "user_id and message are required" }),
        {
          status: 400,
        }
      )
    }

    // 1. generate cue message
    let cue_message = null

    await callAPI({
      url: gpt_endpoint_url,
      method: "post",
      formData: {
        prompt: `user message: ${message}`,
        context: search_memory_instructions,
      },
      onSuccess: async (data: gpt_post_response) => {
        if (data.message) {
          cue_message = data.message
        }
      },
      onError: (error) => {
        throw new Error(`generate message cue: ${error.message}`)
      },
    })

    // 2. embed cue message
    let embedding = null

    if (cue_message) {
      await callAPI({
        url: gpt_embedding_endpoint_url,
        method: "post",
        formData: {
          text: cue_message,
        },
        onSuccess: async (data: gpt_embedding_post_response) => {
          if (data.embedding) {
            embedding = data.embedding
          }
        },
        onError: (error) => {
          throw new Error(`embed message cue: ${error.message}`)
        },
      })
    }

    // 3. query vector db
    let memories: zilliz_search_post_response["memories"] = []

    if (embedding) {
      await callAPI({
        url: zilliz_search_endpoint_url,
        method: "post",
        formData: {
          embedding: embedding,
        },
        onSuccess: async (data: zilliz_search_post_response) => {
          if (data.memories) {
            memories = data.memories
          }
        },
        onError: (error) => {
          throw new Error(`search vector db: ${error.message}`)
        },
      })
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
