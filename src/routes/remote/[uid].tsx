import { Navigate, useParams } from "@solidjs/router"
import { createResource, Show } from "solid-js"
import { isRedisAvailable } from "~/core/redis"

export default function Remote() {
  const params = useParams()

  const prompterUid = () => params.uid
  const [isRemoteAvailable] = createResource(isRedisAvailable)

  return (
    <Show when={!isRemoteAvailable.loading} fallback={<></>}>
      <Show when={isRemoteAvailable()} fallback={<Navigate href={"/"} />}>
        <h1>Prompter Remote</h1>
        <p>Connect Code: {prompterUid()}</p>
        <button
          onClick={async () => fetch(`/api/prompter/${prompterUid()}/remote/toggle-play`, { method: "PUT" })}
          class="btn"
        >Toggle Pause</button>
        <button
          onClick={async () => fetch(`/api/prompter/${prompterUid()}/remote/to-top`, { method: "PUT" })}
          class="btn"
        >To Top</button>
      </Show>
    </Show>
  )
}
