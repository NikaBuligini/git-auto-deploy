import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import Layout from './components/layout'
import Dashboard from './components/dashboard'
import CreateNewApp from './components/create-app'
import AppLayout from './components/app/app-layout'
import AppOverview from './components/app/overview'
import AppConnect from './components/app/connect'
import AppActivity from './components/app/activity'
import AppAccess from './components/app/access'
import AppSettings from './components/app/settings'

export default (
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
)
