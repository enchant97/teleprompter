import { Navigate, useNavigate } from "@solidjs/router"
import { createResource, createSignal, Show } from "solid-js"
import { isRedisAvailable } from "~/core/redis"

export default function RemoteSetup() {
  const navigate = useNavigate()
  const [prompterUid, setPrompterUid] = createSignal("")
  const [isRemoteAvailable] = createResource(isRedisAvailable)

  return (
    <Show when={!isRemoteAvailable.loading} fallback={<></>}>
      <Show when={isRemoteAvailable()} fallback={<Navigate href={"/"} />}>
        <h1>Remote Setup</h1>
        <form
          onSubmit={(ev) => {
            ev.preventDefault()
            navigate(`/remote/${prompterUid()}`)
          }}
          class="flex flex-col gap-2"
        >
          <label class="form-control">
            <span class="label-text">Connect Code</span>
            <input
              value={prompterUid()}
              onInput={(ev) => setPrompterUid(ev.currentTarget.value)}
              class="input"
              type="text"
              required
            />
          </label>
          <button class="btn primary" type="submit">Connect</button>
        </form>
      </Show>
    </Show>
  )
}
