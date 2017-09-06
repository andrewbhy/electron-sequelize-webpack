
import ActionTypes from 'common/ActionTypes'

export default(state = {}, action) => {
    switch (action.type) {
        case ActionTypes.GET_SAMPLEDATA:
       
            return Object.assign({}, state, {
               SampleData: action.result
            })
   
        default:
            return state
    }
}