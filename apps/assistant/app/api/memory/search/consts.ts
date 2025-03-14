export const search_memory_instructions =
  "Generate a cue message from user's message to retrieve relevant memories for better context. e.g. 1- memory: Faz's favorite color is gray. cue message: Faz favorite color 2- memory: Faz enjoys cooking healthy dishes, often using ingredients like aubergine, sweet potato, garlic, tomatoes, and spices. cue message: Faz cooking healthy dishes 3- memory: Faz was born on March 14th, 1992. cue message: Faz birthday age"

export const memory_search_endpoint_url = `${process.env.NEXT_PUBLIC_URL}/api/memory/search`
