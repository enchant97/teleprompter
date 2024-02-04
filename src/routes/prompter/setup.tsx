import { Show, createEffect } from "solid-js"
import { Portal } from "solid-js/web"
import createSettingsStore from "~/core/settings"
import QRCode from "qrcode"

export default function Setup() {
  let shareCodeModal: HTMLDialogElement
  let shareCodeQrCode: HTMLCanvasElement
  const [settings, setSettings, { save, clear, load }] = createSettingsStore()

  const remoteUrl = () => {
    if (settings.connectCode) {
      return `${window.location.origin}/remote/${settings.connectCode}`
    }
  }

  const clearSettings = () => {
    clear()
    load()
  }

  createEffect(() => {
    let contents = remoteUrl()
    if (contents) {
      QRCode.toCanvas(shareCodeQrCode, contents)
    }
  })

  return (
    <>
      <Portal>
        <dialog class="modal" ref={(el) => shareCodeModal = el}>
          <div class="flex flex-col items-center gap-2">
            <h2 class="text-lg font-bold">Connect Code</h2>
            <code>{settings.connectCode || ""}</code>
            <h2 class="text-lg font-bold">Connect URL</h2>
            <a class="underline" target="_blank" href={remoteUrl()}>{remoteUrl()}</a>
            <canvas ref={(el) => shareCodeQrCode = el} />
            <button onClick={() => shareCodeModal.close()} class="btn mt-4">Close</button>
          </div>
        </dialog>
      </Portal>
      <form
        onSubmit={(ev) => {
          ev.preventDefault()
          save()
        }}
        class="flex flex-col gap-2"
      >
        <button onClick={() => {
          let a = window.document.createElement("a")
          a.href = URL.createObjectURL(new Blob(
            [JSON.stringify(settings)],
            { type: "application/json" },
          ))
          a.download = "script.json"
          a.click()
        }} class="btn">Download (JSON)</button>
        <button onClick={() => {
          let input = window.document.createElement("input")
          input.type = "file"
          input.accept = "application/json"
          input.addEventListener("change", async () => {
            if (input.files?.length === 1) {
              let file = input.files[0]
              setSettings(JSON.parse(await file.text()))
              save()
            }
          })
          input.click()
        }} class="btn">Upload (JSON)</button>
        <label class="form-control">
          <span class="label-text">Auto Scroll Interval</span>
          <div class="flex gap-1 items-center">
            <input
              value={settings.scrollInterval}
              onInput={(ev) => setSettings({ scrollInterval: Number.parseInt(ev.currentTarget.value) })}
              class="input flex-1"
              type="number"
              min={1}
              required
            />
            <span>
              ms
            </span>
          </div>
        </label>
        <label class="form-control">
          <span class="label-text">Auto Scroll Amount</span>
          <input
            value={settings.scrollAmount}
            onInput={(ev) => setSettings({ scrollAmount: Number.parseInt(ev.currentTarget.value) })}
            class="input"
            type="number"
            min={1}
            required
          />
        </label>
        <label class="form-control">
          <span class="label-text">Advance Scroll Amount</span>
          <input
            value={settings.advanceScrollAmount}
            onInput={(ev) => setSettings({ advanceScrollAmount: Number.parseInt(ev.currentTarget.value) })}
            class="input"
            type="number"
            min={1}
            required
          />
        </label>
        <label class="form-control">
          <span class="label-text">Background Color</span>
          <input
            value={settings.backgroundColor}
            onInput={(ev) => setSettings({ backgroundColor: ev.currentTarget.value })}
            class="input-color"
            type="color"
            required
          />
        </label>
        <label class="form-control">
          <span class="label-text">Text Color</span>
          <input
            value={settings.textColor}
            onInput={(ev) => setSettings({ textColor: ev.currentTarget.value })}
            class="input-color"
            type="color"
            required
          />
        </label>
        <label class="form-control">
          <span class="label-text">Text Size</span>
          <div class="flex gap-1 items-center">
            <input
              value={settings.textSize}
              onInput={(ev) => setSettings({ textSize: Number.parseInt(ev.currentTarget.value) })}
              class="input flex-1"
              type="range"
              min={1}
              max={20}
              step={1}
              required
            />
            <span>{settings.textSize}rem</span>
          </div>
        </label>
        <label class="form-control">
          <span class="label-text">Max Width</span>
          <div class="flex gap-1 items-center">
            <input
              value={settings.maxWidth}
              onInput={(ev) => setSettings({ maxWidth: Number.parseInt(ev.currentTarget.value) })}
              class="input flex-1"
              type="number"
              min={1}
              required
            />
            <span>
              px
            </span>
          </div>
        </label>
        <label class="form-control">
          <span class="label-text">Overlay Top</span>
          <div class="flex gap-1 items-center">
            <input
              value={settings.overlayTop}
              onInput={(ev) => setSettings({ overlayTop: Number.parseInt(ev.currentTarget.value) })}
              class="input flex-1"
              type="range"
              min={0}
              max={100}
              step={1}
              required
            />
            <span>{settings.overlayTop}%</span>
          </div>
        </label>
        <label class="form-control">
          <span class="label-text">Overlay Bottom</span>
          <div class="flex gap-1 items-center">
            <input
              value={settings.overlayBottom}
              onInput={(ev) => setSettings({ overlayBottom: Number.parseInt(ev.currentTarget.value) })}
              class="input flex-1"
              type="range"
              min={0}
              max={100}
              step={1}
              required
            />
            <span>{settings.overlayBottom}%</span>
          </div>
        </label>
        <div class="form-control">
          <span class="label-text">Connect Code (For Remotes)</span>
          <div class="flex gap-1 items-center">
            <code class="flex-1">{settings.connectCode || "__DISABLED__"}</code>
            <Show when={settings.connectCode} fallback={
              <Show when={isSecureContext}>
                <button
                  onClick={() => setSettings({ connectCode: crypto.randomUUID() })}
                  class="btn"
                >
                  Generate
                </button>
              </Show>
            }>
              <button
                onClick={() => shareCodeModal.showModal()}
                class="btn"
              >
                Share
              </button>
              <button
                onClick={() => setSettings({ connectCode: undefined })}
                class="btn error"
              >
                Disable
              </button>
            </Show>
          </div>
        </div>
        <label class="form-control">
          <span class="label-text">Script</span>
          <textarea
            onInput={(ev) => setSettings({ script: ev.currentTarget.value })}
            class="input"
            rows={10}
            required
          >{settings.script}</textarea>
        </label>
        <button class="btn primary" type="submit">Save</button>
        <button onClick={clearSettings} class="btn error" type="button">Clear</button>
      </form>
    </>
  )
}
