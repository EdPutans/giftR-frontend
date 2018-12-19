import React from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import BodyBackgroundColor from 'react-body-backgroundcolor'

export default class ProfileShow extends React.Component {

    render(){
        const {user} = this.props
        return(
            <BodyBackgroundColor backgroundColor='#F6CFCA'>
                <div style={ {
                    margin: '10%  auto auto auto',
                    width: '50%',
                    left: 0,
                    right: 0,
                    position: 'absolute',

                    // marginLeft: '10%'
                } }>
                    <Segment.Group>
                        <Segment>  First name: { user.first_name } </Segment>
                        <Segment>  Last name: { user.last_name } </Segment>
                        <Segment>  Email: { user.email } </Segment>
                        <Segment>  Age: { user.age } </Segment>
                    </Segment.Group>
                    <Button onClick={ this.props.logout } color='red' type='submit'>Log Out</Button>
                    <Button floated='right' onClick={ this.props.toggleEdit }> edit </Button>
                </div>
            </BodyBackgroundColor>

    )
}
}