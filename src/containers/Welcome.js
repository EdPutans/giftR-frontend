import React from 'react'
import {Button} from 'semantic-ui-react'

export default class Welcome extends React.Component {

    render() {
        return (
            <div>
                <div onClick = {() => this.props.history.push('/login')}>
                    <Button color='yellow'>Log In</Button>
                </div>
                <div onClick={ () => this.props.history.push('/signup')}>
                    <Button basic color='blue'>Sign up</Button>
                </div>
            </div>
        )
    }
}                    