import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducer from './reducers'

import App from './components/app'
import CreateNewApp from './components/create-app'
import Repo from './components/repo'

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer
  })
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="create" component={CreateNewApp} />
        <Route path="repo/:repoName" component={Repo} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
)
