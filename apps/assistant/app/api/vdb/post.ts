import { callAPI, catchErrorMessage } from "@zind/utils"
import {
  collection_name,
  db_name,
  zilliz_api_key,
  zilliz_api_url,
} from "./consts"

export async function POST(req: Request) {
  try {
    const { data } = await req.json()

    if (!data) {
      return new Response(JSON.stringify({ error: "No data provided" }), {
        status: 400,
      })
    }

    if (zilliz_api_url && zilliz_api_key) {
      await callAPI({
        url: `${zilliz_api_url}/entities/insert`,
        method: "post",
        token: zilliz_api_key,
        formData: {
          dbName: db_name,
          collectionName: collection_name,
          data: data,
        },

        onError: (error) => {
          throw new Error(error.message)
        },
      })
    } else {
      throw new Error("Zilliz API URL or Key missing")
    }

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
