export const add_memory_instructions =
  "Extract any useful information about Faz's likes, dislikes, interests, preferences, work, lifestyle, habits, mindset, family, friends etc from the following conversation. Examples of useful information: 1- Faz was born in March 14th 1992. 2- Faz likes to eat healthy and regularly exercise. 3- Faz wants to start a tech startup, Zind. keep the summary short; 1-30 words. Do not capture redundant information already in Past memories. If there is not any important information to extract, reply just with one word: none"

export const memories_endpoint_url = `${process.env.NEXT_PUBLIC_URL}/api/memories`
