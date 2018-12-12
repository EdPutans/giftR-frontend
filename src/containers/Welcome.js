import React from 'react'
import {Button} from 'semantic-ui-react'

export default class Welcome extends React.Component {



    render() {
        return (
            <div>
                <div >
                    <Button onClick={ () => this.props.history.push('/login') } color='yellow'>Log In</Button>
                    <Button onClick={ () => this.props.history.push('/signup') } basic color='blue'>Sign up</Button>
                </div>
            </div>
        )
    }
}                    