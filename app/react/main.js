import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducer from './reducers'

import Layout from './components/layout'
import Dashboard from './components/dashboard'
import CreateNewApp from './components/create-app'
import AppLayout from './components/app/app-layout'
import AppOverview from './components/app/overview'
import AppConnect from './components/app/connect'
import AppActivity from './components/app/activity'
import AppAccess from './components/app/access'
import AppSettings from './components/app/settings'

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
      <Route path="/" component={Layout}>
        <IndexRoute component={Dashboard}/>
        <Route path="create" component={CreateNewApp} />
        <Route path="apps/:appName" component={AppLayout}>
          <IndexRedirect to="overview" />
          <Route path="overview" component={AppOverview} />
          <Route path="connect" component={AppConnect} />
          <Route path="activity" component={AppActivity} />
          <Route path="access" component={AppAccess} />
          <Route path="settings" component={AppSettings} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
)
