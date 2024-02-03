import { useParams } from "@solidjs/router"

export default function Remote() {
  const params = useParams()

  const prompterUid = () => params.uid

  return (
    <div>
      <h1 class="text-4xl font-bold">Prompter Remote</h1>
      <p>Connected To: {prompterUid()}</p>
      <button
        onClick={async () => fetch(`/api/prompter/${prompterUid()}/remote/toggle-play`)}
        class="btn"
      >Toggle Pause</button>
    </div>
  )
}
