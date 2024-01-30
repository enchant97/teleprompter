import createSettingsStore from "../core/settings"

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
