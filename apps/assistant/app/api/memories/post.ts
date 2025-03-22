import { callAPI, catchErrorMessage, trim } from "@zind/utils"
import { format } from "@zind/time"
import { gpt_endpoint_url } from "../integrations/gpt/consts"
import { gpt_post_response } from "../integrations/gpt/types"
import { gpt_embedding_endpoint_url } from "../integrations/gpt/embedding/consts"
import { gpt_embedding_post_response } from "../integrations/gpt/embedding/types"
import { zilliz_post_payload } from "../integrations/zilliz/types"
import { zilliz_endpoint_url } from "../integrations/zilliz/consts"
import { add_memory_instructions } from "./consts"

export async function POST(req: Request) {
  try {
    const {
      user_id: _user_id,
      message: _message,
      context: _context,
      source: _source,
      source_id: _source_id,
    } = await req.json()

    const user_id = trim(_user_id)
    const message = trim(_message)
    const context = trim(_context)
    const source = trim(_source)
    const source_id = trim(_source_id)

    if (!user_id || !message || !context || !source || !source_id) {
      return new Response(
        JSON.stringify({
          error: "user_id, message, context, source, source_id are required",
        }),
        {
          status: 400,
        }
      )
    }

    // 1. generate the memory
    let summary = null

    await callAPI({
      url: gpt_endpoint_url,
      method: "post",
      formData: {
        prompt: message,
        context: `${add_memory_instructions} - ${context}`,
      },
      onSuccess: async (data: gpt_post_response) => {
        if (data.message && data.message.trim().toLowerCase() !== "none") {
          summary = data.message
        }
      },
      onError: (error) => {
        throw new Error(`generate memory: ${error.message}`)
      },
    })

    /* eslint-disable no-console */
    console.log(`\nMemory created => ${summary}\n`)

    // 2. generate embedding
    let embedding = null

    if (summary) {
      await callAPI({
        url: gpt_embedding_endpoint_url,
        method: "post",
        formData: {
          text: summary,
        },
        onSuccess: async (data: gpt_embedding_post_response) => {
          if (data.embedding) {
            embedding = data.embedding
          }
        },
        onError: (error) => {
          throw new Error(`generate embedding: ${error.message}`)
        },
      })
    }

    // 3. save memory
    if (summary && embedding) {
      const data: zilliz_post_payload = [
        {
          memory: summary,
          vector: embedding,
          source: source,
          source_id: source_id,
          user_id: user_id,
          created_at: Number(format(new Date(), "unix-seconds")),
        },
      ]
      await callAPI({
        url: zilliz_endpoint_url,
        method: "post",
        formData: {
          data: data,
        },
        onError: (error) => {
          throw new Error(`save memory: ${error.message}`)
        },
      })
    }

    return new Response(JSON.stringify({ error: null }), {
      status: 200,
    })
  } catch (error) {
    const message = catchErrorMessage(error)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    })
  }
}
