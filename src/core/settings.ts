import { createStore } from "solid-js/store"

const SETTINGS_PREFIX = "teleprompter__"

export type Settings = {
  script: string
  scrollInterval: number
  scrollAmount: number
  advanceScrollAmount: number
  backgroundColor: string
  textColor: string
  textSize: number
  maxWidth: number
  overlayTop: number
  overlayBottom: number
  connectCode?: string
}

function settingsOrDefault(s: Settings): Settings {
  return {
    script: s.script || "The quick brown fox jumped over the lazy hen...",
    scrollInterval: s.scrollInterval || 32,
    scrollAmount: s.scrollAmount || 1,
    advanceScrollAmount: s.advanceScrollAmount || 100,
    backgroundColor: s.backgroundColor || "#ffffff",
    textColor: s.textColor || "#000000",
    textSize: s.textSize || 3,
    maxWidth: s.maxWidth || 800,
    overlayTop: s.overlayTop || 30,
    overlayBottom: s.overlayBottom || 30,
    connectCode: s.connectCode
  }
}

function writeSettings(s: Settings) {
  let { script, ...settings } = s
  localStorage.setItem(`${SETTINGS_PREFIX}settings`, JSON.stringify(settings))
  localStorage.setItem(`${SETTINGS_PREFIX}script`, script)
}

function readSettings(): Settings {
  let settings = JSON.parse(localStorage.getItem(`${SETTINGS_PREFIX}settings`) || "{}")
  let script = localStorage.getItem(`${SETTINGS_PREFIX}script`)
  return settingsOrDefault({ script, ...settings })
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
