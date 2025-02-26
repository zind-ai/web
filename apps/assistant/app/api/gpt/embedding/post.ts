import { embedding_model, openai_client } from "@/library/client/openai"
import { catchErrorMessage } from "@/library/utils/api"
import { trim } from "@/library/utils/string"

export async function POST(req: Request) {
  try {
    const { text: _text } = await req.json()

    const text = trim(_text)

    if (!text) {
      return new Response(JSON.stringify({ error: "No text provided" }), {
        status: 400,
      })
    }

    const openAI = openai_client()

    const response = await openAI.embeddings.create({
      model: embedding_model.text_embedding_3_small,
      input: text,
      encoding_format: "float",
      dimensions: 512,
    })

    const embedding = response.data[0].embedding

    return new Response(JSON.stringify({ error: null, embedding }), {
      status: 200,
    })
  } catch (error) {
    const message = catchErrorMessage(error)
    return new Response(JSON.stringify({ error: message, embedding: null }), {
      status: 500,
    })
  }
}
