import { For, Show, createSignal, onCleanup, onMount } from "solid-js"
import createSettingsStore from "~/core/settings"
import { RemoteCommand, RemoteCommandType } from "~/core/types";

function smartScroll(element: HTMLElement, amount: number): { end: boolean } {
  let currentScroll = element.scrollTop;
  if (element.scrollTop === (element.scrollHeight - element.offsetHeight)) {
    return { end: true }
  } else {
    element.scroll({ top: currentScroll + amount, behavior: "smooth" });
    return { end: false }
  }
}

export default function View() {
  let scriptContainer: HTMLDivElement

  const [settings] = createSettingsStore()
  const [play, setPlay] = createSignal(false)

  const scriptLines = () => settings.script.split("\n\n")

  const scriptStyle = () => `
    color: ${settings.textColor};
    background-color: ${settings.backgroundColor};
    font-size: ${settings.textSize}rem;
  `

  const overlayStyle = () => `
    top: ${settings.overlayHeight}rem;
  `

  onMount(() => {
    let speed = settings.scrollInterval;

    function autoScroll() {
      if (play()) {
        let { end } = smartScroll(scriptContainer, settings.scrollAmount)
        setPlay(!end)
      }
    }

    function advanceScroll() {
      let { end } = smartScroll(scriptContainer, settings.advanceScrollAmount)
      if (end) { setPlay(false) }
    }

    function keyDownTextField(ev: KeyboardEvent) {
      switch (ev.key) {
        case "s":
          ev.preventDefault()
          setPlay(play => !play)
          return false
        case "a":
          ev.preventDefault()
          advanceScroll()
          return false
      }
    }

    if (settings.connectCode) {
      let events = new EventSource(`/api/prompter/${settings.connectCode}/connect`)
      events.addEventListener("message", ({ data }) => {
        let remoteCommand: RemoteCommand = JSON.parse(data)
        if (remoteCommand.commandType === RemoteCommandType.TOGGLE_PLAY) {
          setPlay(play => !play)
        }
      })
      onCleanup(() => events.close())
    }

    document.addEventListener("keydown", keyDownTextField, false)

    let scroller = setInterval(autoScroll, speed);

    onCleanup(() => {
      document.removeEventListener("keydown", keyDownTextField, false)
      clearInterval(scroller)
    })
  })

  return (
    <div
      ref={(el) => scriptContainer = el}
      class="leading-relaxed py-32 overflow-y-scroll"
      style={scriptStyle()}
    >
      <Show when={settings.overlayHeight !== 0}>
        <div class="fixed bg-[#0000009c] w-full h-[100vh]" style={overlayStyle()}></div>
      </Show>
      <For each={scriptLines()}>
        {line => <p class="mt-12 mx-auto" style={`max-width:${settings.maxWidth}px`}>{line}</p>}
      </For>
      <hr class="mb-[100vh]" />
      <button onClick={() => scriptContainer.scroll({ top: 0 })} class="btn w-full sticky z-10">To Top</button>
    </div >
  )
}
