import { type APIEvent } from "@solidjs/start/server";
import { subscribeForCommands } from "~/core/redis";
import { RemoteCommand } from "~/core/types";

const UUID_LOWER_RE = /^[0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12}$/

export async function GET(ev: APIEvent) {
  "use server";
  let clientUid = ev.params.uid

  if (!UUID_LOWER_RE.test(clientUid)) {
    return new Response("400, Invalid Client Uid", { status: 400 })
  }

  ev.nativeEvent.node.res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  })

  let c = new AbortController()

  let ping = setInterval(() => {
    ev.nativeEvent.node.res.write(': ping\n\n')
  }, 5 * 1000)

  c.signal.addEventListener("abort", () => {
    clearInterval(ping)
    ev.nativeEvent.node.res.destroy()
  })

  subscribeForCommands(clientUid, (command: RemoteCommand) => {
    ev.nativeEvent.node.res.write(`data: ${JSON.stringify(command)}\n\n`)
  }, c.signal)

  ev.nativeEvent.node.req.once("close", () => c.abort())
}
