import { callAPI } from "@zind/utils"
import { format } from "@zind/time"
import { endpoint_url } from "../../gpt/consts"
import { post_response } from "../../gpt/types"
import { endpoint_url as embedding_endpoint_url } from "../../gpt/embedding/consts"
import { post_response as embedding_post_response } from "../../gpt/embedding/types"
import { endpoint_url as vdb_search_endpoint_url } from "../../vdb/search/consts"
import { post_response as vdb_search_post_response } from "../../vdb/search/types"

const instructions =
  "Generate a cue message from user's message to retrieve relevant memories for better context. e.g. 1- memory: Faz's favorite color is gray. cue message: Faz favorite color 2- memory: Faz enjoys cooking healthy dishes, often using ingredients like aubergine, sweet potato, garlic, tomatoes, and spices. cue message: Faz cooking healthy dishes 3- memory: Faz was born on March 14th, 1992. cue message: Faz birthday age"

export const retrieveMemories = async (user_message: string) => {
  if (!user_message) return null

  // 1. generate cue message
  let cue_message = null

  await callAPI({
    url: endpoint_url,
    method: "post",
    formData: {
      prompt: `user message: ${user_message}`,
      context: instructions,
    },
    onSuccess: async (data: post_response) => {
      if (data.message) {
        cue_message = data.message
      }
    },
    onError: (error) => {
      console.error(`retrieveMemories: ${error.message}`)
    },
  })

  // 2. embed cue message
  let embedding = null

  if (cue_message) {
    await callAPI({
      url: embedding_endpoint_url,
      method: "post",
      formData: {
        text: cue_message,
      },
      onSuccess: async (data: embedding_post_response) => {
        if (data.embedding) {
          embedding = data.embedding
        }
      },
      onError: (error) => {
        console.error(`retrieveMemories: ${error.message}`)
      },
    })
  }

  // 3. query vdb
  let memories: vdb_search_post_response["memories"] = []

  if (embedding) {
    await callAPI({
      url: vdb_search_endpoint_url,
      method: "post",
      formData: {
        embedding: embedding,
      },
      onSuccess: async (data: vdb_search_post_response) => {
        if (data.memories) {
          memories = data.memories
        }
      },
      onError: (error) => {
        console.error(`retrieveMemories: ${error.message}`)
      },
    })
  }

  // 4. return memories
  if (memories.length) {
    const pastMemories = memories
      .map(
        (memory) =>
          `${format(memory.created_at, "MMM ddth, yyyy hh:mm")}: ${memory.memory}`
      )
      .join("\n")

    return `Past memories:\n${pastMemories}`
  }

  return null
}
