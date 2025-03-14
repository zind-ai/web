import { openai_chat_role, openai_gpt_model, openai_client } from "@zind/sdk"
import { catchErrorMessage, trim } from "@zind/utils"

export async function POST(req: Request) {
  try {
    const { prompt: _prompt, context: _context, tools } = await req.json()

    const prompt = trim(_prompt)
    const context = trim(_context)

    if (!prompt || !context) {
      return new Response(
        JSON.stringify({ error: "prompt and context are required" }),
        {
          status: 400,
        }
      )
    }

    const openAI = openai_client()

    const response = await openAI.chat.completions.create({
      model: openai_gpt_model.gpt_4o_mini,
      messages: [
        {
          role: openai_chat_role.system,
          content: context,
        },
        { role: openai_chat_role.user, content: prompt },
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
