import { createStore } from "solid-js/store"

const SETTINGS_PREFIX = "teleprompter__"

export type Settings = {
  script: string
  scrollInterval: number
  scrollAmount: number
}

function writeSettings(settings: Settings) {
  localStorage.setItem(`${SETTINGS_PREFIX}script`, settings.script)
  localStorage.setItem(`${SETTINGS_PREFIX}scrollInterval`, `${settings.scrollInterval}`)
  localStorage.setItem(`${SETTINGS_PREFIX}scrollAmount`, `${settings.scrollAmount}`)
}

function readSettings(): Settings {
  return {
    script: localStorage.getItem(`${SETTINGS_PREFIX}script`) || "The quick brown fox jumped over the lazy hen...",
    scrollInterval: Number.parseInt(localStorage.getItem(`${SETTINGS_PREFIX}scrollInterval`) || "32"),
    scrollAmount: Number.parseInt(localStorage.getItem(`${SETTINGS_PREFIX}scrollAmount`) || "1")
  }
}

function clearSettings() {
  localStorage.clear()
}

export default function createSettingsStore() {
  const [settings, setSettings] = createStore(readSettings())
  function load() {
    setSettings(readSettings())
  }
  function save() {
    writeSettings(settings)
  }
  return [settings, setSettings, { load, save, clear: clearSettings }] as const
}
