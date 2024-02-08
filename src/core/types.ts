export enum RemoteCommandType {
  TOGGLE_PLAY = "TOGGLE_PLAY",
  TO_TOP = "TO_TOP",
}

export type RemoteCommand = {
  commandType: RemoteCommandType
  commandData?: any
}
