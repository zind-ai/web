import { callAPI, catchErrorMessage, trim } from "@zind/utils"
import { supabase_client, openai_chat_role } from "@zind/sdk"
import { gpt_endpoint_url } from "../gpt/consts"
import { gpt_post_response } from "../gpt/types"
import { formatMemories } from "./context/formatMemories"
import { memory_search_endpoint_url } from "../memory/search/consts"
import { memory_endpoint_url } from "../memory/consts"
import { memory } from "../memory/types"
import { formatChats } from "./context/formatChats"
import { assistant_instructions } from "./context/assistant"
import { chats_table } from "./consts"
import { chat } from "./types"

export async function POST(req: Request) {
  try {
    const cookies = req.headers.get("cookie")
    const { user_id: _user_id, message: _message, chats } = await req.json()

    const user_id = trim(_user_id)
    const message = trim(_message)

    if (!user_id || !message) {
      return new Response(
        JSON.stringify({ error: "user_id and message are required" }),
        { status: 400 }
      )
    }

    // 1. prepare context
    const recent_chats = formatChats(chats)

    // search memories
    let memories = undefined
    await callAPI({
      url: memory_search_endpoint_url,
      method: "post",
      headers: {
        cookie: cookies,
      },
      formData: {
        user_id: user_id,
        message: message,
      },
      onSuccess: async (data: { memories: memory[] }) => {
        if (data.memories) {
          memories = data.memories
        }
      },
      onError: (error) => {
        throw new Error(`memory search: ${error.message}`)
      },
    })

    const past_memories = formatMemories(memories)
    const context = `${assistant_instructions}\n\n${recent_chats}\n\n${past_memories}`

    // 2. talk to the assistant
    let assistant_response = {}

    await callAPI({
      url: gpt_endpoint_url,
      method: "post",
      headers: {
        cookie: cookies,
      },
      formData: {
        prompt: message,
        context: context,
      },
      onSuccess: async (data: gpt_post_response) => {
        assistant_response = {
          role: openai_chat_role.assistant,
          user_id: user_id,
          message: data.message,
        }
      },
      onError: (error) => {
        throw new Error(`assistant reply: ${error.message}`)
      },
    })

    // 3. save the chat
    if (assistant_response) {
      const supabase = supabase_client()
      const now = new Date()

      const { error, data: lastChats } = await supabase
        .from(chats_table)
        .insert([
          {
            role: openai_chat_role.user,
            user_id: user_id,
            message: message,
            created_at: now,
          },
          { ...assistant_response, created_at: new Date(now.getTime() + 1) },
        ])
        .select()

      if (error) throw error

      // 4. send back assistant's reply
      const assistant_chat = lastChats.find(
        (chat: chat) => chat.role === openai_chat_role.assistant
      )

      const response = new Response(
        JSON.stringify({
          chat: assistant_chat,
          memories: memories,
          error: null,
        }),
        {
          status: 200,
        }
      )

      // 5. save memory
      const user_chat = lastChats.find(
        (chat: chat) => chat.role === openai_chat_role.user
      )
      const memory_context = `${recent_chats}\n\n${past_memories}`

      await callAPI({
        url: memory_endpoint_url,
        method: "post",
        headers: {
          cookie: cookies,
        },
        formData: {
          user_id: user_id,
          message: message,
          context: memory_context,
          source: "chat",
          source_id: user_chat.id,
        },
        onError: (error) => {
          throw new Error(`save memory: ${error.message}`)
        },
      })

      // done
      return response
    } else {
      return new Response(
        JSON.stringify({
          chat: null,
          memories: null,
          error: "No assistant reply",
        }),
        {
          status: 502,
        }
      )
    }
  } catch (error) {
    const message = catchErrorMessage(error)

    return new Response(
      JSON.stringify({ chat: null, memories: null, error: message }),
      {
        status: 500,
      }
    )
  }
}
