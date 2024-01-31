import createSettingsStore from "~/core/settings"

export default function Setup() {
  const [settings, setSettings, { save }] = createSettingsStore()


  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault()
        save()
      }}
      class="flex flex-col gap-2"
    >
      <label class="form-control">
        <span class="label-text">Scroll Interval</span>
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
        <span class="label-text">Scroll Amount</span>
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
        <span class="label-text">Script</span>
        <textarea
          onInput={(ev) => setSettings({ script: ev.currentTarget.value })}
          class="input"
          rows={10}
          required
        >{settings.script}</textarea>
      </label>
      <button class="btn primary" type="submit">Save</button>
    </form>
  )
}
