import createSettingsStore from "~/core/settings"

export default function Setup() {
  const [settings, setSettings, { save, clear, load }] = createSettingsStore()

  const clearSettings = () => {
    clear()
    load()
  }

  return (
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
        <span class="label-text">Overlay Height</span>
        <div class="flex gap-1 items-center">
          <input
            value={settings.overlayHeight}
            onInput={(ev) => setSettings({ overlayHeight: Number.parseInt(ev.currentTarget.value) })}
            class="input flex-1"
            type="number"
            min={0}
            required
          />
          <span>
            rem
          </span>
        </div>
      </label>
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
  )
}
