import { supabase_client } from "@zind/sdk"
import { catchErrorMessage, trim } from "@zind/utils"
import { user_table } from "./consts"

export async function PATCH(req: Request) {
  try {
    const { id: _id, name: _name } = await req.json()

    const id = trim(_id)
    const name = trim(_name)

    if (!id) {
      return new Response(JSON.stringify({ error: "id is required" }), {
        status: 400,
      })
    }

    const updateData: Record<string, string> = {}
    if (name !== undefined) updateData.name = name

    if (Object.keys(updateData).length === 0) {
      return new Response(
        JSON.stringify({
          error: "Updating user failed",
        }),
        { status: 400 }
      )
    }

    const supabase = supabase_client()
    const query = supabase.from(user_table).update(updateData).eq("id", id)

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
