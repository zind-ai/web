import { supabase_client } from "@zind/sdk"
import { catchErrorMessage, trim } from "@zind/utils"
import { assistant_table } from "./consts"

export async function PATCH(req: Request) {
  try {
    const {
      id: _id,
      name: _name,
      instructions: _instructions,
    } = await req.json()

    const id = trim(_id)
    const name = trim(_name)
    const instructions = trim(_instructions)

    if (!id || !name || !instructions) {
      return new Response(
        JSON.stringify({
          error: "id, name and instructions are required",
        }),
        { status: 400 }
      )
    }

    const supabase = supabase_client()
    const query = supabase
      .from(assistant_table)
      .update({ name, instructions })
      .eq("id", id)

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
