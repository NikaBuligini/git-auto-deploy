import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { configureStore, DevTools } from './store'
import routes from './routes'

const store = configureStore(browserHistory, window.__initialState__)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('mount')
)

ReactDOM.render(
  <Provider store={store}>
    <DevTools />
  </Provider>,
  document.getElementById('devtools')
)
