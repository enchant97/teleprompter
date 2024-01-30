import { A } from "@solidjs/router";

export default function Wrapper(props) {
  return (
    <div class="max-h-screen flex flex-col p-2 gap-2">
      <div class="flex gap-2">
        <A class="btn" href="/">Home</A>
        <A class="btn" href="/setup">Setup</A>
        <A class="btn" href="/view">Viewer</A>
      </div>
      {props.children}
    </div>
  )
}
