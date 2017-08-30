//@flow
import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as DBTestActions from '../../actions/databaseTest'


class App extends Component {



    componentDidMount() {

        const {actions } = this.props

        if ( this.props.dispatch ){
  
            //actions.testDBConnection( this.props.dispatch );
        }

    }

    componentWillUpdate(){


    }

    render() {

        return (
            <div>

                <h1>Hello World</h1>
              
        

            </div>

        );
    }




}

let mapDispatchToProps = (dispatch : Function )=>{
   
    return {
        dispatch ,
        actions : bindActionCreators( DBTestActions, dispatch )
    }
}

export default connect(null, mapDispatchToProps)(App)

