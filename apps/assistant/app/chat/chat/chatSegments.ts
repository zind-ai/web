export type chatSegments = {
  type: "text" | "code"
  content: string
}[]

export const chatSegments = (message: string) => {
  const lines = message.split("\n")

  const segments: chatSegments = []
  let inCodeBlock = false
  let currentCodeBlock = ""

  lines.forEach((line) => {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock
      if (!inCodeBlock && currentCodeBlock) {
        segments.push({
          type: "code",
          content: currentCodeBlock,
        })
        currentCodeBlock = ""
      }
    } else if (inCodeBlock) {
      currentCodeBlock += `${line}\n`
    } else if (line.trim() !== "") {
      segments.push({ type: "text", content: line })
    }
  })

  return segments
}
