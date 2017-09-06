import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createIpc from 'redux-electron-ipc'
import IPC_ActionCreator from './actions/IPCActions'

import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'

export const history = createHistory()

const initialState = {}
const enhancers = []





let undefinedActionHandlerMiddleware = () => {

  
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        //not sure why this fires..
        if (!action){
          console.log("UNDEFINED_ACTION dispatched", new Error().stack)
          return next( {
            type : "UNDEFINED_ACTION"
          } )
        }

        return next(action);
      };
    };
  };
}






const middleware = [
  undefinedActionHandlerMiddleware(),
  thunk,
  createIpc({
    'IPC_RESPONSE' : IPC_ActionCreator
  }),
  routerMiddleware(history)
 
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
