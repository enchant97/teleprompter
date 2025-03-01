/* @refresh reload */
import { Router } from '@solidjs/router'
import './app.css'
import { FileRoutes } from '@solidjs/start/router'
import Wrapper from './components/wrapper'

export default function App() {
  return (
    <Router root={Wrapper}>
      <FileRoutes />
    </Router>
  )
}
