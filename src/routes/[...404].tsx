import { HttpStatusCode } from "@solidjs/start"

export default function NotFound() {
  return (
    <>
      <HttpStatusCode code={404} />
      <h1>404</h1>
      <p>Page Not Found</p>
    </>
  )
}
