import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

function preloaded (state = {}, action) {
  return state
}

function apps (state = {
  isFetching: false,
  error: null
}, action) {
  switch (action.type) {
    case ActionTypes.APPS_REQUEST:
      return merge({}, state, {
        isFetching: true
      })
    case ActionTypes.APPS_SUCCESS:
      return merge({}, state, {
        isFetching: false
      })
    case ActionTypes.APPS_FAILURE:
      return merge({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}

function repos (state = {
  isFetching: false,
  error: null
}, action) {
  switch (action.type) {
    case ActionTypes.REPOS_REQUEST:
      return merge({}, state, {
        isFetching: true
      })
    case ActionTypes.REPOS_SUCCESS:
      return merge({}, state, {
        isFetching: false
      })
    case ActionTypes.REPOS_FAILURE:
      return merge({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}

function inspectingApp (state = '', action) {
  if (action.type === ActionTypes.APP_INSPECT) {
    return action.appName
  }
  return state
}

const process = combineReducers({
  apps,
  repos,
  inspectingApp
})

// Updates an entity cache in response to any action with response.entities.
function entities (state = { users: {}, repos: {}, apps: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
function errorMessage (state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ]
  })
})

const rootReducer = combineReducers({
  preloaded,
  process,
  entities,
  pagination,
  errorMessage,
  routing
})

export default rootReducer
