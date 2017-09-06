//@flow
import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as SampleDataActions from '../../actions/SampleData'



class App extends Component {



    componentDidMount() {

        const { actions } = this.props
        
        if ( this.props.dispatch ){

            actions.getSampleData( this.props.dispatch );
        }

    }

  
    render() {



        let SampleData =   this.props.SampleData || [];

        
        return (
            <div>

                <h1>Example : SampleData </h1>
                { SampleData.map( (item,key) => <div key={item.name} > name : { item.name } value : {item.value}  </div>)}
        

            </div>

        );
    }




}
let mapStateToProps = (state) =>{
    
    return { SampleData : state.DatabaseTest.SampleData }

}
let mapDispatchToProps = (dispatch : Function )=>{
   
    return {
        dispatch ,
        actions : bindActionCreators( SampleDataActions, dispatch )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

