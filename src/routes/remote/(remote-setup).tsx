import { useNavigate } from "@solidjs/router"
import { createSignal } from "solid-js"

export default function RemoteSetup() {
  const navigate = useNavigate()
  const [prompterUid, setPrompterUid] = createSignal("")

  return (
    <>
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
    </>
  )
}
