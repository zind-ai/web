import { user_id } from "@/app/global/login/user"
import { format } from "@/library/time"
import { callAPI } from "@/library/utils/api"
import { endpoint_url } from "../../gpt/consts"
import { post_response } from "../../gpt/types"
import { endpoint_url as embedding_endpoint_url } from "../../gpt/embedding/consts"
import { post_response as embedding_post_response } from "../../gpt/embedding/types"
import { endpoint_url as vdb_endpoint_url } from "../../vdb/consts"
import { post_payload } from "../../vdb/types"

const instructions =
  "Extract any useful information about Faz's likes, dislikes, interests, preferences, work, lifestyle, habits, mindset, family, friends etc from the following conversation. Examples of useful information: 1- Faz was born in March 14th 1992. 2- Faz likes to eat healthy and regularly exercise. 3- Faz wants to start a tech startup, Zind. keep the summary short; 1-30 words. Do not capture redundant information already in Past memories. If there is not any important information to extract, reply just with one word: none"

export const saveMemory = async (
  context: string,
  message: string,
  chat_id: string
) => {
  if (!(message && chat_id && context)) return

  // 1. generate the memory
  let summary = null

  await callAPI({
    url: endpoint_url,
    method: "post",
    formData: {
      prompt: message,
      context: `${instructions} - ${context}`,
    },
    onSuccess: async (data: post_response) => {
      if (data.message && data.message.trim().toLowerCase() !== "none") {
        summary = data.message
      }
    },
    onError: (error) => {
      console.error(`saveMemory: ${error.message}`)
    },
  })

  /* eslint-disable no-console */
  console.log(`\nNew memory => ${summary}\n`)

  // 2. generate embedding
  let embedding = null

  if (summary) {
    await callAPI({
      url: embedding_endpoint_url,
      method: "post",
      formData: {
        text: summary,
      },
      onSuccess: async (data: embedding_post_response) => {
        if (data.embedding) {
          embedding = data.embedding
        }
      },
      onError: (error) => {
        console.error(`saveMemory: ${error.message}`)
      },
    })
  }

  // 3. save memory
  if (summary && embedding) {
    const data: post_payload = [
      {
        memory: summary,
        vector: embedding,
        source: "chat",
        source_id: chat_id,
        user_id: user_id,
        created_at: Number(format(new Date(), "unix-seconds")),
      },
    ]
    await callAPI({
      url: vdb_endpoint_url,
      method: "post",
      formData: {
        data: data,
      },
      onError: (error) => {
        console.error(`saveMemory: ${error.message}`)
      },
    })
  }
}
