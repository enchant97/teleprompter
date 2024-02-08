export default function Help() {
  return (
    <div class="max-w-screen-md">
      <h1>Help</h1>
      <section>
        <h2>Prompter</h2>
        <p>
          Before using the prompter it must be setup, you can do this by navigating to "Setup Prompter".
          Once there you can adjust many different aspects and even setup a "Connect Code" for remote control.
        </p>
        <h3>Key Bindings</h3>
        <ul>
          <li><code>{"<s>"}</code> Toggle Scroll</li>
          <li><code>{"<a>"}</code> Advance Scroll</li>
        </ul>
      </section>
      <section>
        <h2>Remote Control</h2>
        <p>
          The "Remote Control" functionality allows for one or many prompters to be controlled over the internet.
          Remote control can be setup using these steps:
        </p>
        <ol>
          <li>Generate a "Connect Code" on the "Promoter Setup" page (or load from a setup file)</li>
          <li>Connect a remote by Scanning QR Code or entering the "Connect Code"</li>
          <li>Navigate prompter to "Prompter" page</li>
          <li>Control through remote</li>
        </ol>
      </section>
    </div>
  )
}
