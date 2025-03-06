import { type APIEvent } from "@solidjs/start/server";
import { hasSubscibers, publishCommand } from "~/core/redis";
import { RemoteCommandType } from "~/core/types";

export async function PUT(ev: APIEvent) {
  "use server";
  let clientUid = ev.params.uid
  if (await hasSubscibers(clientUid)) {
    await publishCommand(clientUid, {
      commandType: RemoteCommandType.TO_TOP,
    })
    return new Response(null, { status: 204 })
  }
  return new Response(null, { status: 404 })
}
