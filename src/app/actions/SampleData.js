import ActionTypes from 'common/ActionTypes'
import { send } from 'redux-electron-ipc'

export let getSampleData = (dispatch: Function) => {

    dispatch ( send (ActionTypes.GET_SAMPLEDATA) )

}