import React from 'react'
import { Button } from 'semantic-ui-react'
import * as animate from '../Animations'
import * as Styles from '../Styles'


export default class Error404 extends React.Component {

render(){
    return animate.fade(
        <div>
            <div style={ Styles.centerBlock}>
                <h1>404 :( page not found</h1>
            </div>
            <div style={ Styles.centerBlock }>
                <Button
                    basic
                    color='teal'
                    onClick={()=>{this.props.history.push('/')}}>
                    F
                </Button>
            </div>
        </div>
        )

}

}
