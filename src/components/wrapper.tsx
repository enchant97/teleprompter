import { A } from "@solidjs/router";
import { ParentProps } from "solid-js";

export default function Wrapper(props: ParentProps) {
  return (
    <div class="max-h-screen flex flex-col p-2 gap-2">
      <div class="flex gap-2 z-10">
        <A class="btn" href="/remote">Remote</A>
        <A class="btn" href="/prompter">Prompter</A>
        <A class="btn" href="/prompter/setup">Setup Prompter</A>
      </div>
      {props.children}
    </div>
  )
}
