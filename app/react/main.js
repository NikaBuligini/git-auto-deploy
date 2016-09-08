import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore'
import Root from './containers/Root'

window.__initialState__ = {
  preloaded: {
    user_id: document.getElementById('preloaded_user_id').value,
    git_id: parseInt(document.getElementById('preloaded_git_id').value)
  }
}

const store = configureStore(window.__initialState__)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('mount')
)
