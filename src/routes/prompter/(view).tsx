import { For, Show, createSignal, onCleanup, onMount } from "solid-js"
import { Portal } from "solid-js/web";
import Icon from "~/components/icon";
import { ShareModal } from "~/components/modals";
import createSettingsStore from "~/core/settings"
import { RemoteCommand, RemoteCommandType } from "~/core/types";

function smartScroll(element: HTMLElement, amount: number, reverse: boolean): { end: boolean } {
  let currentScroll = element.scrollTop;
  if (reverse) {
    amount = -amount;
  }
  if (
    (reverse && element.scrollTop === 0) ||
    (!reverse && element.scrollTop === (element.scrollHeight - element.offsetHeight))
  ) {
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
  const [shareModalOpen, setShareModalOpen] = createSignal(false)
  const [currentScroll, setCurrentScroll] = createSignal({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  })

  const scrollPercent = () => {
    const perc = Math.round((currentScroll().scrollTop / (currentScroll().scrollHeight - currentScroll().clientHeight)) * 100) || 0
    if (settings.mirror) {
      return 100 - perc
    }
    return perc
  }

  const scriptLines = () => settings.script.split("\n\n")

  const scriptStyle = () => `
    color: ${settings.textColor};
    background-color: ${settings.backgroundColor};
    font-size: ${settings.textSize}rem;
    text-align: ${settings.textAlignment};
  `

  function scrollToTop() {
    if (settings.mirror) {
      scriptContainer.scroll({ top: scriptContainer.scrollHeight })
    } else {
      scriptContainer.scroll({ top: 0 })
    }
  }

  onMount(() => {
    scrollToTop()

    let speed = settings.scrollInterval;

    function autoScroll() {
      if (play()) {
        let { end } = smartScroll(scriptContainer, settings.scrollAmount, settings.mirror)
        setPlay(!end)
      }
    }

    function advanceScroll() {
      let { end } = smartScroll(scriptContainer, settings.advanceScrollAmount, settings.mirror)
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
        } else if (remoteCommand.commandType === RemoteCommandType.TO_TOP) {
          scrollToTop()
        }
      })
      onCleanup(() => events.close())
    }

    function onScroll() {
      setCurrentScroll({
        scrollTop: scriptContainer.scrollTop,
        scrollHeight: scriptContainer.scrollHeight,
        clientHeight: scriptContainer.clientHeight,
      })
    }

    scriptContainer.addEventListener("scroll", onScroll)
    document.addEventListener("keydown", keyDownTextField, false)

    let scroller = setInterval(autoScroll, speed);

    onCleanup(() => {
      document.removeEventListener("keydown", keyDownTextField, false)
      scriptContainer.removeEventListener("scroll", onScroll)
      clearInterval(scroller)
    })
  })

  return (
    <>
      <Portal>
        <Show when={settings.connectCode} keyed>
          {connectCode => <ShareModal
            isOpen={shareModalOpen}
            onClose={() => setShareModalOpen(false)}
            connectCode={connectCode}
          />}
        </Show>
      </Portal>
      <div class="z-10 fixed bottom-0 right-0 flex w-full p-2">
        <div class="mr-auto p-2 flex items-center bg-neutral-900 text-neutral-200">{`${scrollPercent()}%`}</div>
        <div class="flex gap-1 items-center">
          <button onClick={() => scrollToTop()} class="btn">
            <Icon name="arrow-up" />
          </button>
          <label class="btn">
            <input
              type="checkbox"
              class="hidden"
              checked={play()}
              onChange={(ev) => setPlay(ev.currentTarget.checked)}
            />
            <Show when={play()} fallback={<Icon name="pause" />}>
              <Icon name="play" />
            </Show>
          </label>
          <Show when={settings.connectCode}>
            <button onClick={() => setShareModalOpen(true)} class="btn">
              <Icon name="cast" />
            </button>
          </Show>
        </div>
      </div>
      <div
        ref={(el) => scriptContainer = el}
        class="leading-relaxed overflow-y-scroll select-none"
        style={scriptStyle()}
      >
        <div>
          <div class="fixed bg-[#0000009c] w-full top-0" style={`height:${settings.overlayTop}vh`}></div>
          <div class="fixed bg-[#0000009c] w-full bottom-0" style={`height:${settings.overlayBottom}vh`}></div>
        </div>
        <hr class="mt-[90vh]" />
        <For each={scriptLines()}>
          {line => <p
            class="mt-12 mx-auto"
            classList={{ "transform-[scale(1,-1)]": settings.mirror }}
            style={`max-width:${settings.maxWidth}px`}
          >{line}</p>}
        </For>
        <hr class="mb-[90vh]" />
      </div>
    </>
  )
}
