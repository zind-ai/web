import { supabase_client } from "@zind/sdk"
import { catchErrorMessage, trim } from "@zind/utils"
import { chats_table } from "./consts"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const user_id = trim(url.searchParams.get("user_id"))

    if (!user_id) {
      return new Response(JSON.stringify({ error: "user_id is required" }), {
        status: 400,
      })
    }

    const supabase = supabase_client()
    const query = supabase
      .from(chats_table)
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })
      .limit(10)

    const { data, error } = await query
    if (error) throw error

    return new Response(
      JSON.stringify({ chats: data.reverse(), error: null }),
      {
        status: 200,
      }
    )
  } catch (error) {
    const message = catchErrorMessage(error)

    return new Response(JSON.stringify({ error: message, chats: null }), {
      status: 500,
    })
  }
}
