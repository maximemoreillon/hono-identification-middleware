import { Next, Context } from "hono"
import { HTTPException } from "hono/http-exception"

declare module "hono" {
  interface ContextVariableMap {
    user: string
  }
}

type Options = {
  url: string
}

export const middleware = (opts: Options) => async (c: Context, next: Next) => {
  const { url } = opts

  const Authorization = c.req.header("Authorization")

  if (!Authorization)
    throw new HTTPException(401, { message: "Authorization header not set" })

  const headers = { Authorization }

  const response = await fetch(url, { headers })
  const user = await response.json()

  c.set("user", user)

  await next()
}
