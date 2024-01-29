import { A } from "@solidjs/router";

export default function Wrapper(props) {
  return (
    <div class="max-h-screen flex flex-col gap-2">
      <div class="flex gap-2">
        <A href="/">Home</A>
        <A href="/setup">Setup</A>
        <A href="/view">Viewer</A>
      </div>
      {props.children}
    </div>
  )
}
