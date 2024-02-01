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
  overlayHeight: number
}

function writeSettings(settings: Settings) {
  localStorage.setItem(`${SETTINGS_PREFIX}script`, settings.script)
  localStorage.setItem(`${SETTINGS_PREFIX}scrollInterval`, `${settings.scrollInterval}`)
  localStorage.setItem(`${SETTINGS_PREFIX}scrollAmount`, `${settings.scrollAmount}`)
  localStorage.setItem(`${SETTINGS_PREFIX}advanceScrollAmount`, `${settings.advanceScrollAmount}`)
  localStorage.setItem(`${SETTINGS_PREFIX}backgroundColor`, `${settings.backgroundColor}`)
  localStorage.setItem(`${SETTINGS_PREFIX}textColor`, `${settings.textColor}`)
  localStorage.setItem(`${SETTINGS_PREFIX}textSize`, `${settings.textSize}`)
  localStorage.setItem(`${SETTINGS_PREFIX}maxWidth`, `${settings.maxWidth}`)
  localStorage.setItem(`${SETTINGS_PREFIX}overlayHeight`, `${settings.overlayHeight}`)
}

function readSettings(): Settings {
  return {
    script: localStorage.getItem(`${SETTINGS_PREFIX}script`) || "The quick brown fox jumped over the lazy hen...",
    scrollInterval: Number.parseInt(localStorage.getItem(`${SETTINGS_PREFIX}scrollInterval`) || "32"),
    scrollAmount: Number.parseInt(localStorage.getItem(`${SETTINGS_PREFIX}scrollAmount`) || "1"),
    advanceScrollAmount: Number.parseInt(localStorage.getItem(`${SETTINGS_PREFIX}advanceScrollAmount`) || "100"),
    backgroundColor: localStorage.getItem(`${SETTINGS_PREFIX}backgroundColor`) || "#ffffff",
    textColor: localStorage.getItem(`${SETTINGS_PREFIX}textColor`) || "#000000",
    textSize: Number.parseInt(localStorage.getItem(`${SETTINGS_PREFIX}textSize`) || "3"),
    maxWidth: Number.parseInt(localStorage.getItem(`${SETTINGS_PREFIX}maxWidth`) || "800"),
    overlayHeight: Number.parseInt(localStorage.getItem(`${SETTINGS_PREFIX}overlayHeight`) || "0"),
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
