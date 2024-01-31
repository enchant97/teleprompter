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
