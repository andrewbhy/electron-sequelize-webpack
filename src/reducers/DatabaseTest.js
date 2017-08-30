


export default(state = {}, action) => {
    switch (action.type) {
        case "DBTEST_SUCCESS":
            debugger
            return Object.assign({}, state, {
                success: true,
                data: action.data
            })
        case "DBTEST_FAILED":

            return Object.assign({}, state, {
                success: false,
                data: null,
                err: action.err
            })
        default:
            return state
    }
}