/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import { Route, Router } from '@solidjs/router'
import View from './routes/view'
import Setup from './routes/setup'
import Home from './routes/(home)'

render(() => (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/setup" component={Setup} />
    <Route path="/view" component={View} />
  </Router>
), document.getElementById('root')!)
