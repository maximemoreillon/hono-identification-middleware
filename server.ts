import { Hono } from "hono"
import { middleware } from "."
const app = new Hono()

const { IDENTIFICATION_URL } = process.env

if (!IDENTIFICATION_URL) throw "IDENTIFICATION_URL not set"

const opts = { url: IDENTIFICATION_URL }
app.use(middleware(opts))

app.get("/", (c) => {
  const user = c.get("user")
  return c.json(user)
})

export default app
