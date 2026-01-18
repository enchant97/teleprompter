import createSettingsStore from "~/core/settings"

export default function Setup() {
  const [settings, setSettings, { save }] = createSettingsStore()

  const clearScript = () => {
    setSettings({ script: "" })
    save()
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
        <span class="label-text">Script</span>
        <textarea
          onInput={(ev) => setSettings({ script: ev.currentTarget.value })}
          class="input"
          rows={15}
          required
        >{settings.script}</textarea>
      </label>
      <button class="btn primary" type="submit">Save</button>
      <button onClick={clearScript} class="btn error" type="button">Clear</button>
    </form>
  )
}
