/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import { Route, Router } from '@solidjs/router'
import View from './routes/view'
import Setup from './routes/setup'
import Home from './routes/(home)'
import Wrapper from './components/wrapper'

render(() => (
  <Router>
    <Route path="/" component={Wrapper}>
      <Route path="/" component={Home} />
      <Route path="/setup" component={Setup} />
      <Route path="/view" component={View} />
    </Route>
  </Router>
), document.getElementById('root')!)
