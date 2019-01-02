import Autosuggest from 'react-autosuggest'
import React from 'react'
import * as Adapter from '../Adapter'
import { Button, Card } from 'semantic-ui-react'

export default class Error404 extends React.Component {

render(){
    return(
        <div>
        <div style={{textAlign:'center', display:'inline-block', margin: 'auto'}}>
            <h1 style={ { textAlign: 'center' } }>404 :) page not found</h1>
            <div>
                
                <Button onClick={()=>{this.props.history.push('/')}}>F.</Button>
            </div>
        </div>
        </div>
    )

}

}
