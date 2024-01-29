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
      <label>
        Script
        <textarea
          onInput={(ev) => setSettings({ script: ev.currentTarget.value })}
          required
        >{settings.script}</textarea>
      </label>
      <button type="submit">Save</button>
    </form>
  )
}
