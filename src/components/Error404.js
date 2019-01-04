import React from 'react'
import { Button } from 'semantic-ui-react'
import { Animate } from 'react-simple-animate'


export default class Error404 extends React.Component {

render(){
    return(
        <Animate
            play={ true }
            startStyle={ { "opacity": 0 } }
            endStyle={ { "opacity": 1 } }
            durationSeconds="0.1"
            delaySeconds='0.2'
        >
        <div>
       
            <div style={ { textAlign: 'center' } }>
                        <h1>404 :( page not found</h1>
                </div>
            
                <div style={ { textAlign: 'center', display: 'block', margin: 'auto' } }>

                <Button basic color='teal' onClick={()=>{this.props.history.push('/')}}>   F  </Button>
                    <div>
            </div>
        </div>
        </div>
        </Animate>
    )

}

}
