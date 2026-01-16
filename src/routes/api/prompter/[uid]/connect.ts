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

  const closeSignal = new AbortController()
  const requestSignal = ev.request.signal

  return new Response(
    new ReadableStream({
      start(controller) {
        const ping = setInterval(() => {
          controller.enqueue(": ping\n\n")
        }, 5_000)
        subscribeForCommands(clientUid, (command: RemoteCommand) => {
          controller.enqueue(`data: ${JSON.stringify(command)}\n\n`)
        }, closeSignal.signal)
        requestSignal.onabort = () => {
          closeSignal.abort()
          controller.close()
        };
        closeSignal.signal.addEventListener("abort", () => {
          clearInterval(ping)
        })
      },
      cancel() {
        closeSignal.abort()
      }
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      }
    }
  );
}
