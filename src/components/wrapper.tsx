import { A, createAsync } from "@solidjs/router";
import { ParentProps } from "solid-js";
import { isRedisAvailable } from "~/core/redis";

export default function Wrapper(props: ParentProps) {
  const isRemoteAvailable = createAsync(isRedisAvailable)
  return (
    <div class="max-h-screen flex flex-col p-2 gap-2">
      <div class="flex gap-2 z-10">
        <A class="btn" href="/help">Help</A>
        {isRemoteAvailable() && <A class="btn" href="/remote">Remote</A>}
        <A class="btn" href="/prompter">Prompter</A>
        <A class="btn" href="/prompter/setup">Setup Prompter</A>
        <A class="btn" href="/prompter/script">Script</A>
      </div>
      {props.children}
    </div>
  )
}
