import { callAPI, catchErrorMessage, trim } from "@zind/utils"
import { supabase_client, openai_chat_role } from "@zind/sdk"
import { getRecentChats } from "./context/getRecentChats"
import { assistant_instructions } from "./context/assistant"
import { chats_table } from "./consts"
import { chat } from "./types"
import { post_response } from "../gpt/types"
import { endpoint_url } from "../gpt/consts"
import { saveMemory } from "./context/saveMemory"
import { retrieveMemories } from "./context/retrieveMemories"

export async function POST(req: Request) {
  const supabase = supabase_client()

  const { user_id: _user_id, message: _message, chats } = await req.json()

  const user_id = trim(_user_id)
  const message = trim(_message)

  if (!user_id || !message) {
    return new Response(
      JSON.stringify({ error: "user_id and message are required" }),
      { status: 400 }
    )
  }

  try {
    let assistant_response = {}

    // 1. prepare context
    const recent_chats = getRecentChats(chats)
    const past_memories = (await retrieveMemories(message)) ?? ""
    const context = `${assistant_instructions}\n\n${recent_chats}\n\n${past_memories}`

    // 2. talk to the assistant
    await callAPI({
      url: endpoint_url,
      method: "post",
      formData: {
        prompt: message,
        context: context,
      },
      onSuccess: async (data: post_response) => {
        assistant_response = {
          role: openai_chat_role.assistant,
          user_id: user_id,
          message: data.message,
        }
      },
      onError: (error) => {
        throw new Error(error.message)
      },
    })

    // 3. save the chat
    if (assistant_response) {
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
          memories: past_memories,
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
      saveMemory(memory_context, message, user_chat.id)

      // done
      return response
    } else {
      return new Response(
        JSON.stringify({
          chat: null,
          memories: null,
          error: "No assistant response",
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
