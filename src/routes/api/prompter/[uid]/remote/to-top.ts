import { type APIEvent } from "@solidjs/start/server";
import { hasSubscibers, isRedisAvailable, publishCommand } from "~/core/redis";
import { RemoteCommandType } from "~/core/types";

export async function PUT(ev: APIEvent) {
  "use server";
  let clientUid = ev.params.uid

  if (!await isRedisAvailable()) {
    return new Response("403, Remote Functionality Disabled By Administrator", { status: 403 })
  }

  if (await hasSubscibers(clientUid)) {
    await publishCommand(clientUid, {
      commandType: RemoteCommandType.TO_TOP,
    })
    return new Response(null, { status: 204 })
  }
  return new Response(null, { status: 404 })
}
