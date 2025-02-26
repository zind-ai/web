import { supabase_client } from "@/library/client/supabase"
import { catchErrorMessage } from "@/library/utils/api"
import { trim } from "@/library/utils/string"
import { todos_table } from "./consts"

export async function POST(req: Request) {
  try {
    const {
      name: _name,
      description: _description,
      start,
      user_id: _user_id,
      recurrence: _recurrence,
    } = await req.json()

    const name = trim(_name)
    const description = trim(_description)
    const recurrence = trim(_recurrence)
    const user_id = trim(_user_id)

    if (!name || !user_id || !start) {
      return new Response(
        JSON.stringify({
          error: "user_id, name and description fields required",
        }),
        { status: 400 }
      )
    }

    const supabase = supabase_client()
    const query = supabase.from(todos_table).insert([
      {
        name: name,
        description: description,
        start: start,
        recurrence: recurrence,
        user_id: user_id,
      },
    ])

    const { error } = await query
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
