import { useParams } from "@solidjs/router"

export default function Remote() {
  const params = useParams()

  const prompterUid = () => params.uid

  return (
    <div>
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
    </div>
  )
}
