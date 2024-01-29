import { createStore } from "solid-js/store"

const SETTINGS_PREFIX = "teleprompter__"

export type Settings = {
  script: string
}

function writeSettings(settings: Settings) {
  localStorage.setItem(`${SETTINGS_PREFIX}script`, settings.script)
}

function readSettings(): Settings {
  return {
    script: localStorage.getItem(`${SETTINGS_PREFIX}script`) || "The quick brown fox jumped over the lazy hen...",
  }
}

export default function createSettingsStore() {
  const [settings, setSettings] = createStore(readSettings())
  function load() {
    setSettings(readSettings())
  }
  function save() {
    writeSettings(settings)
  }
  return [settings, setSettings, { load, save }] as const
}
