import { catchErrorMessage, trim } from "@zind/utils"
import { supabase_client } from "@zind/sdk"

import { todos_table } from "./consts"

export async function DELETE(req: Request) {
  const supabase = supabase_client()

  const url = new URL(req.url)
  const user_id = trim(url.searchParams.get("user_id") ?? "")
  const id = trim(url.searchParams.get("id") ?? "")

  if (!id || !user_id) {
    return new Response(
      JSON.stringify({ error: "todo id and user_id required" }),
      {
        status: 400,
      }
    )
  }

  try {
    const { error } = await supabase
      .from(todos_table)
      .delete()
      .eq("id", id)
      .eq("user_id", user_id)

    if (error) throw error

    return new Response(JSON.stringify({ error: null }), {
      status: 200,
    })
  } catch (error) {
    const message = catchErrorMessage(error)

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    })
  }
}
