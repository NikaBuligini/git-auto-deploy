import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Layout from './components/layout'
import Dashboard from './containers/Dashboard'
import CreateNewApp from './components/create-app'
import AppLayout from './components/app/app-layout'
import Overview from './containers/Overview'
import Connect from './containers/Connect'
import Activity from './containers/Activity'
import Access from './containers/Access'
import Settings from './containers/Settings'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Dashboard}/>
    <Route path="create" component={CreateNewApp} />
    <Route path="apps/:appName" component={AppLayout}>
      <IndexRoute path="overview" component={Overview} />
      <Route path="overview" component={Overview} />
      <Route path="connect" component={Connect} />
      <Route path="activity" component={Activity} />
      <Route path="access" component={Access} />
      <Route path="settings" component={Settings} />
    </Route>
  </Route>
)
