import { type APIEvent } from "@solidjs/start/server";
import { hasSubscibers, publishCommand } from "~/core/redis";
import { RemoteCommandType } from "~/core/types";

export async function GET(ev: APIEvent) {
  let clientUid = ev.params.uid
  if (await hasSubscibers(clientUid)) {
    await publishCommand(clientUid, {
      commandType: RemoteCommandType.TOGGLE_PLAY,
    })
    return new Response(null, { status: 204 })
  }
  return new Response(null, { status: 404 })
}
