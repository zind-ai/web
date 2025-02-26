import OpenAI from "openai"

let instance: OpenAI

export const openai_client = () => {
  if (!instance) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY")
    }

    instance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  return instance
}
