import Autosuggest from 'react-autosuggest'
import React from 'react'
import * as Adapter from '../Adapter'
import { Button, Card } from 'semantic-ui-react'
import { Animate } from 'react-simple-animate'


export default class Error404 extends React.Component {

render(){
    return(
        <Animate
            play={ true }
            startStyle={ { "opacity": 0 } }
            endStyle={ { "opacity": 1 } }
            durationSeconds="0.2"
            delaySeconds='0.2'
        >
        <div>
        <div style={{textAlign:'center', display:'inline-block', margin: 'auto'}}>
            <h1 style={ { textAlign: 'center' } }>404 :( page not found</h1>
            <div>
                
                <Button onClick={()=>{this.props.history.push('/')}}>F.</Button>
            </div>
        </div>
        </div>
        </Animate>
    )

}

}
