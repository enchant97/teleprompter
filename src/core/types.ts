export enum RemoteCommandType {
  TOGGLE_PLAY = "TOGGLE_PLAY"
}

export type RemoteCommand = {
  commandType: RemoteCommandType
  commandData?: any
}
