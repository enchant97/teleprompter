import { type APIEvent } from "@solidjs/start/server";
import { subscribeForCommands } from "~/core/redis";
import { RemoteCommand } from "~/core/types";

export async function GET(ev: APIEvent) {
  let clientUid = ev.params.uid
  ev.node.res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  })

  let ping = setInterval(() => {
    ev.node.res.write(': ping\n\n')
  }, 5 * 1000)

  let c = new AbortController()

  subscribeForCommands(clientUid, (command: RemoteCommand) => {
    ev.node.res.write(`data: ${JSON.stringify(command)}\n\n`)
  }, c.signal)

  ev.node.res.on("close", () => {
    c.abort()
    clearInterval(ping)
  })
}
