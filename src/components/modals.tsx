import { Accessor, ParentProps, createEffect } from "solid-js"
import QRCode from "qrcode"

type ModalProps = {
  isOpen: Accessor<boolean>
  onClose: () => any
}

type BaseModalProps = ParentProps & ModalProps & {}

function BaseModal(props: BaseModalProps) {
  let dialogElement: HTMLDialogElement
  createEffect(() => {
    if (props.isOpen()) {
      dialogElement.showModal()
    } else {
      dialogElement.close()
    }
  })
  return (
    <dialog onClose={() => props.onClose()} class="modal" ref={(el) => dialogElement = el
    }>
      {props.children}
    </dialog>
  )
}

type ShareModalProps = ModalProps & {
  connectCode: string
}

export function ShareModal(props: ShareModalProps) {
  let shareCodeQrCode: HTMLCanvasElement
  const remoteUrl = () => {
    return `${window.location.origin}/remote/${props.connectCode}`
  }
  createEffect(() => {
    let contents = remoteUrl()
    if (contents) {
      QRCode.toCanvas(shareCodeQrCode, contents)
    }
  })
  return (
    <BaseModal isOpen={props.isOpen} onClose={props.onClose}>
      <div class="flex flex-col items-center gap-2">
        <h2>Connect Code</h2>
        <code>{props.connectCode}</code>
        <h2>Connect URL</h2>
        <a class="underline" target="_blank" href={remoteUrl()}>{remoteUrl()}</a>
        <canvas ref={(el) => shareCodeQrCode = el} />
        <button onClick={props.onClose} class="btn mt-4">Close</button>
      </div>
    </BaseModal>
  )
}
