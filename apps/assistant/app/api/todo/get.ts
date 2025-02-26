import { catchErrorMessage, trim } from "@zind/utils"
import { format, today, tomorrow } from "@zind/time"
import { supabase_client } from "@zind/sdk"
import { todos_table } from "./consts"

export async function GET(req: Request) {
  const supabase = supabase_client()

  const url = new URL(req.url)
  const user_id = trim(url.searchParams.get("user_id"))

  if (!user_id) {
    return new Response(JSON.stringify({ error: "user_id is required" }), {
      status: 400,
    })
  }

  try {
    const query = supabase
      .from(todos_table)
      .select("*")
      .eq("user_id", user_id)
      .eq("active", true)
      .or(
        `recurrence.eq.daily, and(start.gte.${format(today, "yyyy-mm-dd")}, start.lt.${format(tomorrow, "yyyy-mm-dd")})`
      )
      .order("start", { ascending: true })

    const { data, error } = await query
    if (error) throw error

    return new Response(JSON.stringify({ todos: data, error: null }), {
      status: 200,
    })
  } catch (error) {
    const message = catchErrorMessage(error)

    return new Response(JSON.stringify({ error: message, todos: null }), {
      status: 500,
    })
  }
}
