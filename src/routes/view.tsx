import { For, onCleanup, onMount } from "solid-js"
import createSettingsStore from "~/core/settings"

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

  const scriptLines = () => settings.script.split("\n\n")

  const scriptStyle = () => `
    color: ${settings.textColor};
    background-color: ${settings.backgroundColor};
    font-size: ${settings.textSize}rem;
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
      class="leading-relaxed py-32 px-4 overflow-y-scroll"
      style={scriptStyle()}
    >
      <For each={scriptLines()}>
        {line => <p class="mt-12 max-w-[50rem] mx-auto">{line}</p>}
      </For>
    </div>
  )
}
