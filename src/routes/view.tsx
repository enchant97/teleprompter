import { For, onCleanup, onMount } from "solid-js"
import createSettingsStore from "../core/settings"

export default function View() {
  let scriptContainer: HTMLDivElement

  const [settings] = createSettingsStore()

  const scriptLines = () => settings.script.split("\n\n")

  onMount(() => {
    let play = true;
    let currentScroll = 0;
    let speed = 32;

    function scroll() {
      if (play == true) {
        currentScroll = scriptContainer.scrollTop;
        if (scriptContainer.scrollTop === (scriptContainer.scrollHeight - scriptContainer.offsetHeight)) {
          play = false
        } else {
          scriptContainer.scroll({ top: currentScroll + 1 });
        }
      }
    }

    function keyDownTextField(ev: KeyboardEvent) {
      if (ev.key === "`") {
        ev.preventDefault();
        play = !play;
        return false;
      }
    }

    document.addEventListener("keydown", keyDownTextField, false)

    let scroller = setInterval(scroll, speed);

    onCleanup(() => {
      document.removeEventListener("keydown", keyDownTextField, false)
      clearInterval(scroller)
    })
  })

  return (
    <div
      ref={(el) => scriptContainer = el}
      class="text-5xl leading-relaxed py-32 px-2 overflow-y-scroll max-w-[50rem] mx-auto"
    >
      <For each={scriptLines()}>
        {line => <p class="mt-12">{line}</p>}
      </For>
    </div>
  )
}
