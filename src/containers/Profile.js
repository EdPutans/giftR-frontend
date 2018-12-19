import React from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import BodyBackgroundColor from 'react-body-backgroundcolor'
import ProfileForm from './ProfileForm'
import ProfileShow from './ProfileShow'
import {Route} from 'react-router'
export default class Profile extends React.Component {

    state = {
        editing: false
        // starts off empty and only tracks field data
    }

    toggleEdit = () => this.setState({ editing: !this.state.editing }) 
    
    
    // pass different props to the function to sign up or to edit the user.

    render() {
        const {user} = this.props
        if(!this.state.editing){
            return (
                <Route path='/profile'
                    component={props => 
                    <ProfileShow
                        {...props}
                        toggleEdit={this.toggleEdit}
                        user={user} 
                    />
                } 
                />
            )
        }else{
         return (
             <Route path='/profile'
                 component={ props =>
                     <ProfileForm 
                         { ...props }
                         toggleEdit={ this.toggleEdit }
                         user={ user }
                     />
                 }
             />
            
        )
    }}
}