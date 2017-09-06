// @flow

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import DatabaseTest from './DatabaseTest'

export default combineReducers({
  router: routerReducer,
  DatabaseTest 
})
