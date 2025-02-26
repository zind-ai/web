import { chat_role, gpt_model, openai_client } from "@/library/client/openai"
import { catchErrorMessage } from "@/library/utils/api"
import { trim } from "@/library/utils/string"

export async function POST(req: Request) {
  try {
    const { prompt: _prompt, context: _context, tools } = await req.json()

    const prompt = trim(_prompt)
    const context = trim(_context)

    if (!prompt || !context) {
      return new Response(
        JSON.stringify({ error: "No prompt or context provided" }),
        {
          status: 400,
        }
      )
    }

    const openAI = openai_client()

    const response = await openAI.chat.completions.create({
      model: gpt_model.gpt_4o_mini,
      messages: [
        {
          role: chat_role.system,
          content: context,
        },
        { role: chat_role.user, content: prompt },
      ],
      // max_completion_tokens: 150,

      tools: tools,
    })

    const message = response.choices[0].message.content

    return new Response(JSON.stringify({ error: null, message }), {
      status: 200,
    })
  } catch (error) {
    const message = catchErrorMessage(error)
    return new Response(JSON.stringify({ error: message, message: null }), {
      status: 500,
    })
  }
}
