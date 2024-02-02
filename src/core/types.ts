export enum RemoteCommandType {
  TOGGLE_SCROLL = "TOGGLE_SCROLL"
}

export type RemoteCommand = {
  commandType: RemoteCommandType
  commandData?: any
}
