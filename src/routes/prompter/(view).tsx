import { For, Show, createSignal, onCleanup, onMount } from "solid-js"
import createSettingsStore from "~/core/settings"
import { RemoteCommand, RemoteCommandType } from "~/core/types";

function smartScroll(element: HTMLElement, amount: number): { currentScroll: number, end: boolean } {
  let currentScroll = element.scrollTop;
  if (element.scrollTop === (element.scrollHeight - element.offsetHeight)) {
    return { currentScroll, end: true }
  } else {
    element.scroll({ top: currentScroll + amount, behavior: "smooth" });
    return { currentScroll, end: false }
  }
}

export default function View() {
  let scriptContainer: HTMLDivElement

  const [settings] = createSettingsStore()
  const [viewerUID, setViewerUID] = createSignal<string>()

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
    let play = true;
    let currentScroll = 0;
    let speed = settings.scrollInterval;

    function autoScroll() {
      if (play == true) {
        let { currentScroll: newScroll, end } = smartScroll(scriptContainer, settings.scrollAmount)
        currentScroll = newScroll
        play = !end
      }
    }

    function advanceScroll() {
      let { currentScroll: newScroll, end } = smartScroll(scriptContainer, settings.advanceScrollAmount)
      currentScroll = newScroll
      if (end) { play = false }
    }

    function keyDownTextField(ev: KeyboardEvent) {
      switch (ev.key) {
        case "s":
          ev.preventDefault()
          play = !play
          return false
        case "a":
          ev.preventDefault()
          advanceScroll()
          return false
      }
    }

    if (isSecureContext) {
      let viewerUID = crypto.randomUUID()
      setViewerUID(viewerUID)
      let events = new EventSource(`/api/prompter/${viewerUID}/connect`)
      events.addEventListener("message", ({ data }) => {
        let remoteCommand: RemoteCommand = JSON.parse(data)
        if (remoteCommand.commandType === RemoteCommandType.TOGGLE_PLAY) {
          play = !play
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
