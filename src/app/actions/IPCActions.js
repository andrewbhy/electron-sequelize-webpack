export default  (event,actionType,result,err) =>{


    return {

        type : actionType,
        result,
        err
    }


}
